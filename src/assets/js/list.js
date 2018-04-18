//For Project infinite scroll
$(document).on('click','.data-can-select-list li',function(event) {
  var target = $(event.target);
 if(!target.is('.fa-heart')){
    $(this).addClass('active').siblings().removeClass('active');
    $('html,body').animate({ scrollTop: 0 }, 'slow');
 }
});


$(document).on('click','.search-results-body>div',function(event) {
    $(this).addClass('active').siblings().removeClass('active');
    $('html,body').animate({ scrollTop: 0 }, 'slow');
});

var SpinCustomListUI = (function(){
  return {

  selectOne:function(selector){
    $(selector).on('click','.data-item',function(event) {
        $(this).addClass('active').siblings().removeClass('active');
        $('html,body').animate({ scrollTop: 0 }, 'slow');
      });
  }

}
});

