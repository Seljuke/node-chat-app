var socket = io();

function sendMessage(){    
    var message = document.getElementById("m");
    var data = {
        from: "kullanıcı",
        text: message.value
    };
    console.log(data);
    message.value = "";
    var chatArea = document.getElementById("messages");
    chatArea.innerHTML = chatArea.innerHTML + "<li>" +
    data.from + ": "+ data.text + "</li>";

    socket.emit("createMessage", data);
}

socket.on("connect", function () {
    console.log("Connected to server");
});

socket.on("disconnect", function () {
    console.log("Disconnected from server");
    
});

socket.on("newMessage", function (data) {
    console.log("New message recived: ", data);
    var chatArea = document.getElementById("messages");
    chatArea.innerHTML = chatArea.innerHTML + "<li>" + data.createdAt + " - server: " + ": "+ data.text + "</li>";
});

