$('.toggler').click(function (e) {
    // e.preventDefault();
      $('.side-nav-container').toggleClass('wide');
    $('.side-nav-container').toggleClass('short');
    $('.nav-item span').toggleClass('hide');
});

$('.resolve_btn').click(function (e){
    const id = $(this).data('id');
    const url = 'http://localhost:3000/admin/query/'+id;
    console.log(url);
    // send post request to url using fetch
    fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({id})
    })
    .then(data => { 
        console.log(data);
        if(data.status == 200){
            alert('Query Resolved');
            // make display none
            $(this).parent().css('display', 'none');
            check();
        }
    })
})
check();
function check(){
  let cnt =0;
  let queries = document.querySelectorAll('.query');
  for(let i=0;i<queries.length;i++){
    if(queries[i].style.display != 'none'){
      cnt++;
    }
  }
  if(cnt == 0){
    document.querySelector('.All_queries').style.display = 'none';
    document.querySelector('.null-image').style.display = 'flex';
  }
}