const path = require("path");
const express = require("express");
const app = express();


//Settings
app.set("port", process.env.PORT || 3000);

//Static files
app.use(express.static(path.join(__dirname, "public")));
console.log(__dirname);

//Start server
const server = app.listen(app.get("port"), () => {
    console.log("Sever on por", app.get("port"))
});

//Web Socket
const SocketiIO = require("socket.io");
const io = SocketiIO(server);

io.on('connection', (socket) => {
    console.log('New conexion ' + socket.id);

    socket.on('chat:message', (data) => {
        console.log(data);
        io.sockets.emit('chat:message', data);
    })
    socket.on('chat:typing', (data) => {
        socket.broadcast.emit('chat:typing', data)
    })
})



