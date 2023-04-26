$('.your_blog').hover(function () {
   $(this).css('transform', 'scale(1.05)');
  }, 
  function () 
   {
    $(this).css('transform', 'scale(1)');
    }
);

$('.your_blog').click(function (e) 
{
    // e.preventDefault();
    let id = e.currentTarget.id;
    let cls = e.target.classList;
    if (cls[0] != 'edit' && cls[0] != 'delete')
        window.location.href = '/posts/' + id;
});

$('a.delete-btn-link').click(function(event) {
    event.preventDefault(); // prevent the default behavior of the anchor tag
    
    var url = $(this).data('href'); // get the URL from the data-href attribute of the anchor tag
    
    swal({
        title: "Are you sure?",
        text: "Once deleted, you will not be able to recover the article!",
        icon: "warning",
        buttons: true,
        dangerMode: true,
      })
      .then((willDelete) => {
        if (willDelete) {
            url="http://localhost:3000"+ url

       
        swal("Poof! Your article has been deleted successfully!", {
                        icon: "success",
        });
          window.location.href = url;
          
          
        } else {
          swal("Your article is not deleted!");
        }
      });

  });
