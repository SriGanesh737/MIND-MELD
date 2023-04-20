$('.card').click(function (e) {

    let id = e.currentTarget.id;
   let redirectFile = "posts?topic="+id;
    window.location.href = redirectFile;

});