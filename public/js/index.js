
var chat = new Chat(app_root+'/chat');
chat.on_get = function(data){
  var m = $('<li>').text(data);
  $('#chat #timeline').prepend(m);
};

var post = function(){
  var data = $('#chat #message').val();
  chat.post(data);
  $('#chat #message').val('')
};

$(function(){
  chat.start();
  $('#chat #btn_send').click(post);
  $('#chat #message').keydown(function(e){
    if(e.keyCode == 13) post();
  });
});

