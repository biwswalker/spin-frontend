
var angle, radius = 1, playing = false, time = 0;

function rotate(degrees) {
    $(".spinning").css({
        '-webkit-transform': 'rotate(' + degrees + 'deg)',
        '-moz-transform': 'rotate(' + degrees + 'deg)',
        '-ms-transform': 'rotate(' + degrees + 'deg)',
        'transform': 'rotate(' + degrees + 'deg)'
    });
}

(function loop() {
    angle = time * radius;
    rotate(angle);
    if (playing) {
        if (radius < 200) {
            radius *= 1.03;
        }
    } else {
        radius *= 0.99;
    }
    time += 0.1;
    requestAnimationFrame(loop)
})();

function spin(play) {
    playing = play
    if(playing){
        time = 0;
        radius = 1;
        $("#login-submit").fadeOut();
        $("#username").prop('disabled', true);
        $("#password").prop('disabled', true);
        $("#remember").prop('disabled', true);
    }else{
        $("#login-submit").fadeIn();
        $("#username").prop('disabled', false);
        $("#password").prop('disabled', false);
        $("#remember").prop('disabled', false);
    }
    
    
}