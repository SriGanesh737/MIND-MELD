
let resume = document.querySelector('.resume');
let resume_upload = document.querySelector('.resume_upload');
firstname=document.querySelector('.firstname');
// firstname.addEventListener('focusout',()=>{
//   alert('hello');
// })
selectElement = document.querySelector('#motive');
function checkup() {
  selectElement = document.querySelector('#motive');
  output = selectElement.value;
  if (output === 'expert') {
    resume_upload.setAttribute('required', '')
    resume.style.display = "block";
  }
  else {
    resume_upload.removeAttribute('required');
    resume.style.display = "none";
  }
}
function onlyLetters(str) {
  return /^[A-Za-z\s]*$/.test(str);
}

function onlynumbers(str) {
  return /^[0-9]*$/.test(str);
}

function checkpassword(str) {
  return /^^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{7,15}$/.test(str);
}
  firstname=document.querySelector('.firstname');
  incfn=document.querySelector('.incfn');
  lastname=document.querySelector('.lastname');
  incln=document.querySelector('.incln');
  email=document.querySelector('.email');
  phno=document.querySelector('.phno');
  inccn=document.querySelector('.inccn');
  password=document.querySelector('.password');
  incpswd=document.querySelector('.incpswd');
  cnfpassword=document.querySelector('.cnfpassword');
  incnfpswd=document.querySelector('.incnfpswd');
  register=document.querySelector('.register');
  form=document.querySelector('.myform')
  selectElement = document.querySelector('#motive');
  firstname.addEventListener('focusout',()=>{
   if(!onlyLetters(firstname.value)||firstname.value=='')
   {
    // alert(firstname.value);

    incfn.innerHTML="Incorrect name format";
   }
   else
   incfn.innerHTML=""
  })
  lastname.addEventListener('focusout',()=>{
   if(!onlyLetters(lastname.value)||lastname.value=='')
   {
   

    incln.innerHTML="Incorrect name format";
   }
   else
   incln.innerHTML=""
  })
  phno.addEventListener('focusout',()=>{
    // alert(phno.value.length)
    if(!onlynumbers(phno.value) ||phno.value.length!=10)
    {
    inccn.innerHTML="Incorrect contact number format";
   }
   else
   inccn.innerHTML="";
  })
  password.addEventListener('focusout',()=>{
   if(!checkpassword(password.value))
   {
    // alert(phno.value);
    incpswd.innerHTML="Incorrect password format";
   }
   else
   incpswd.innerHTML="";
  })
  cnfpassword.addEventListener('focusout',()=>{
   if(password.value!==cnfpassword.value)
   {
    //  alert(password.value);
    //  alert(cnfpassword.value)
    incnfpswd.innerHTML="password did not match";
   }
   else
   incnfpswd.innerHTML="";
  })

  // register.addEventListener('click',()=>{
  //   alert('hello')
  //   if (onlyLetters(firstname.value) && onlyLetters(lastname.value) && onlynumbers(phno.value) && phno.value.length === 10 && checkpassword(pswd.value) && pswd.value == cnfpswd.value)
  //   {
  //     register.removeAttribute('disabled');
  //   }
  // })
  register.addEventListener('click', (event) => {
  event.preventDefault(); // prevent form from submitting
  // perform form validation
  
  if (firstname.value!='' &&lastname.value!='' &&  onlyLetters(firstname.value) && onlyLetters(lastname.value) && onlynumbers(phno.value) && phno.value.length === 10 && checkpassword(password.value) && password.value == cnfpassword.value) {
    swal({ 
      title: 'Are you sure?',
      text: 'Do you want to register with given details?',
      icon: 'warning',
      buttons: ['No, cancel', 'Yes, submit!'],
      dangerMode: true,
    }).then(function(isConfirm) {
      if (isConfirm) {
        // If the user confirms the action, show a success message
        swal({
          title: 'Success!',
          text: 'Your details are updated successfully.',
          icon: 'success'
        });
        form.submit(); // submit the form
      }
    });
    
  } 
  else
  {
    swal("Error!","Incorrect details!","error")
  }
  
});