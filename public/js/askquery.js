$('.viewFullAnswer').click(function (e) {
    e.preventDefault();
    let no = e.currentTarget.classList[0];
    $('.answer-box-'+no).css('display', 'block');
});

$('.fa-xmark').click(function (e) {
    let no = e.currentTarget.classList[0];
    $('.answer-box-'+no).css('display', 'none');
});

// $(document).ready(function () {
//     $('.faq-solution').val('').attr('placeholder', "write your answer here");
// });




$('.answer').click(function (e) {
    let i = e.currentTarget.classList[0];
    $('.solution-' + i).toggleClass('dontshow');
    $('.' + i).toggleClass('hide');

});

$('.cancel_btn').click(function (e) {
    let i = e.currentTarget.classList[0].split('-')[1];

    $('.solution-' + i).toggleClass('dontshow');
     $('.' + i).toggleClass('hide');

});