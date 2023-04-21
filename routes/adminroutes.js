const express = require('express');
const router = express.Router();
const faq_model = require('../models/faq_model');
const { isAuth } = require('../controllers/isAuth');
const expert_model = require('../models/expert');
const article_model = require('../models/article_model');
const user_model = require('../models/user');
router.get('/', (req, res) => {
   const registeras=req.session.registeras;
   if(registeras=='admin'){
    user_model.find({}).sort({doj:-1}).then((userdata)=>{
      expert_model.find({}).sort({doj:-1}).then((expertdata)=>{
  
      article_model.find({}).sort({dateofpublish:-1}).then((articles)=>{
  
        res.render('admin', { registeras: 'expert',userdata:userdata,expertdata:expertdata,articles:articles });
      })
    })
  })
}
else
{
  res.render('notfound')
}
  });



  router.get('/all_articles',async (req,res)=>{
    
    const registeras=req.session.registeras;
    if(registeras=='admin'){
    let articles=await article_model.find({});
    res.render('all_articles',{articles:articles})
    }
    else
{
  res.render('notfound')
}
  })



  router.get("/all_experts",async (req,res)=>{
    const registeras=req.session.registeras;
    if(registeras=='admin')
    {
    let experts=await expert_model.find({})
    const count=await Promise.all(experts.map(async (expert)=>{
     number=await article_model.find({author_id:expert._id})
     length=number.length;
     return length;
    }))
    // console.log(count)
    res.render('all_experts',{experts:experts,count:count})
  }


    else
{
  res.render('notfound')
}
  })



  router.get('/expertshow/:id',async (req,res)=>{
    const registeras=req.session.registeras;
    if(registeras=='admin')
    {
    id=req.params.id;
    console.log(id)
    expert=await expert_model.find({_id:id})
    res.render('Expert_profile', {'data':expert[0],'registeras':'expert' });
    }

    else
{
  res.render('notfound')
}
  })

  module.exports = router;