const path = require('path');
const express = require('express');
const socketIO = require('socket.io');
const http = require('http');
const {generateMessage} = require('./utils/message'); // Custom JS script

const publicPath = path.join(__dirname + '/../public');
const port = process.env.PORT || 3000;

/******************************************/
// Setup Express 
var app = express(); // Declared on line #2

// We will decouple HTTP listener from the app so that 
// we can hook up the socket.io listener
var server = http.createServer(app);
// Configure server to use socket.io
var io = socketIO(server);

// Configuring Static middleware
// Ref: http://expressjs.com/en/starter/static-files.html
app.use(express.static(publicPath));

// NOTES:
// socket.emit emits an event on a specific socket / connection
// io.emit emtis an event on entire network of sockets / all connections

io.on('connection', (socket) =>{
  console.log('New user connected');

  // socket.emit('newMessage', {
  //     from: 'John',
  //     text: 'See you then',
  //     createdAt: 123123
  // }); // Emit an emvent
  
  // socket.emit from Admin text Welcome to the chat app
  socket.emit('newMessage',generateMessage('Admin','Welcome to chat app'));
  // socket.broadcast.emit from Admin text new user joined
  socket.broadcast.emit('newMessage',generateMessage('Admin', 'New user joined'));

  socket.on('createMessage', (message) => {
    console.log('createMessage', message);
    io.emit('newMessage',generateMessage(message.from,message.text));
    // socket.broadcast.emit('newMessage', {
    //   from: message.from,
    //   text: message.text,
    //   createdAt: new Date().getTime()
    // });
  });

  socket.on('disconnect', () =>{
    console.log('Client disconnected');
  });


});



server.listen(port, () => {
    console.log(`Started express on port ${port}`);
});

/******************************************/