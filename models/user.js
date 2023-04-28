const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const user_schema = new Schema({
    password: {
        type: String,
        required: [true, 'Password is required']
    },
    firstname: {
        type: String,
        required: [true, 'firstname is required']
    },
    lastname: {
        type: String,
        required: [true, 'lastname is required']
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
        default: ' '
    },
    profile_image_link: {
        type: String,
        default: 'https://th.bing.com/th/id/OIP.z4no5tqp2ryBdMMD5NU9OgHaEv?w=245&h=180&c=7&r=0&o=5&dpr=1.3&pid=1.7'
    },
    doj:{
        type: Date,
        default: Date.now()
    },token:{
        type:String,
        default:''
    }

});

const user_model = mongoose.model('user_model', user_schema);


module.exports = user_model;