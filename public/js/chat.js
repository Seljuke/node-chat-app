var socket = io();

function scrollToBottom() {
    let messages = $("#messages");
    let newMessage = messages.children("li:last-child");

    let newMessageHeight = newMessage.innerHeight();
    let lastMessageHeight = newMessage.prev().innerHeight();
    let clientHeight = messages.prop("clientHeight");
    let scrollTop = messages.prop("scrollTop");
    let scrollHeight = messages.prop("scrollHeight");

    if(clientHeight + scrollTop + lastMessageHeight + newMessageHeight>= scrollHeight){
        messages.scrollTop(scrollHeight);       
    }
};

socket.on("connect", function () {
    let params = jQuery.deparam(window.location.search);

    socket.emit("join", params, function (err) {
        if (err){
            alert(err);
            window.location.href = "/";
        } else {
            console.log("no error");
        }
    });
});

socket.on("disconnect", function () {
    console.log("Disconnected from server");
    
});

socket.on("updateUserList", function (users) {
    let ol = $("<ol></ol>");

    users.forEach(function (user) {
        ol.append($("<li></li>").text(user));
    });
    $("#users").html(ol);
});

socket.on("newMessage", function (data) {
    let html = Mustache.render($("#message-template").html(), {
        text: data.text,
        from: data.from,
        createdAt: data.createdAt
    });
    $("#messages").append(html);
    scrollToBottom();
});

socket.on("newLocationMessage", function(message) {
    let html = Mustache.render($("#location-message-template").html(), {
        url: message.url,
        from: message.from,
        createdAt: message.createdAt
    });
    $("#messages").append(html);
    $("#send-location").text("Send Location");
    $("#send-location").attr("disabled", false);
    scrollToBottom();
});

$("#message-form").on("submit", function (e) {
    e.preventDefault();
    let data = {
        text: $("#m-input").val()
    };
    $("#m-input").val("");
    socket.emit("createMessage", data);
});

let locationButton = $("#send-location");
locationButton.on("click", function () {
    if (!navigator.geolocation){
        return alert("Geolocation not supported by your browser.");
    }
    $("#send-location").text("Sending...");
    $("#send-location").attr("disabled", true);
    navigator.geolocation.getCurrentPosition(function (position) {
        socket.emit("createLocationMessage", {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude
        });
    }, function () {
        alert("Unable to fetch location.");
        $("#send-location").text("Send Location");
        $("#send-location").attr("disabled", false);
    });
});

