const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const faq_schema = new Schema({
    'user_id': {
        type: String,
        required:[true,'user_id is required']
    },
    'topic': {
        type: String,
        required: [true, 'Topic is required']
    },
    'popularity': {
        type: Number,
        default: 0
    },
    'question': {
        type: String,
        required: [true, 'Question is required']
    },
    'answer': {
        type: String,
        default: " "
    },
    'profile-image-link': {
        type: String,
        default:"/images/doctor.jpg"
    },
    'is_answered': {
        type: Boolean,
        default: false
    },
    'expert_id': {
        type: String,
        default:'exp_id'
    }
});

const faq = mongoose.model('faq',faq_schema);


module.exports = faq;

