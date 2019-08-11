$(function() {

  var search_list = $("#user-search-result");
  var addMember = $(".js-add-user");
  
  function appendCandidate(user) {
    var html = `<div class="chat-group-user clearfix">
                  <p class="chat-group-user__name">${user.name}</p>
                  <div class="user-search-add chat-group-user__btn chat-group-user__btn--add" data-user-id="${user.id}" data-user-name="${user.name}">追加</div>
                </div>`
    search_list.append(html);
   }
  
  function appendErrMsgToHTML(msg) {
    var html = `<div class="chat-group-user clearfix">${ msg }</div>`
    search_list.append(html);
  }

  function appendAddMember(id, name) {
    var html = `<div class='chat-group-user' id='chat-group-user-${id}'>
                  <input name='group[user_ids][]' type='hidden' value='${id}'>
                  <p class='chat-group-user__name'>${name}</p>
                  <div class='user-search-remove chat-group-user__btn chat-group-user__btn--remove js-remove-btn'>削除</div>
                </div>`
    addMember.append(html);
    } 

    
  $("#user-search-field").on("keyup", function() {
    var input = $("#user-search-field").val();    
    $.ajax({
      type: 'GET',
      url: '/users/',
      data: { keyword: input },
      dataType: 'json'
    })
    .done(function(users) {
      $("#user-search-result").empty();
      if (users.length !== 0) {
        users.forEach(function(user){
          appendCandidate(user);
        });
      }
      else {
        appendErrMsgToHTML("一致するユーザーが見つかりません");
      }
    })
    .fail(function() {
      alert('ユーザー検索に失敗しました');
    })
  });

  $(document).on("click", ".chat-group-user__btn--add", function(){
    var id = $(this).attr('data-user-id');
    var name = $(this).attr('data-user-name');
    appendAddMember(id, name);
    $(this).parent().remove();
  });

  $(document).on("click", ".chat-group-user__btn--remove", function(){
    $(this).parent().remove();
  });
});