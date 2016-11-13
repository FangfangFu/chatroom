//Chatroom website
var username = 'guest';
var chatroom = 'flower';
var messageLength = 0;
var memberLength = 0;

function remove(id){
    $(id).find('li').remove();
}

function show(id, argu1){
    var arrayLength = argu1.length;
    for (var i = 0; i < arrayLength; i++) {
        $(id).find('ul').append('<li>' + argu1[i] + '</li>');
    } 
}

function updateArray_show(id, array){
    var arrayLength = array.length;
    for (var i = 0; i < arrayLength; i++) {
        if (array[i] != ""){
            array[i] = array[i].split(":")[0];
            $(id).find('ul').append('<li>' + array[i] + '</li>');
        }
    }
}

window.setInterval(function(){
  $.post( "http://singleendpointchatserver.herokuapp.com/api/v1/chatroom/"+chatroom+"?username="+username+"&expireafter=300", function( json ) {
    var messages = json.room.messages;
    var newMessagesLength = messages.length;
    var members = json.room.members.split(","); //"test:2121," = "test:3241", ""
    var newMembersLength = members.length;
    
    remove('#messages'); 
    show('#messages', messages);
    if (newMessagesLength > messageLength){
        $("#messages").scrollTop($("#messages ul").height());
    }
    messageLength = messages.length;
    
 
    remove('#members');
    updateArray_show('#members', members);
    if (newMembersLength > memberLength){
        $("#members").scrollTop($("#members ul").height());
    }
    memberLength = members.length;
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
  $.post( "http://singleendpointchatserver.herokuapp.com/api/v1/chatroom/"+chatroom+"?username="+username+"&message="+encodedMessage+"&expireafter=300");
  $("#messages").scrollTop($("#messages").height()*2);
});

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
  $('#chatroom').text(chatroom);
  messageLength = 0;
  $('#chatroomInput').val('');
});

