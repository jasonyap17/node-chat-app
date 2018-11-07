'use strict';

const path = require('path');
const express = require('express');
const socketIO = require('socket.io');
const http = require('http');

const {generateMessage} = require('./utils/message');
const publicPath = path.join(__dirname, '../public');
const port = process.env.PORT || 3000;

var app = express();
var server = http.createServer(app);
var io = socketIO(server);

app.use(express.static(publicPath));

io.on('connection', (socket) => {
    console.log('New user connected.');

    //socket.emit from admin text welcome to the chat app
    socket.emit('newMessage', 
        generateMessage('Admin', 'Welcome to the chat app'));

    socket.broadcast.emit('newMessage', 
        generateMessage('Admin', 'New user joined' ));
    //broadcast emit from admin text new user joined

    socket.on('disconnect', () => {
        console.log('User disconnected.');
    });

    socket.on('createMessage', (data) => {
        console.log(data);
        io.emit('newMessage', generateMessage( data.from, data.text));
        // socket.broadcast.emit('newMessage', {
        //     from: data.from,
        //     text: data.text,
        //     createdAt: new Date().getTime()
        // });
    });
});

server.listen(port, (err) => {
    if (err) {  throw err; }
    console.log(`Server up on port ${port}`);
});