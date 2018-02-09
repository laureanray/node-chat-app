var socket = io(); // initiate the request to the server

socket.on('connect', function () {
    console.log('Connected to server');
});

socket.on('disconnect', function () {
    console.log('Disconnected from server');
});

socket.on('newMessage', function(message) {
   

    var li = $('<li></li>');
    var stamp = moment(message.createdAt).format('h:mm a');
    li.text(`<span id="hl">${message.from}: ${stamp}</span> ${message.text}`);

    $('#messages').append(li);
});

socket.on('newLocationMessage', function(message)  {
    var li = $('<li></li>');

    var a = $('<a target="_blank"> My current location </a>');
    var location_stamp = moment(message.createdAt).format('h:mm a');
    li.text(`${message.from}: ${location_stamp}`);
    a.attr('href', message.url);
    li.append(a);
    $('#messages').append(li);
});

socket.on('connected', function() {
    console.log('Welcome to the chat app');
});

socket.on('connect-admin', function() {
    console.log('Welcome to new user!');
});

var messageTextBox = $('[name=message]');

jQuery('#message-form').on('submit', function(e){
    e.preventDefault();
  
    socket.emit('createMessage', {
        from: 'User',
        text: messageTextBox.val()
    }, function() {
        messageTextBox.val('');
    });
});

var locationButton = $('#send-location');
locationButton.on('click', function() {
    if(!navigator.geolocation) {
        return alert('Geolcation not supported by your browser');
    }

    locationButton.attr('disabled', 'disabled').text('Sending location ...');
    navigator.geolocation.getCurrentPosition(function(position) {
        
        locationButton.removeAttr('disabled').text('Send location');
        socket.emit('createLocationMessage', {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude
        });
    }, function () {
        locationButton.removeAttr('disabled').text('Send location');
        alert('Unable to fetch location');
    });
});