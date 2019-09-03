const express = require('express');
const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http);
const path = require('path');
require('dotenv').config();

app.use(express.static(path.join(__dirname+'/public')))

app.get('/', function(request, response){
    response.sendFile(path.join(__dirname+'/index.html'));
})

io.sockets.on('connection', function(socket){
    socket.on("username", function(username){
        socket.username = username;
        io.emit('isOnline', '<i>'+socket.username+' join the chat...</i>');
    });
    socket.on('disconnect', function(username){
        io.emit('isOnline', '<i>'+socket.username+' left the chat..</i>');
    })
    socket.on('chat_message', function(message){
        io.emit('chat_message', '<strong>'+socket.username+'</strong>:'+message);
    })
})

http.listen(8080, function(){
    console.log(process.env.NODE_ENV)
    console.log('listening on *:8080');
})