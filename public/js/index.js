var socket = io();

socket.on('connect', function () {
    console.log('Connected to server');


    socket.emit('createMessage', {
        from: 'Julian',
        text: 'Baseball'
    })
});

socket.on('newMessage', (data) => {
    console.log(data);
});

socket.on('disconnect', function () {
    console.log('Disconnected from server');
});

// socket.on('newEmail', function(email) {
//     console.log('New email', email);
// });
// socket.emit('createEmail', {
//     to: 'janna.aleeza',
//     text: 'hi dad'
// });


