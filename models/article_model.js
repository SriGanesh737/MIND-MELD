const mongoose=require('mongoose');
const Schema=mongoose.Schema;


const article_schema = new Schema({
    topic: {
        type: String,
        required: [true, 'category of article is required']
    },
    title: {
        type: String,
        required: [true, 'title of article is required']
    },
    author_name: {
        type: String,
        required: [true, 'author of article is required']
    },
    date_of_publish: {
        type: Date,
        default: Date.now()
    },
    content: {
        type: String,
        required: [true, 'Content of article is required']
    },
    tags: {
        type: Array,
        of: String
    },
    likes: {
        type: Number,
        default: 0
    },
    dislikes: {
        type: Number,
        default: 0
    },
    author_id: {
        type: String,
        required: [true, 'Author id is required']
    },
    image_link: {
        type: String,
        default: 'data:image/png;base64,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'
    },
    liked_userids: {
        type: Array,
        of: String
    },
    disliked_userids: {
        type: Array,
        of: String
    }
});

const article_model = mongoose.model('article_model', article_schema);

module.exports = article_model;