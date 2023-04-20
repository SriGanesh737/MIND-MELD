
  var li_main=document.querySelector('.li_main');
  var dd_menu=document.querySelector('.dd_menu');

  li_main.addEventListener('click',(e)=>{
    dd_menu.classList.toggle("activated");

    console.log(e.currentTarget)
    console.log('yyyy')
  })
