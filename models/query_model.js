const mongoose=require('mongoose');
const Schema=mongoose.Schema;

const query_schema=new Schema({
    firstname:{
        type:String,
        required:[true,'first name is required']
    },
    lastname:{
        type:String,
        required:[true,'last name is required']
    },
    email:{
        type:String,
        required:[true,'email is required']
    },
    phone:{
       type:String,
       required:[true,'phone number is required']
    },
    message:{
     type:String,
     required:[true,'message is required']
    }
})

const query_model = mongoose.model('query_model', query_schema);

module.exports = query_model;