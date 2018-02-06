const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');
const clear = require('clear');

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

  
    socket.on('disconnect', () => {
       
        console.log('User disconnected');
       
       
    });

    socket.on('createMessage', (newMessage) => {
        console.log("New message", newMessage);

        io.emit('newMessage', {
            from: newMessage.from,
            text: newMessage.text,
            createAt: new Date().getTime()
        });
    });
});

server.listen(port, () => {
    console.log(`Server is up and running on port: ${port}`);
});
