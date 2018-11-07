'use strict';

const path = require('path');
const express = require('express');
const socketIO = require('socket.io');
const http = require('http');

const publicPath = path.join(__dirname, '../public');
const port = process.env.PORT || 3000;

var app = express();
var server = http.createServer(app);
var io = socketIO(server);

app.use(express.static(publicPath));

io.on('connection', (socket) => {
    console.log('New user connected.');

    socket.emit('newMessage', {
        from: 'anna',
        text: 'behave',
        createdAt: new Date().toString()
    });


    socket.on('disconnect', () => {
        console.log('User disconnected.');
    });

    socket.on('createMessage', (data) => {
        // socket.emit('newMessage', {
        //     from: data.from,
        //     text: data.text,
        //     createdAt: new Date().toString()
        // });
        console.log(data);
    });
});

server.listen(port, (err) => {
    if (err) {  throw err; }
    console.log(`Server up on port ${port}`);
});