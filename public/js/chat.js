var socket = io(); // initiate the request to the server

function scrollToBottom() {
    let messages = $('#messages');  
    let newMessage = messages.children('li:last-child');
    let clientHeight = messages.prop('clientHeight');
    let scrollTop = messages.prop('scrollTop');
    let scrollHeight = messages.prop('scrollHeight');
    let newMessageHeight = newMessage.innerHeight();
    let lastMessageHeight = newMessage.prev().innerHeight();
    if (clientHeight + scrollTop + newMessageHeight + lastMessageHeight >= scrollHeight){
        messages.scrollTop(scrollHeight);
    }
}

socket.on('connect', function () {
    console.log('Connected to server');
    let params = $.deparam(window.location.search);

    socket.emit('join', params, function(err) {
        if(err){
            alert(err);
            window.location.href = '/'; 
        } else { 
            console.log('No error');
        }
    });
});

socket.on('disconnect', function () {
    console.log('Disconnected from server');
});

socket.on('updateUserList', function (users) {
   var ol = $('<ol class=\'list-group\'></ol>');

   users.forEach(function (user) {
    ol.append($('<li class=\'list-group-item\'></li>').text(user));
   });
   $('#number').html(users.length);
   $('#users').html(ol);
});


socket.on('newMessage', function(message) {
    var stamp = moment(message.createdAt).format('h:mm a');
    var template = $('#message-template').html();
    var html = Mustache.render(template, {
        text: message.text,
        from: message.from,
        createdAt: stamp
    });

    $('#messages').append(html);
    scrollToBottom();
});

socket.on('newLocationMessage', function(message)  {
    var location_stamp = moment(message.createdAt).format('h:mm a');
    var template = $('#location-message-template').html();
    var html = Mustache.render(template, {
        url: message.url,
        from: message.from,
        createdAt: location_stamp
    });

    $('#messages').append(html);
    scrollToBottom();
    // var li = $('<li></li>');

    // var a = $('<a target="_blank"> My current location </a>');
    // var location_stamp = moment(message.createdAt).format('h:mm a');
    // li.text(`${message.from}: ${location_stamp}`);
    // a.attr('href', message.url);
    // li.append(a);
    // $('#messages').append(li);
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

