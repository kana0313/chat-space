$(function(){ 
  function buildHTML(message){
  var image = message.image?`<img src="${message.image}">` : "" ;
  var html =
      `<div class="message" data-message-id="${message.id}">
        <div class="upper-message">
          <div class="upper-message__user-name">
            ${message.user_name}
          </div>
          <div class="upper-message__date">
            ${message.created_at}
          </div>
        </div>
        <div class="lower-message">
          <p class="lower-message__content">
            ${message.content}
          </p>
        </div>
        ${ image }
      </div>`
    return html;

   };
 
$('.new_message').on('submit', function(e){
 e.preventDefault();
 var formData = new FormData(this);
 var url = $(this).attr('action')
 $.ajax({
   url: url,
   type: "POST",
   data: formData,
   dataType: 'json',
   processData: false,
   contentType: false
 })

//  dataはcreate.json.jbuilderの中身が全部入っている
  .done(function(data){
    console.log(data)
    var html = buildHTML(data);
    $('.messages').append(html);
// $('要素名').animate({'動かすプロパティ' : '動かす縦横の幅'});
    $('.messages').animate({scrollTop: $('.messages')[0].scrollHeight}, 'fast');   
    $('#new_message')[0].reset();
  })
   .fail(function(){
     alert('error');
   });
   return false;
 });

 var reloadMessages = function() {
  //カスタムデータ属性を利用し、ブラウザに表示されている最新メッセージのidを取得
  last_message_id = $(".message:last").data("message-id")
  // user.js l59と一緒
  // var groupId = location.href 

  $.ajax({
    //ルーティングで設定した通り/groups/id番号/api/messagesとなるよう文字列を書く
    url: 'api/messages',
    //ルーティングで設定した通りhttpメソッドをgetに指定
    type: 'GET',
    dataType: 'json',
    //dataオプションでリクエストに値を含める
    data: {id: last_message_id}
  })
  
  .done(function(messages) {
    //追加するHTMLの入れ物を作る
    // var insertHTML = '';
    console.log(messages)
    // 配列messagesの中身一つ一つを取り出し、HTMLに変換したものを入れ物に足し合わせる
        messages.forEach(function(message){
          var appendHTML = buildHTML(message)
        $('.messages').append(appendHTML);
        $('messages').removeAttr('#new_message');
        // $('要素名').animate({'動かすプロパティ' : '動かす縦横の幅'});
        $('.messages').animate({scrollTop: $('.messages')[0].scrollHeight}, 1000);   
        $('#new_message')[0].reset();
      })
   })     
  .fail(function() {
    console.log('error');
  });
};
  setInterval(reloadMessages, 5000);

});

