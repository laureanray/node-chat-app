let socket = io(); // initiate the request to the server

let date = moment().format('MMMM Do YYYY, h:mm:ss a'); // March 4th 2018, 9:16:21 pm


socket.on('connect', function () {
  console.log('Connected to server');

  socket.on('roomEvent', function(data) {
    console.log(data);
    console.log(date);
    var ol = $('<ol class=\'list-group\'></ol>');
  
  
    data.forEach(function (user) {
      ol.append($('<li class=\'list-group-item list-group-item-action animated fadeIn\'></li>').text(user));
     });
     $('#rooms').html(ol);
     
    });
});


socket.on('roomEvent', function(data) {
  console.log(data);
  console.log(date);
  var ol = $('<ol class=\'list-group\'></ol>');


  data.forEach(function (user) {
    ol.append($('<li class=\'list-group-item list-group-item-action animated fadeIn\'></li>').text(user));
   });
   $('#rooms').html(ol);
   
  });
 
 
