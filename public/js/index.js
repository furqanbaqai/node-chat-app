var socket = io(); // Initiating the req from client to server
socket.on('connect', function() {
    console.log('Connected to the server');
    // socket.emit('createMessage', {
    //     from: 'Andrew',
    //     text: 'Yup thats me'
    // });
});
socket.on('disconnect', function() {
    console.log('Disconencted from server');
});

socket.on('newMessage', function(message){
    console.log('newMessage', message);
});