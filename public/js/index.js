var socket = io(); // initiate the request to the server

socket.on('news', function(data) {
  console.log(data);
  var ol = $('<ol class=\'list-group\'></ol>');


  data.forEach(function (user) {
    ol.append($('<li class=\'list-group-item list-group-item-action animated fadeIn\'></li>').text(user));
   });
   $('#rooms').html(ol);


});
