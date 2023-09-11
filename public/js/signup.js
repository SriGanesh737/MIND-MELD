
let resume = document.querySelector('.resume');
let resume_upload = document.querySelector('.resume_upload');
firstname=document.querySelector('.firstname');

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
  return /^[A-Za-z\s]*$/.test(str) && str.trim()!='';
}

function onlynumbers(str) {
  return /^[0-9]*$/.test(str) && str.trim()!='' ;
}

function checkpassword(str) {
  return /^^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{7,15}$/.test(str) ;
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
  incem=document.querySelector('.incem')
  function isValidEmail(email) {
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    return emailRegex.test(email) && email.trim()!='';
  }
  email.addEventListener('keyup',async ()=>{
    
    emailvalue=email.value
    if(!isValidEmail(email.value))
    {
      incem.innerHTML="Incorrect email format"
    }
    else
    {
      
      await  fetch('/checkEmail', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ emailvalue }),
        })
        .then(response =>{
          if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
          })
        .then(data => {
            if (data.exists) {
                // Email exists
                incem.innerHTML="this email already exists"
                console.log('Email exists');
            } else {
                // Email does not exist
                incem.innerHTML=""
                console.log('Email does not exist');
            }
        })
        .catch(error => {
            console.error('Error:', error);
        });
    }
  })



  firstname.addEventListener('keyup',()=>{
   if(!onlyLetters(firstname.value)||firstname.value=='')
   {

    incfn.innerHTML="Incorrect name format";
   }
   else
   incfn.innerHTML=""
  })
  lastname.addEventListener('keyup',()=>{
   if(!onlyLetters(lastname.value)||lastname.value=='')
   {


    incln.innerHTML="Incorrect name format";
   }
   else
   incln.innerHTML=""
  })
  phno.addEventListener('keyup',()=>{
    // alert(phno.value.length)
    if(!onlynumbers(phno.value) ||phno.value.length!=10)
    {
    inccn.innerHTML="Incorrect contact number format";
   }
   else
   inccn.innerHTML="";
  })
  password.addEventListener('keyup',()=>{
   if(!checkpassword(password.value))
   {
    // alert(phno.value);
    incpswd.innerHTML="Incorrect password format";
   }
   else
   incpswd.innerHTML="";
  })
  cnfpassword.addEventListener('keyup',()=>{
   if(password.value!==cnfpassword.value)
   {
    //  alert(password.value);
    //  alert(cnfpassword.value)
    incnfpswd.innerHTML="password did not match";
   }
   else
   incnfpswd.innerHTML="";
  })

 
  register.addEventListener('click', (event) => {
  event.preventDefault(); // prevent form from submitting
  // perform form validation

  if (firstname.value!='' &&lastname.value!='' &&  onlyLetters(firstname.value) && onlyLetters(lastname.value) && onlynumbers(phno.value) && phno.value.length === 10 && checkpassword(password.value) && password.value == cnfpassword.value && isValidEmail(email.value)) {
    swal({
      title: 'Are you sure?',
      text: 'Do you want to register with given details?',
      icon: 'warning',
      buttons: ['No, cancel', 'Yes, submit!'],
      dangerMode: true,
    }).then(function(isConfirm) {
      if (isConfirm) {
        
        form.submit();
      }
    });

  }
  else
  {
    swal("Error!","Incorrect details!","error")
  }

});