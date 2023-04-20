$('.cancel_reply').click(function (e) {
    const arr = e.currentTarget.id.split('-');
    const fp = arr[0];
    const i = arr[1];
    let j;
    if (arr.length == 3) {
        j = arr[2];
        $('#reply-boxn-' + i + '-' + j).toggleClass('dontshow');
    }
    else {
        $('#reply-box-' + i).toggleClass('dontshow');
    }

});

$('.reply').click(function (e) {
    const arr = e.currentTarget.id.split('-');
    const fp = arr[0];
    const i = arr[1];
    let j;
    if (arr.length == 3) {
        j = arr[2];
        $('#reply-boxn-'+i+'-'+j).toggleClass('dontshow');
    }
    else {
        $('#reply-box-' + i).toggleClass('dontshow');
    }

});