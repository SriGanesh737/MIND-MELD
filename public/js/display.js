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

