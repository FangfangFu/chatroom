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

var messages = json.room.messages;
var arrayLength = messages.length;
for (var i = 0; i < arrayLength; i++) {
    $('#messages').find('ul').append('<li>' + messages[i] + '</li>');
}