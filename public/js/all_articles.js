

$('a.delete_article').click(function(event) {
    // alert('hii')
    event.preventDefault(); // prevent the default behavior of the anchor tag
    
    var url = $(this).data('href'); // get the URL from the data-href attribute of the anchor tag
    
    swal({
        title: "Are you sure?",
        text: "Do you want to delete the article?",
        icon: "warning",
        buttons: true,
        dangerMode: true,
      })
      .then((willDelete) => {
        if (willDelete) {
            url="http://localhost:3000"+ url

       alert(url)
        swal("Poof! article is deleted successfully!", {
                        icon: "success",
        });
          window.location.href = url;
          
          
        } else {
          swal("article is restored!");
        }
      });

  });