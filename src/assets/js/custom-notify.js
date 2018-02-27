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
  initialSuccess(title,detail){
    $.notify({
      title: '<strong>'+title+'</strong>',
      message: detail
    },{
      type: 'success'
    });
  }
}
