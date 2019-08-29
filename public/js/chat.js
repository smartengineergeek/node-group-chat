var socket = io.connect('http://localhost:8080');
function isTyping(event){
    console.log(event);
    $("#isTyping").text('someone is typing');
}
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
