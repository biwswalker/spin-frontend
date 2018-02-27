$(document).on('click','.data-can-select-list li',function() {
  $(this).addClass('active').siblings().removeClass('active');
});

