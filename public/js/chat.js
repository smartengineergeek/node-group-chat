// console.log(process.env)
// var connURL = process.env.NODE_ENV === 'production' ? 'https://amahlawat.github.io/node-group-chat': 'http://localhost:8080';
var connURL = 'http://localhost:8080';
// in production environment
connURL = 'https://amahlawat.github.io/node-group-chat';

var socket = io.connect(connURL);
// submit text message without reload/refresh the page
$('form').submit(function(event){
    event.preventDefault(); // page reloading is prevented
    socket.emit('chat_message', $('#messageText').val());
    $('#messageText').val('');
    return false;
});

// append the chat text message
socket.on('chat_message', function(msg){
    $('#messages').append($('<li>').html(msg))
})

// append text if someone is online
socket.on('isOnline', function(username){
    $('#messages').append($('<li>').html(username))
})

// ask username
var username = prompt('Please tell me your name');
socket.emit('username', username);
