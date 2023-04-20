//  alert('hello');
const galleryItems = document.querySelector(".articles").children;
 console.log(galleryItems)
 const prev=document.querySelector(".prev");
 const next=document.querySelector(".next");
 const page=document.querySelector(".page-num");
 const maxItem=9;
 let index=1;

  const pagination=Math.ceil((galleryItems.length-1)/maxItem);


  prev.addEventListener("click",function(){
    index--;
    check();
    showItems();
  })
  next.addEventListener("click",function(){
  	index++;
  	check();
    showItems();
  })

  function check(){
  	 if(index==pagination){
  	 	next.classList.add("disabled");
  	 }
  	 else{
  	   next.classList.remove("disabled");
  	 }

	  if (index == 1) {
		  console.log('here2')
  	 	prev.classList.add("disabled");
  	 }
  	 else{
  	   prev.classList.remove("disabled");
  	 }
  }

  function showItems() {
  	 for(let i=1;i<galleryItems.length; i++){
  	 	galleryItems[i].classList.remove("show");
  	 	galleryItems[i].classList.add("hide");


  	    if(i>=(index*maxItem)+1-maxItem && i<index*maxItem+1){
  	 	  // if i greater than and equal to (index*maxItem)-maxItem;
  		  // means  (1*8)-8=0 if index=2 then (2*8)-8=8
          galleryItems[i].classList.remove("hide");
          galleryItems[i].classList.add("show");
  	    }
  	    page.innerHTML=index;
  	 }


  }

window.onload = function () {
	  console.log('here')
  	showItems();
  	check();
  }








