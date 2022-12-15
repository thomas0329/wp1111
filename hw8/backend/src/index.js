// written by others

import mongo from './mongo'

import server from './server'

mongo.connect()

// const app = express();
// const server = http.createServer(app)
// const wss = new WebSocket.Server({server})
// const db = mongoose.connection

// db.once('open', () => {
//     console.log('MongoDB connected!');
//     wss.on('connection', (ws) => {
//         ws.id = uuidv4();   // provides key for websocket
//         ws.box = '';        // keep track of client's current chat box
//         ws.onmessage = wsConnect.onMessage(ws, wss);

//         // wss.clients.forEach(function each(client) {
//         //     console.log('Client.ID: ' + client.id);
//         // });
//     });
// })

const PORT = process.env.PORT || 4000;
server.listen(PORT, () => {console.log(`Example app listening on port ${PORT}!`)});