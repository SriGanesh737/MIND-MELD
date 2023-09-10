

$('a.delete_article').click(function(event) {
    // alert('hii')
    event.preventDefault(); // prevent the default behavior of the anchor tag
    
    var url = $(this).data('href'); // get the URL from the data-href attribute of the anchor tag
    var articleid="#"+$(this).data('articleid')
    // alert(articleid)
    swal({
        title: "Are you sure?",
        text: "Do you want to delete the article?",
        icon: "warning",
        buttons: true,
        dangerMode: true,
      })
      .then((willDelete) => {
        if (willDelete) {
             $(articleid).css("display","none")
            url="http://localhost:3000"+ url 

      
        swal("Poof! article is deleted successfully!", {
                        icon: "success",
        });
          window.location.href = url;
          
          
        } else {
          swal("article is restored!");
        }
      });

  });


  $('.deleteArticle').click(function (event) {
    event.preventDefault();
    var url = $(this).data('href');
    var articleNumber = $(this).data('articleid');
    var articleId = "#" + articleNumber;
  
    swal({
      title: "Are you sure?",
      text: "Do you want to delete the article?",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        $(articleId).css("display", "none");
        url = "http://localhost:3000" + url;
  
        // Create a new XMLHttpRequest object
        var xhr = new XMLHttpRequest();
  
        // Configure the request
        xhr.open('GET', url, true);
  
        // Set up an event listener to handle the response
        xhr.onload = function () {
          if (xhr.status === 200) {
            console.log('Article deleted successfully.');
            swal("Poof! article is deleted successfully!", {
              icon: "success"
            });
            // You can perform any additional actions here after the article is deleted
          } else {
            console.error('Failed to delete the article.');
          }
        };
  
        // Send the GET request
        xhr.send();
      } else {
        swal("article is restored!");
      }
    });
  });
  