let tags_list = [];
let tagstring=document.querySelector('.tags_string').value;
console.log(tagstring)
tagstring=tagstring.split('#').slice(0, -1);
tags_list=tagstring;
// alert(tags_list)
// console.log(tags_list)


const getTagsString = () =>{
  var str = '';
  tags_list.forEach(tag => {
    str += tag+'#';
  });
  return str;
}

$('.addBtn').click(function (e) {
  const tag = $('#myInput').val().trim();
  if (tag==""||tags_list.includes(tag)) return;
  tags_list.push(tag);
  const close = $('<span>').addClass('close').html('&times;');
    var newTag = $('<li>').html(tag).append(close);
  $('#myUL').append(newTag);
  $('.tags_string').val(getTagsString());
  $('#myInput').val("");
  $('#myInput').focus();
  // console.log(getTagsString());
});

$('#myInput').on('keydown', (event) => {
  if (event.key === 'Enter') {
    event.preventDefault();
    const tag = $('#myInput').val().trim();
    if (tag==""||tags_list.includes(tag)) return;
    tags_list.push(tag);
    const close = $('<span>').addClass('close').html('&times;');
    var newTag = $('<li>').html(tag).append(close);
    $('#myUL').append(newTag);
    $('.tags_string').val(getTagsString());
    $('#myInput').val("");
    $('#myInput').focus();

  }
});

$(document).on("click", ".close", function () {
  // Get the parent <li> element and remove it
  var tag = $(this).parent('li').text();
  tag = tag.slice(0, tag.length-1);
  var index = tags_list.indexOf(tag);
  if (index !== -1) {
    tags_list.splice(index, 1);
  }

  $(this).parent("li").remove();
  $('.tags_string').val(getTagsString());
  // console.log(getTagsString());
});

$('.input-content').click(function (e) {
  // e.preventDefault();
  let text = $('.input-content').text();
  console.log(text)
     $('.ck-content').text(text);
});


$('.save-btn').click(() => {


  let html = $('.ck-content').html();
  $('.input-content').html(html);
  $('.blog_content_html').val(html);

  console.log(html);
});

const form=document.querySelector('.form')
const postarticle=document.querySelector('.postarticle')


postarticle.addEventListener('click', (event) => {
  event.preventDefault(); // prevent form from submitting
  // perform form validation
  // alert('helo');

    swal({
      title: 'Are you sure?',
      text: 'Do you want to save the article?',
      icon: 'warning',
      buttons: ['No, cancel', 'Yes, submit!'],
      dangerMode: true,
    }).then(function(isConfirm) {
      if (isConfirm) {
        // If the user confirms the action, show a success message
        swal({
          title: 'Success!',
          text: 'Your article is saved successfully.',
          icon: 'success'
        });
        form.submit(); // submit the form
      }
      else
      {
        swal("Your article is not saved!","","error")
      }
    });




});