// IMPORT DEPENDENCIES 
const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');
const clear = require('clear');
const moment = require('moment');
// LOCAL DEPENDENCIES
const {generateMessage, generateLocationMessage} = require('./utils/message');
let publicPath = path.join(__dirname, '../public');
let app = express();
let port = process.env.PORT || 3000;
let server = http.createServer(app);
let io = socketIO(server);

console.log(publicPath);
app.use(express.static(publicPath));

let user = 0;
// register an event listener
io.on('connection', (socket) => {
   
    console.log('New user connected');
    user = user + 1;
    console.log(`Connected user: ${user}`);
    socket.on('disconnect', () => {
        
        user = user - 1;
        console.log('User disconnected');
        console.log(`Conneted user: ${user}`);       
    });

    socket.emit('newMessage', generateMessage('Admin', 'Welcome to the chat app'));
    socket.broadcast.emit('newMessage', generateMessage('Admin', 'New user connected'));
    socket.on('createMessage', (newMessage, callback) => {
     //   console.log("New message", newMessage);
        io.emit('newMessage', generateMessage(newMessage.from, newMessage.text));
        callback('This is from the server');
    });     
    
    socket.on('createLocationMessage', (coords) => {
        io.emit('newLocationMessage', generateLocationMessage('User', coords.latitude, coords.longitude));
    });
});

server.listen(port, () => {
    console.log(`Server is up and running on port: ${port}`);
});
