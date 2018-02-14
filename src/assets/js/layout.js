$(document).ready(function () {

  $('#show-sidebar').on('click', function () {
      $(this).addClass('invisible');
      $('#sidebar').removeClass('active');

  });

  $('#hide-sidebar').on('click', function () {
    $('#show-sidebar').removeClass('invisible');
    $('#sidebar').addClass('active');
});

});
