var socket = io();

function sendMessage(){    
    var message = document.getElementById("m");
    var data = {
        from: window.userNUMBER,
        text: message.value
    };
    // console.log(data);
    // message.value = "";
    var chatArea = document.getElementById("messages");
    chatArea.innerHTML = chatArea.innerHTML + "<li>" + new Date() +
    " - " + window.userNUMBER + ": "+ data.text + "</li>";

    // socket.emit("createMessage", data, function (callData) {
    //     console.log(callData);
    // });
}

socket.on("connect", function () {
    console.log("Connected to server");
});

socket.on("disconnect", function () {
    console.log("Disconnected from server");
    
});

socket.on("newMessage", function (data) {
    console.log("New message recived: ", data);
    var li = $("<li></li>");
    li.text(`${data.from}: ${data.text}`);

    $("#message-list").append(li);
    var chatArea = document.getElementById("messages");
    chatArea.innerHTML = chatArea.innerHTML + "<li>" + new Date(data.createdAt) + " - " + data.from + ": "+ data.text + "</li>";
});

socket.on("newUserID", function (data) {
    window.userNUMBER = data.id;
});

socket.on("newLocationMessage", function(message) {
    var li = $("<li></li>");
    var a = $("<a target='_blank'>My current location</a>");
    li.text(`${message.from}: `);
    a.attr("href", message.url);
    li.append(a);

    $("#message-list").append(li);
});

jQuery("#message-form").on("submit", function (e) {
    e.preventDefault();
    var data = {
        from: window.userNUMBER,
        text: $("#m-input").val()
    };
    $("#m-input").val("");
    socket.emit("createMessage", data, function (callData) {
        console.log(callData);
    });
    var li = $("<li></li>");
    li.text(`${data.from}: ${data.text}`);

    $("#message-list").append(li);
    var chatArea = document.getElementById("messages");
});

var locationButton = $("#send-location");
locationButton.on("click", function () {
    if (!navigator.geolocation){
        return alert("Geolocation not supported by your browser.");
    }
    navigator.geolocation.getCurrentPosition(function (position) {
        socket.emit("createLocationMessage", {
            from: window.userNUMBER,
            latitude: position.coords.latitude,
            longitude: position.coords.longitude
        });
    }, function () {
        alert("Unable to fetch location.")
    });
});

