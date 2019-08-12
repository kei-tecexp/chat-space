$(function() {

  function buildHTML(message){
    var html = `<div class="message" data-message-id="${message.id}">
                  <div class="upper-message">
                    <div class="upper-message__user-name">
                      ${message.user_name}
                    </div>
                    <div class="upper-message__date">
                      ${message.created_at}
                    </div>
                  </div>`
    if (message.image_url && message.body) {
      html = html +`<div class="lower-meesage">
                      <div class="lower-message__content">
                        ${message.body}
                      </div>
                      <img class="lower-message__image" src="${message.image_url}" alt="">
                    </div>
                    </div>`
    } else if (message.body) {
      html = html +`<div class="lower-meesage">
                      <div class="lower-message__content">
                        ${message.body}
                      </div>
                    </div>
                    </div>`
      
    } else {
      html = html +`<div class="lower-meesage">
                      <img class="lower-message__image" src="${message.image_url}" alt="">
                    </div>
                    </div>`
    } 
    return html;
  }

  $('#new_message').on('submit', function(e) {
    e.preventDefault();
    var formData = new FormData(this);
    var href = $(this).attr('action');
    $.ajax({
      url: href,
      type: "POST",
      data: formData,
      dataType: 'json',
      processData: false,
      contentType: false
    })
    .done(function(data){
      var html = buildHTML(data);
      $('.messages').append(html);
      $('#new_message')[0].reset();
      $('.form__submit').removeAttr('disabled');
      $('.messages').animate({ scrollTop: $('.messages')[0].scrollHeight});
    })
    .fail(function(){
      alert('メッセージを入力してください。');
      $('.form__submit').removeAttr('disabled');
    })
  });

  var reloadMessages = function() {
    var last_message_id = $('.message').last().data('message-id');
    $.ajax({
      url: "api/messages",
      type: 'get',
      dataType: 'json',
      data: {id: last_message_id}
    })
    .done(function(messages) {
      var insertHTML = '';
      if (messages.length !== 0) {
        messages.forEach(function(message){
          insertHTML = buildHTML(message);
        });
        $('.messages').append(insertHTML);
        $('.messages').animate({ scrollTop: $('.messages')[0].scrollHeight});   
      } else {

      }
    })
    .fail(function() {
      console.log('error');
    });
  };
  $(window).on('load',function(){ 
    var path = location.pathname
    if (path.match(/^\/groups\/\d*\/messages$/)){
        setInterval(reloadMessages, 5000);
    }
  });
});