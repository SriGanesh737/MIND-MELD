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
  const tag = $('#myInput').val();
  if (tags_list.includes(tag)) return;
  tags_list.push(tag);
  const close = $('<span>').addClass('close').html('&times;');
    var newTag = $('<li>').html(tag).append(close);
  $('#myUL').append(newTag);
  $('.tags_string').val(getTagsString());
  // console.log(getTagsString());
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

