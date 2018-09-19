var socket = io();

function scrollToBottom() {
    var messages = $("#messages");
    var newMessage = messages.children("li:last-child");

    var newMessageHeight = newMessage.innerHeight();
    var lastMessageHeight = newMessage.prev().innerHeight();
    var clientHeight = messages.prop("clientHeight");
    var scrollTop = messages.prop("scrollTop");
    var scrollHeight = messages.prop("scrollHeight");

    if(clientHeight + scrollTop + lastMessageHeight + newMessageHeight>= scrollHeight){
        messages.scrollTop(scrollHeight);       
    }
};

socket.on("connect", function () {
    console.log("Connected to server");
});

socket.on("disconnect", function () {
    console.log("Disconnected from server");
    
});

socket.on("newMessage", function (data) {
    var html = Mustache.render($("#message-template").html(), {
        text: data.text,
        from: data.from,
        createdAt: data.createdAt
    });
    $("#messages").append(html);
    scrollToBottom();
});

socket.on("newUserID", function (data) {
    window.userNUMBER = data.id;
});

socket.on("newLocationMessage", function(message) {
    var html = Mustache.render($("#location-message-template").html(), {
        url: message.url,
        from: message.from,
        createdAt: message.createdAt
    });
    $("#messages").append(html);
    $("#send-location").text("Send Location");
    $("#send-location").attr("disabled", false);
    scrollToBottom();
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
});

var locationButton = $("#send-location");
locationButton.on("click", function () {
    if (!navigator.geolocation){
        return alert("Geolocation not supported by your browser.");
    }
    $("#send-location").text("Sending...");
    $("#send-location").attr("disabled", true);
    navigator.geolocation.getCurrentPosition(function (position) {
        socket.emit("createLocationMessage", {
            from: window.userNUMBER,
            latitude: position.coords.latitude,
            longitude: position.coords.longitude
        });
    }, function () {
        alert("Unable to fetch location.");
        $("#send-location").text("Send Location");
        $("#send-location").attr("disabled", false);
    });
});

