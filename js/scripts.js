$('#title').addClass('redtitle');

var json = {
   "room":{
      "name":"FangDev",
      "members":"Salgat:1452401384430,Fangfang2:1452401457085",
      "messages":[
         "Salgat: I love you more xiaobei",
         "Fangfang: I love you Laobei"
      ]
   }
};

var username = 'guest';
var chatroom = 'Flower'

function removeMessages(){
    $('#messages').find('li').remove();
}

function showMessages(messages){
    var arrayLength = messages.length;
    for (var i = 0; i < arrayLength; i++) {
        $('#messages').find('ul').append('<li>' + messages[i] + '</li>');
    } 
}

window.setInterval(function(){
  $.post( "http://singleendpointchatserver.herokuapp.com/api/v1/chatroom/"+chatroom+"?username="+username+"&expireafter=60", function( json ) {
    var messages = json.room.messages;
    removeMessages();
    showMessages(messages);
  });
}, 1000);

$("#messageInput").keyup(function(event){
    if(event.keyCode == 13){
        $("#messageSubmit").click();
    }
});

$('#messageSubmit').on('click', function(event) {
  var message = $('#messageInput').val();
  $('#messageInput').val('');
  var encodedMessage = encodeURIComponent(message);
  $.post( "http://singleendpointchatserver.herokuapp.com/api/v1/chatroom/"+chatroom+"?username="+username+"&message="+encodedMessage+"&expireafter=60");
});

$("#messages").addClass('scroll');
$("#messages").scroll();

$("#usernameInput").keyup(function(event){
    if(event.keyCode == 13){
        $("#usernameSubmit").click();
    }
});

$('#usernameSubmit').on('click', function(event) {
  username = encodeURIComponent($('#usernameInput').val());
  $('#usernameInput').val('');
});

$("#chatroomInput").keyup(function(event){
    if(event.keyCode == 13){
        $("#chatroomSubmit").click();
    }
});

$('#chatroomSubmit').on('click', function(event) {
  chatroom = encodeURIComponent($('#chatroomInput').val());
  $('#chatroom').append(chatroom);
  $('#chatroomInput').val('');
});