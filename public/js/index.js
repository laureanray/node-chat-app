var socket = io(); // initiate the request to the server

socket.on('connect', function () {
    console.log('Connected to server');
});

socket.on('disconnect', function () {
    console.log('Disconnected from server');
});

socket.on('newMessage', function(message) {
   

    var li = $('<li></li>');
    li.text(`${message.from}: ${message.text}`);

    $('#messages').append(li);
});

socket.on('newLocationMessage', function(message)  {
    var li = $('<li></li>');

    var a = $('<a target="_blank"> My current location </a>');

    li.text(`${message.from}: `);
    a.attr('href', message.url);
    li.append(a);
    $('#messages').append(li);
});

socket.on('connected', function() {
    console.log('Welcome to the cat app');
});

socket.on('connect-admin', function() {
    console.log('Welcome to new user!');
});


jQuery('#message-form').on('submit', function(e){
    e.preventDefault();

    socket.emit('createMessage', {
        from: 'User',
        text: $('[name=message]').val()
    }, function() {

    });
});

var locationButton = $('#send-location');
locationButton.on('click', function() {
    if(!navigator.geolocation) {
        return alert('Geolcation not supported by your browser');
    }

    navigator.geolocation.getCurrentPosition(function(position) {
        
        
        socket.emit('createLocationMessage', {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude
        });
    }, function () {
        alert('Unable to fetch location');
    });
});