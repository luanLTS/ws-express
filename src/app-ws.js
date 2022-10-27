require('dotenv').config()
const WebSocketServer = require('websocket').server;


let nextIdConn = 1;
const connectionsArray = [];

const allowClient = () => {
    // logica para liberar a conexao ou não
    return true;
}

module.exports = (httpServer) => {
    const wss = new WebSocketServer({
        httpServer,
        autoAcceptConnections: false,
    });

    wss.on('request', (request) => {
        console.log(request.origin);
        if (!allowClient()) {
            request.reject(401);
            return;
        }

        // ao aceitar a conexão é devolvido o objeto connection
        let connection = request.accept();

        // adiciona a conexão ao vetor de conexões ativas
        connectionsArray.push(connection);

        // define um id para a conexão e incrementa para a proxima
        connection.ID = nextIdConn;
        nextIdConn++;

        var message = {
            type: "id",
            id: connection.ID,
        }
        // envia ao cliente o id da sua conexao com o servidor
        connection.sendUTF(JSON.stringify(message));

        connection.on('message', (data) => {
            //tratar as mensagens vinda do cliente
            console.log(data);
            if (data.type == 'utf8') {
                let json = JSON.parse(data.utf8Data);
                switch (json.type) {
                    case 'message': {
                        connectionsArray.map(conn => {
                            conn.sendUTF(JSON.stringify(json));
                        })
                    }
                }
            }
        })
    });


}