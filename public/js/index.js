var socket = io();

socket.on("connect", function () {
    socket.emit("updateRoomList", "", function (data){
        data.forEach(function(element) {
            let html = Mustache.render($("#rooms-list-template").html(), {
                OptionRooms: element
            });
            $("#Rname").append(html);
          }); 
    });
});

let joinButton = $("#join-button");
$("#join-form").on("submit", function (event) {
    if($('#join-form').attr('action') === ""){
        event.preventDefault();
    } else {
        return true;
    }
    $("#join-button").text("Joining...");
    $("#join-button").attr("disabled", true);
    let Uname = $("#Uname").val().trim();
    socket.emit("checkUserName", {name: Uname}, function (result) {
        if(result === "NOK") {
            $("#Uname").addClass("is-invalid");
            let html = Mustache.render($("#name-validate-template").html(), {
                invalidMessage: "Someone else using this name"
            });
            $("#validateToolTip").html(html);
            $("#join-button").text("Join");
            $("#join-button").attr("disabled", false);
        }
        else {
            $("#Uname").removeClass("is-invalid");
            $("#validateToolTip").html("");
            $("#join-button").text("Join");
            $("#join-button").attr("disabled", false);
            let newaction = "/chat.html";
            $('#join-form').attr('action', newaction);
            $("#join-form").submit();
        }
    });
});