function onlyLetters(str) {
    return /^[A-Za-z\s]*$/.test(str);
  }
  
  function onlynumbers(str) {
    return /^[0-9]*$/.test(str);
  }
     firstname=document.querySelector('.firstname');
     incfn=document.querySelector('.incfn');
     lastname=document.querySelector('.lastname');
     incln=document.querySelector('.incln');
     phoneno=document.querySelector('.phoneno');
     incph=document.querySelector('.incph');
     register=document.querySelector('.register');
     form=document.querySelector('.myform')
    //  alert('hello')
     firstname.addEventListener('keyup',()=>{
      if(!onlyLetters(firstname.value))
      {
        //   alert('hii')
       incfn.innerHTML="Incorrect first name";
      }
      else
      {
        incfn.innerHTML="";
      }
  
     }
    )

    lastname.addEventListener('keyup',()=>{
        if(!onlyLetters(lastname.value))
        {
         incln.innerHTML="Incorrect last name";
        }
        else
        {
          incln.innerHTML="";
        }
    
       }
      )
      phoneno.addEventListener('keyup',()=>{
        if(!onlynumbers(phoneno.value)||phoneno.value.length!=10)
        {
         incph.innerHTML="Incorrect contact number";
        }
        else
        {
          incph.innerHTML="";
        }
    
       }
      )


      register.addEventListener('click', (event) => {
        event.preventDefault(); // prevent form from submitting
        // perform form validation
        
        if (onlyLetters(firstname.value) && onlyLetters(lastname.value) && onlynumbers(phoneno.value) && phoneno.value.length === 10 ) {
            form.submit(); // submit the form
          
        } 
      });