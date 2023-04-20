
let clcikedId = 0;

$('.article').click(function (e) {
    // e.preventDefault();

    let clickedSource = e.currentTarget.children[0].children[0].getAttribute('src');

    clickedId = e.currentTarget.id;
    // let title=e.currentTarget.children[1].children[0].innerText;
    let html_content = $(this).find('.text-desc').text();
    $('.pop-image').attr('src', clickedSource);
    $('.modal-image').css('display', 'block');
    // $('.modal-heading').text(title)
    $('.description-text').html(html_content);

    //scroll to the top of the page
    $(window).scrollTop(0);
    $('body').css('overflow', 'hidden');

});

$('.close-btn').click(function (e) {
    // e.preventDefault();
       $('.close-button').attr('href', '#'+clickedId);
        $('.modal-image').css('display', 'none');
    $('body').css('overflow', 'auto');

});

$('.read-more').click((e) => {
    // e.preventDefault();
    window.location.href = '/posts/' + clickedId;
})