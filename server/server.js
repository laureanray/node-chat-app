// IMPORT DEPENDENCIES 
const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');
const clear = require('clear');
const moment = require('moment');
const fs = require('fs');
// LOCAL DEPENDENCIES
const {generateMessage, generateLocationMessage} = require('./utils/message');
const {isRealString} = require('./utils/validation');
const {Users} = require('./utils/users');

//VARIABLES
let colors = ["primary", "secondary", "success", "danger", "warning", "info", "light", "dark"];
let publicPath = path.join(__dirname, '../public');
let app = express();
let port = process.env.PORT || 3000;
let server = http.createServer(app);
let io = socketIO(server);
let users = new Users();
//SET ROOT
app.use('/', express.static(publicPath));
console.log(publicPath);

//REGISTER AN EVENT LISTENER
io.on('connection', (socket) => {
    console.log('New user connected');

    socket.on('disconnect', () => {
        console.log('User disconnected');
        let user = users.removeUser(socket.id);
        fs.unlink('../public/img/_temp/__temp', () => {
            console.log('Cache Deleted');
        })
        if(user){
            io.to(user.room).emit('updateUserList', users.getUserList(user.room));
            io.to(user.room).emit('newMessage', generateMessage('Admin', `${user.name} has left the room.`));
        }
    });

    // JOIN ROOM
    socket.on('join', (params, callback) => {
        if (!isRealString(params.name) || !isRealString(params.room)){
            return callback('Name and room name are required');
        }
        socket.join(params.room);
        users.removeUser(socket.id);
        let rand = Math.floor(Math.random() * 8);
        let new_val = colors[rand];
        users.addUser(socket.id, params.name, params.room, new_val);

        io.to(params.room).emit('updateUserList', users.getUserList(params.room))
        
        //MESSAGE TO USER
        socket.emit('newMessage', generateMessage('Admin', 'Welcome to the chat app'));
        //MESSAGE TO EVERYONE EXCEPT THE USER ITSELF
        socket.broadcast.to(params.room).emit('newMessage', generateMessage('Admin', `${params.name} has joined.`));
        socket.broadcast.to(params.room).emit('roomName', params.room);
        callback();
    });


    socket.on('createMessage', (newMessage, callback) => {
     //   console.log("New message", newMessage);
        let user = users.getUser(socket.id);    

        if(user && isRealString(newMessage.text)) {
            io.to(user.room).emit('newMessage', generateMessage(user.name, newMessage.text, user.unique));
        }

      
        callback('This is from the server');
    });     
    
    socket.on('createLocationMessage', (coords) => {
        let user = users.getUser(socket.id);
        console.log(socket.id);
        if(user){
            io.to(user.room).emit('newLocationMessage', generateLocationMessage(user.name, coords.latitude, coords.longitude));
        }   
    });
});


// WELL BASCIALLY THE SERVER
server.listen(port, () => {
    console.log(`Server is up and running on port: ${port}`);
});
