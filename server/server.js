const path = require('path');
const express = require('express');
const socketIO = require('socket.io');
const http = require('http');

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

io.on('connection', (socket) =>{
  console.log('New user connected');

  socket.emit('newMessage', {
      from: 'John',
      text: 'See you then',
      createdAt: 123123
  }); // Emit an emvent


  socket.on('createMessage', (message) => {
    console.log('createMessage', message);
  });

  socket.on('disconnect', () =>{
    console.log('Client disconnected');
  });


});



server.listen(port, () => {
    console.log(`Started express on port ${port}`);
});

/******************************************/