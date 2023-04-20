const is_present = (id, array) => {

    for (let i = 0; i < array.length; i++){
        if (array[i].id == id) return true;
    }
    return false;
}

const fetch_object = (id, array) => {
    for (let i = 0; i < array.length; i++) {
        if (array[i].id == id) return array[i];
    }
    return null;
}








// const create_comment = (name,cnt,link,date,content) => {
//     return {
//         'name': name,
//         'vote_cnt': cnt,
//         'img_link': link,
//         'date': date,
//         'content':content
//      }
// }





// let allcomments = [];
// let maincomment = create_comment('bhanu', 10, 'abc', 'one day ago', 'hi this is content');
// let replies = [];
// let reply = { 'tagname': 'ganesh', ...create_comment('bhanu', 10, 'abc', 'one day ago', 'hi this is content') };
// replies.push(reply);
// allcomments.push({ 'maincomment': maincomment, 'replies': replies });

// console.log(allcomments);

// console.log(allcomments[0]['replies']);



module.exports = { is_present, fetch_object };