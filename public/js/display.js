let rated=document.querySelector(".rated");
let unrated=document.querySelector(".unrated");
let submitlike=document.querySelector(".submitlike");
let submitdislike=document.querySelector(".submitdislike");

rated.addEventListener('click', () => {
    rated.style.color = "rgb(6, 108, 191)";
    submitlike.style.pointerEvents="none"
    unrated.style.color = "black"
    submitdislike.style.pointerEvents="auto"
});
unrated.addEventListener('click', () => {
    unrated.style.color = "rgb(6, 108, 191)";
    submitdislike.style.pointerEvents="none"
    rated.style.color = "black"
   submitlike.style.pointerEvents="auto"
    

});


$('a.bookmark-link').click(function(event) {
    event.preventDefault(); // prevent the default behavior of the anchor tag
   
    var url = $(this).data('href'); // get the URL from the data-href attribute of the anchor tag
    
    swal({
        title: "Are you sure?",
        text: "Do you want to add to bookmarks?",
        icon: "warning",
        buttons: true,
        dangerMode: true,
      })
      .then((willDelete) => {
        if (willDelete) {
            url="http://localhost:3000"+ url

       
        swal("Poof! article has been added to your bookmarks successfully!", {
                        icon: "success",
        });
        // alert(url);
          window.location.href = url;
          
          
        } else {
          swal("article is not added to marked as you canceled!");
        }
      });

  });


