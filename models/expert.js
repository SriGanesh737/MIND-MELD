const mongoose = require('mongoose');

const Schema = mongoose.Schema;


const expert_schema = new Schema({
    password: {
        type: String,
        required:[true,'Password is required']
    },
    firstname:{
        type: String,
        required: [true, 'firstname is required']
    },
    lastname: {
        type: String,
        required: [true, 'lastname is required']
    },
    domain: {
        type: String,
        default: 'not specified'
    },
    email: {
        type: String,
        required: [true, 'gmail is required']
    },
    phone: {
        type: String,
        required: [true, 'Phone number is required']
    },
    gender: {
        type: String,
        default:'not specified'
    },
    insta_link: {
        type: String,
        default:'/'
    },
    facebook_link: {
        type: String,
        default:'/'
    },
    github_link: {
        type: String,
        default:'/'
    },
    qualification:{
         type:String,
         default:'not specified'
    },
    dateofbirth:{
        type:Date,
        default:Date.now()
    },
    profile_image_link: {
        type: String,
        default:'https://th.bing.com/th/id/OIP.z4no5tqp2ryBdMMD5NU9OgHaEv?w=245&h=180&c=7&r=0&o=5&dpr=1.3&pid=1.7'
    },
    is_blocked: {
        type: Boolean,
        default: false
    }
});



const expert_model = mongoose.model('expert_model', expert_schema);

module.exports = expert_model;