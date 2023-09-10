let rated=document.querySelector(".rated");
let unrated=document.querySelector(".unrated");
let submitlike=document.querySelector(".submitlike");
let submitdislike=document.querySelector(".submitdislike");
let likes_cnt=document.querySelector(".likes_cnt");
let dislikes_cnt=document.querySelector(".dislikes_cnt");

rated.addEventListener('click', () => {
    const article_id = rated.dataset.article_id;
    // if already liked, return
    if (rated.style.color === "rgb(6, 108, 191)") {
        return;
    }
    rated.style.color = "rgb(6, 108, 191)";
    submitlike.style.pointerEvents="none"
    unrated.style.color = "black"
    submitdislike.style.pointerEvents="auto"
    likes_cnt.innerHTML=parseInt(likes_cnt.innerHTML)+1;
    dislikes_cnt.innerHTML=parseInt(dislikes_cnt.innerHTML)-1;
    const url = 'http://localhost:3000/posts/liked/'+article_id;
    console.log(url);
    // send post request using fetch
    fetch(url, {
        method: 'POST',
        body: JSON.stringify({ article_id }),
        headers: {
            'Content-Type': 'application/json',
        },
    })
}); 
unrated.addEventListener('click', () => {
    const article_id = unrated.dataset.article_id;
    // if already disliked, return
    if (unrated.style.color === "rgb(6, 108, 191)") {
        return;
    }
    unrated.style.color = "rgb(6, 108, 191)";
    submitdislike.style.pointerEvents="none"
    rated.style.color = "black"
   submitlike.style.pointerEvents="auto"
    likes_cnt.innerHTML=parseInt(likes_cnt.innerHTML)-1;
    dislikes_cnt.innerHTML=parseInt(dislikes_cnt.innerHTML)+1;
    const url = 'http://localhost:3000/posts/disliked/'+article_id;
    console.log(url)
    // send post request using fetch
    fetch(url,{
      method: 'POST',
      body: JSON.stringify({ article_id }),
      headers: {
          'Content-Type': 'application/json',
      }, 
    })
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





