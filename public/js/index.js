String.prototype.htmlEscape = function(){
    var span = document.createElement('span');
    var txt =  document.createTextNode('');
    span.appendChild(txt);
    txt.data = this;
    return span.innerHTML;
};

$(function(){
  comet_get();
  $('#chat #btn_send').click(chat_send);
  $('#chat #message').keydown(function(e){
    if(e.keyCode == 13) chat_send();
  });
});

var chat_send = function(){
  console.log('chat_send');
  var msg = $('#chat #message').val();
  $.post(app_root+'/chat', {data : msg});
  $('#chat #message').val('');
};

var comet_get = function(){
  var url = app_root+"/chat";
  console.log('comet_get : ' + url);
  $.ajax(
    {
      url : url,
      success : function(data){
        console.log("comet received : "+data);
        if(data && data.length > 0){
          var m = $('<li>').text(data);
          $('#chat #timeline').prepend(m);
        }
        else{
          console.log('comet error : received data is null');
        }
      },
      error : function(req, stat, e){
        console.log('comet error('+stat+')');
      },
      complete : function(e){
        comet_get();
      },
      type : 'GET',
      dataType : 'text',
      timeout : 60000
    }
  );
};
