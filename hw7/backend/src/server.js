// import http, express, dotenv-defaults, mongoose, WebSocket... etc.
import http from 'http';
import express from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import WebSocket from 'ws';
import mongo from './mongo';
import wsConnect from '../wsConnect';

const app = express()
const server = http.createServer(app)
const wss = new WebSocket.Server({ server })
const db = mongoose.connection
mongo.connect();

db.once('open', () => { console.log("MongoDB connected!");
    wss.on('connection', (ws) => {
        // Define WebSocket connection logic
        // wsConnect.initData(ws);
        ws.onmessage = wsConnect.onMessage(ws);
    });
});

const PORT = process.env.PORT || 4000;
server.listen(PORT, () => {
    console.log(`listening on http://localhost:${PORT}`);
})