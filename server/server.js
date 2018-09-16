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

    socket.on("createMessage", (data) =>{
        let message = _.pick(data, ["from", "text"]);
        console.log("New message came. ", message);
        io.emit("newMessage", {
            from: message.from,
            text: message.text,
            createdAt: new Date()
        });
    });

    socket.on("disconnect", () => {
        console.log("User disconnected");        
    });
});

server.listen(port, () => {
    console.log(`Started on port ${port}`);
});
  
module.exports = {app};