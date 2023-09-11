let slideIndex = 0;
showSlides();                             

function showSlides() {
  let i;
  let slides = document.getElementsByClassName("mySlides");
  for (i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";  
  }
  slideIndex++;
  if (slideIndex > slides.length) {slideIndex = 1}    
  
  slides[slideIndex-1].style.display = "block";  
  setTimeout(showSlides, 1500); // Change image every 2 seconds
}

login=document.getElementById('loginsubmit')
loginform=document.querySelector('.loginform')
errorMessage=document.querySelector('.errorMessage')


login.addEventListener('click', (ev) => {
  ev.preventDefault();
  const email = document.getElementById('email').value;
  const pswd = document.getElementById('pswd').value;

  const xhr = new XMLHttpRequest();
  xhr.open('POST', '/login', true);
  xhr.setRequestHeader('Content-Type', 'application/json');

  xhr.onload = function () {
      if (xhr.status === 200) {
          // Validation passed; redirect to the new page
          const data = JSON.parse(xhr.responseText);
          window.location.href = data.redirectTo;
      } else if (xhr.status === 401) {
          // Validation failed; display an error message
          const errorData = JSON.parse(xhr.responseText);
          errorMessage.textContent = errorData.error;
      }
  };

  xhr.onerror = function () {
      // Handle network errors or other issues here
      console.error('XHR request failed.');
  };

  const requestData = JSON.stringify({ email: email, password: pswd });
  xhr.send(requestData);
});
