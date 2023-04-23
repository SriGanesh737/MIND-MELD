const express = require('express');
const router = express.Router();
const faq_model = require('../models/faq_model');
const { isAuth } = require('../controllers/isAuth');
const admin_c=require('../controllers/admin_c');
const user_model = require('../models/user');
const expert_model = require('../models/expert');
const nodemailer=require('nodemailer');

router.get('/',isAuth,admin_c.admindashboard);
router.get('/all_articles',isAuth, admin_c.allarticles);
router.get("/all_experts",isAuth, admin_c.allexperts);
router.get('/query',isAuth,admin_c.query);
router.post('/query/:id',admin_c.postquery);
router.post('/all_articles', admin_c.postallarticles);
router.post('/all_experts/search',admin_c.expertsearch);
router.post('/remove_expert', admin_c.removeexpert);
router.post('/block_expert',admin_c.blockexpert);


let sentdata="";
router.get('/mail',logger5,(req,res)=>{
  res.render('sendmail',{sent:sentdata})
})
router.post("/mail",async (req,res)=>{
  // console.log(req.body);
  let subject=req.body.subject;
  let text=req.body.content;
  let experts=req.body.experts;
  let users=req.body.users;
  // console.log(users)
  let emails=[];
  let email1=[];
  let email2=[];
  if(experts==='1')
  {
     email1=await expert_model.find({},{email:1,_id:0});
  }

  if(users=='2')
  {
   email2=await user_model.find({},{email:1,_id:0})
  }

  emails=[...email1,...email2]
  const emailsArray = emails.map(obj => obj.email);
  // console.log(emailsArray);
  let mailtransporter=nodemailer.createTransport({
    service:"gmail",
   auth:{
     user:"contactmindmeld2023@gmail.com",
     pass:"wgnfqhvyawxeziab"
   }

  })
  let details={
    from:"contactmindmeld2023@gmail.com",
    to:emailsArray,
    subject:subject,
    text:text
  }
  mailtransporter.sendMail(details,(err)=>{
    if(err)
    console.log(err)
    else
    {
      sentdata="Email has been sent successfully";
      console.log('email has sent');
      res.redirect('/admin/mail');
    }
  })
})

function logger5(req,res,next)
{
  next();
  sentdata="";

}


  module.exports = router;