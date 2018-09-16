const express = require("express");
const http = require("http");
const bodyParser = require('body-parser');
const _ = require("lodash");
const path = require("path");
const socketIO = require("socket.io");

const publicPath = path.join(__dirname, "../public");
const port = process.env.PORT || 3000;

var app = express();
var server = http.createServer(app);
var io = socketIO(server);

app.use(express.static(publicPath));

app.use(bodyParser.json());

io.on("connection", (socket) => {
    console.log("New User Connected");
    var userID = "Kullanıcı"+Math.floor((Math.random() * 100) + 1).toString();
    
    socket.emit("newUserID", {
        id: userID
    });

    socket.emit("newMessage", {
        from: "SERVER",
        text: "Welcome to Chat Room " + userID,
        createdAt: new Date().getTime()
    });

    socket.broadcast.emit("newMessage", {
        from: "SERVER",
        text: userID+ " joined the chat.",
        createdAt: new Date().getTime()
    });

    socket.on("createMessage", (data) =>{
        let message = _.pick(data, ["from", "text"]);
        console.log("New message came. ", message);
        socket.broadcast.emit("newMessage", {
            from: message.from,
            text: message.text,
            createdAt: new Date().getTime()
        });
    });

    socket.on("disconnect", () => {
        console.log("User disconnected");
        socket.broadcast.emit("newMessage", {
            from: "SERVER",
            text: userID+ " leave the chat room.",
            createdAt: new Date().getTime()
        });
        
    });
});

server.listen(port, () => {
    console.log(`Started on port ${port}`);
});
  
module.exports = {app};