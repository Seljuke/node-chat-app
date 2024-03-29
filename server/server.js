const express = require("express");
const http = require("http");
const bodyParser = require('body-parser');
const _ = require("lodash");
const path = require("path");
const socketIO = require("socket.io");
const { log } = require("../config/config.js");

const {generateMessage, generateLocationMessage} = require("./utils/message");
const {isRealString} = require("./utils/validation");
const {Users} = require("./utils/users");

log.info("Log level:", global.gConfig.LOG_LEVEL);

const publicPath = path.join(__dirname, "../public");
const port = process.env.PORT || 3000;

var app = express();
var server = http.createServer(app);
var io = socketIO(server);
var users = new Users();

app.use(express.static(publicPath));

app.use(bodyParser.json());

io.on("connection", (socket) => {
    log.info("New User Connected");

    socket.on("updateRoomList", (data, callback) => {
        callback(users.getRoomList());
    });

    socket.on("checkUserName", (data, callback) => {
        if(users.checkUserExist(data.name)){
            callback("NOK");
            return;
        }
        callback("OK");
    });

    socket.on("join", (params, callback) => {
        if(!isRealString(params.name) || !isRealString(params.room)) {
            return callback("Name and room name are requiered.");
        }

        socket.join(params.room);
        users.removeUser(socket.id);
        users.addUser(socket.id, params.name, params.room);

        io.to(params.room).emit("updateUserList", users.getUserList(params.room));
        socket.emit("newMessage",generateMessage("SERVER", `${params.name} Welcome to Chat.`));
        socket.broadcast.to(params.room).emit("newMessage",generateMessage("SERVER", `${params.name} joined the chat.`));
        callback();
    });

    socket.on("createMessage", (data, callback) =>{
        let message = _.pick(data, ["text"]);
        let user = users.getUser(socket.id);

        if(user && isRealString(message.text)) {
            io.to(user.room).emit("newMessage", generateMessage(user.name,
                message.text));
        }
    });

    socket.on("createLocationMessage", (data) => {
        let message = _.pick(data, ["latitude", "longitude"]);
        let user = users.getUser(socket.id);
        if(user) {
            io.to(user.room).emit("newLocationMessage",generateLocationMessage(user.name, message.latitude, message.longitude));
        }
        
    });

    socket.on("disconnect", () => {
        var user = users.removeUser(socket.id);
        if(user){
            io.to(user.room).emit("updateUserList", users.getUserList(user.room));
            io.to(user.room).emit("newMessage", generateMessage("SERVER", `${user.name} has left.`));
        }        
    });
});

server.listen(port, () => {
    log.info(`Started on port ${port}`);
});
  
module.exports = {app};