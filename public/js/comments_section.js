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

$('.delete').click(function (e) {
    let comment_id = e.currentTarget.classList[0].split('-');
    comment_id = comment_id[1];
    const article_id = e.currentTarget.dataset.article_id;
    // console.log(comment_id,"....", article_id);
    const endpoint = '/posts/' + article_id + '/' + comment_id;
    console.log(endpoint);
    const options = {
        method: 'DELETE'
    };
    fetch(endpoint, options)
        .then(response => {
            console.log("COMMENT deleted successfully");
            window.location.href = "/posts/" + article_id;
        })
        .catch(error => console.error(error));
});