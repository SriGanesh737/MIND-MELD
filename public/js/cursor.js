$(document).mousemove(function (e) {
    // values: e.clientX, e.clientY, e.pageX, e.pageY

    $('.outercursor').css('left', (e.pageX-13)+"px");
    $('.outercursor').css('top', (e.pageY-13)+"px");
    $(document).click(function (e) {
    $('.cursor').addClass("expand");
    setTimeout(() => {
            $('.cursor').removeClass("expand");
        }, 500)
    });
   });