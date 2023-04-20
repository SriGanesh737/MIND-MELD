$('.card').click(function (e) {
    let id = e.currentTarget.id;
    if(e.target.classList[0]!='remove-from-bookmarks')
    window.location.href = "/posts/" + id;
});

$('.card').click(function (e) {
    let id = e.currentTarget.id;
    if (e.target.classList[0] == 'remove-from-bookmarks')
        $(this).css('display', 'none');
});



