const express = require('express');
const router = express.Router();
const faq_model = require('../models/faq_model');
const { isAuth } = require('../controllers/isAuth');
const expert_model = require('../models/expert');
const article_model = require('../models/article_model');

router.get('/', (req, res) => {
    user_model.find({}).then((userdata)=>{
      expert_model.find({}).then((expertdata)=>{
  
      article_model.find({}).then((articles)=>{
  
        res.render('admin', { registeras: 'expert',userdata:userdata,expertdata:expertdata,articles:articles });
      })
    })
  })
  });
  router.get('/all_articles',async (req,res)=>{
    let articles=await article_model.find({});
    res.render('all_articles',{articles:articles})
  })