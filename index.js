const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const cors = require('cors');

const app = express();
app.use(cors());

const server = http.createServer(app);

const io = new Server(server, {
    cors: {
        origin: '*',
        methods: ['GET', 'POST'],
    }
});

io.on("connection", (socket) => {
    console.log(`User connected: ${socket.id}`)
    socket.on('send_message', data => {
        console.log(data);
        socket.broadcast.emit('receive_message', data);
    })
})

const port = 3000;

server.listen(port, () => {
    console.log('Server is running on PORT: ', port);
})
