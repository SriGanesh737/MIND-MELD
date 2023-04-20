$('.toggler').click(function (e) {
    // e.preventDefault();
      $('.side-nav-container').toggleClass('wide');
    $('.side-nav-container').toggleClass('short');
    $('.nav-item span').toggleClass('hide');
});