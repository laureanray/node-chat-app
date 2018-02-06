var socket = io(); // initiate the request to the server

socket.on('connect', function () {
    console.log('Connected to server');

    socket.emit('createEmail', {
        to: "haha",
        text: "mew"
    });

    socket.emit('createMessage', {
        "from": "Laurean Ray",
        "text": "Hahaha from client"
    })
});

socket.on('disconnect', function () {
    console.log('Disconnected from server');
});

socket.on('newMessage', function(message) {
    console.log('New Message', message);
})

