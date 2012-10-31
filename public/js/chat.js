
var Chat = function(url){
  this.url = url;
  var self = this;

  this.post = function(data){
    $.post(self.url, {'data' : data});
  };

  this.start = function(){
    self.get();
  };

  this.on_get = null;

  this.get = function(){
    $.ajax(
      {
        url : self.url,
        success : function(data){
          if(data && data.length > 0){
            if(self.on_get && typeof self.on_get == 'function') self.on_get(data);
          }
        },
        error : function(req, stat, e){
        },
        complete : function(e){
          self.get();
        },
        type : 'GET',
        dataType : 'text',
        timeout : 60000
      }
    );
  };
  
};
