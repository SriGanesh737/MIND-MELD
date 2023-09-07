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

// i will use fetch api to remove the bookmark from the database
// and then i will remove the bookmark from the bookmarks page using javascript
function removeBookmarkHelper(bookmarkId){
    fetch('http://localhost:3000/bookmarks/removeBookmark/' + bookmarkId, {
      method: 'GET',
    })
      .then((response) => {
        if (response.ok) {
          console.log('Bookmark removed');
        } else {
          console.error('Error removing bookmark');
        }
      })
      .catch((error) => {
        console.error('Fetch error:', error);
      });
    
      // if there are no bookmarks show no bookmarks image.
}

$('a.remove_bookmarks_link').click(function(event) {
    
    event.preventDefault(); // prevent the default behavior of the anchor tag
    
    var url = $(this).data('href'); // get the URL from the data-href attribute of the anchor tag

    const bookmarkId = $(this).attr('id');

    swal({
        title: "Are you sure?",
        text: "Do you want to remove from bookmarks?",
        icon: "warning",
        buttons: true,
        dangerMode: true,
      })
      .then((willDelete) => {
        if (willDelete) {
            url="http://localhost:3000"+ url

        swal("Poof! Bookmark is removed!", {
                        icon: "success",
        });
          // window.location.href = url;
          removeBookmarkHelper(bookmarkId);
          
          
        } else {
          swal("Bookmark is not removed!");
        }
      });

  });


