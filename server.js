const express = require('express');
const app = express();
const http = require('http').createServer(app);

const port = 3000;

http.listen(port,(err) => {
    if(err){
        console.log('error in listening',err);
    }
    console.log('listening to port',port);
});

//Static files - Middleware
app.use(express.static('client'));

app.get('/', (req,res) => {
    res.sendFile('/index.html',{ root: __dirname});
});

//socket.io connection to the backend

const io = require('socket.io')(http);

io.on('connection', (socket) => {
    console.log('Connected');
    socket.on('message', (msg) => {
        socket.broadcast.emit('message',msg);
    });
});
