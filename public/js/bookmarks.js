$('.card').click(function (e) {
    let id = e.currentTarget.id;
    if(e.target.classList[0]!='remove-from-bookmarks')
    window.location.href = "/posts/" + id;
});

// $('.card').click(function (e) {
//     let id = e.currentTarget.id;
//     if (e.target.classList[0] == 'remove-from-bookmarks')
//         $(this).css('display', 'none');
// });

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
      check();
}

function check(){
    let cards = document.querySelectorAll('.card');
    let cnt = 0;
    for(let i=0;i<cards.length;i++){
        if(cards[i].style.display!='none')
            cnt++;
    }
    if(cnt==0){
        document.querySelector('.not_available').style.display = 'flex';
        document.querySelector('.cards').style.display = 'none';
    }
}

check();

$('a.remove_bookmarks_link').click(function(event) {
    
    event.preventDefault(); // prevent the default behavior of the anchor tag
    
    var url = $(this).data('href'); // get the URL from the data-href attribute of the anchor tag

    const bookmarkId = $(this).data('bookmarkid');

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
          $('#'+bookmarkId).css('display', 'none');
          removeBookmarkHelper(bookmarkId);
          
        } else {
          swal("Bookmark is not removed!");
        }
      });

  });


