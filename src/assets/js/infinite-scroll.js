$(document).on('click','.data-can-select-list li',function(event) {
  var target = $(event.target);
 if(!target.is('.favorite')){
    $(this).addClass('active').siblings().removeClass('active');
 }

});

