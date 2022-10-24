require('dotenv').config();
const WebSocketServer = require('websocket').server;


const app = require('./src/app');

const server = app.listen(process.env.PORT || 3000, () => {
    console.log('Express is running on port');
})

const wss = new WebSocketServer({
    httpServer: server,
    autoAcceptConnections: false,
});


wss.on('request', (request) => {
    console.log(request);

});