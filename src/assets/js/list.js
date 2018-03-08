//For Project infinite scroll
$(document).on('click','.data-can-select-list li',function(event) {
  var target = $(event.target);
 if(!target.is('.fa-heart')){
    $(this).addClass('active').siblings().removeClass('active');
 }
});

class SpinCustomListUI{

  selectOne(selector){
    $(selector).on('click','.data-item',function(event) {
        $(this).addClass('active').siblings().removeClass('active');
      });
  }

}

