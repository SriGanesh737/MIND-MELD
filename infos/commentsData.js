

const create_comment = (name, count, img, date, content) => {
    return { 'name': name, 'vote_count': count, 'img_link': img, 'date': date, 'content': content }
};


let all_comments = [];



let main_comment = create_comment('amyrobson', '9', '/images/avatars/image-amyrobson.webp', '1 year ago', 'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Ea fugit cumque exercitationem nisi beatae molestias, nihil nesciunt fugiat temporibus omnis sed quasi similique necessitatibus doloremque fuga? Accusantium totam iste nemo.')

let replies = [{ 'tagname': 'amyrobson', ...create_comment("ramsesmiron", "7", "/images/avatars/image-ramsesmiron.webp", "1 month ago", "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Ea fugit cumque exercitationem nisi beatae molestias, nihil nesciunt fugiat temporibus omnis sed quasi similique necessitatibus doloremque fuga? Accusantium totam iste nemo.") },

    { 'tagname': 'ramsesmiron', ...create_comment("juliusomo", "7", "/images/avatars/image-juliusomo.webp", "1 month ago", "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Ea fugit cumque exercitationem nisi beatae molestias, nihil nesciunt fugiat temporibus omnis sed quasi similique necessitatibus doloremque fuga? Accusantium totam iste nemo.") }
];

all_comments.push({ 'main_comment': main_comment, 'replies': replies });
main_comment = {};
replies = [];


main_comment = create_comment(' ramsesmiron', '7', '/images/avatars/image-ramsesmiron.webp', '1 year ago', 'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Ea fugit cumque exercitationem nisi beatae molestias, nihil nesciunt fugiat temporibus omnis sed quasi similique necessitatibus doloremque fuga? Accusantium totam iste nemo.')

all_comments.push({ 'main_comment': main_comment, 'replies': replies });
main_comment = {};
replies = [];



main_comment = create_comment(' juliusomo', '30', '/images/avatars/image-juliusomo.webp', '3 days ago', 'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Ea fugit cumque exercitationem nisi beatae molestias, nihil nesciunt fugiat temporibus omnis sed quasi similique necessitatibus doloremque fuga? Accusantium totam iste nemo.')


all_comments.push({ 'main_comment': main_comment, 'replies': replies });
main_comment = {};
replies = [];

// think how to implement the you tag ...

module.exports = all_comments;


