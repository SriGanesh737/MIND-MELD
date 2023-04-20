const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const bookmarks_schema = new Schema({
    user_id: {
        type: String,
        required: [true, 'user_id is required']
    },
    bookmarks_ids: {
        type: Array,
        default: []
    }
});

const bookmarks_model = mongoose.model('bookmarks_model', bookmarks_schema);

module.exports = bookmarks_model;