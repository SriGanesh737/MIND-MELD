$('.your_blog').hover(function () {

    $(this).css('transform', 'scale(1.05)');

    }, function () {

    $(this).css('transform', 'scale(1)');
    }
);

$('.your_blog').click(function (e) {
    // e.preventDefault();
    let id = e.currentTarget.id;
    let cls = e.target.classList;
    if (cls[0] != 'edit' && cls[0] != 'delete')
        window.location.href = '/posts/' + id;
});


