class MessageNotify{
  example(){
    $.notify({
      title: '<strong>Data</strong>',
      message: 'detail'
    },{
      type: 'success',
      template: ''+
      '<div data-notify="container" class="col-11 col-lg-2 alert alert-{0}" role="alert">' +
      '{0}'+
      '</div>'
    });

  }
  initialSuccess(title){
    $.notify({
      title: '<strong>'+title+'</strong>',
    },{
      type: 'success',
      template:''+
      '<div data-notify="container" class="col-8 col-md-4 col-xl-2 alert text-center alert-{0}" role="alert">' +
      '{1}'+
      '</div>',
      delay: 3000,
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
      '<div data-notify="container" class="alert alert-{0}" role="alert">' +
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
      '<div data-notify="container" class="alert alert-{0}" role="alert">' +
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
}
