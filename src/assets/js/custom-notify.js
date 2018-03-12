
$.notifyDefaults({
	type: 'success',
	allow_dismiss: true
});

class MessageNotify{
  initialSuccess(title){
    $.notify({
      title: '<strong>'+title+'</strong>',
    },{
      type: 'success',
      template:''+
      '<div data-notify="container" class="col-8 col-md-4 col-xl-2 alert alert-{0}" role="alert">' +

      '{1}'+
      '</div>',
      delay: 2000,
      animate: {
        enter: 'animated fadeInDown',
        exit: 'animated fadeOutRight'
      },
    });
  }

  initialWarning(title,detail){
    $.notify({
      title: '<strong>'+title+'</strong>',
      message: detail
    },{
      type: 'warning',
      template:''+
      '<div data-notify="container" class="col-8 col-md-4 col-xl-2 alert alert-{0}" role="alert">' +
      '<button type="button" aria-hidden="true" class="close" data-notify="dismiss">×</button>'+
      '{1} {2}'+
      '</div>',
      delay: 5000,
      animate: {
        enter: 'animated fadeInDown',
        exit: 'animated fadeOut'
      },
      placement: {
        from: "top",
        align: "center"
      },
    });
  }

  initialError(title,detail){
    $.notify({
      title: '<strong>'+title+'</strong>',
      message: detail
    },{
      type: 'danger',
      template:''+
      '<div data-notify="container" class="col-8 col-md-4 col-xl-2 alert alert-{0}" role="alert">' +
      '<button type="button" aria-hidden="true" class="close" data-notify="dismiss">×</button>'+
      '{1} {2}'+
      '</div>',
      delay: 10000,
      animate: {
        enter: 'animated fadeInDown',
        exit: 'animated fadeOut'
      },
      placement: {
        from: "top",
        align: "center"
      },
    });
  }
}
