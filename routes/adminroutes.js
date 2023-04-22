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



router.get('/all_articles', async (req, res) => {

  const registeras = req.session.registeras;
  if (registeras == 'admin') {
    let articles = await article_model.find({});
    res.render('all_articles', { articles: articles, topic: "", page: "all_articles" })
  }
  else {
    res.render('notfound')
  }
});



router.get("/all_experts", async (req, res) => {
  const registeras = req.session.registeras;
  if (registeras == 'admin') {
    let experts = await expert_model.find({})
    const count = await Promise.all(experts.map(async (expert) => {
      number = await article_model.find({ author_id: expert._id })
      length = number.length;
      return length;
    }))
    // console.log(count)
    res.render('all_experts', { experts: experts, count: count })
  }


  else {
    res.render('notfound')
  }
});


router.get('/expertshow/:id', async (req, res) => {
  const registeras = req.session.registeras;
  if (registeras == 'admin') {
    id = req.params.id;
    console.log(id)
    expert = await expert_model.find({ _id: id })
    res.render('Expert_profile', { 'data': expert[0], 'registeras': 'expert' });
  }

  else {
    res.render('notfound')
  }
});

router.post('/all_articles', async(req, res) => {
  console.log(req.body);
  let { search_value, based_on, filter_option, choose_topic } = req.body;
  const id = req.session.profile_data;
  const registeras = req.session.registeras;
  let sort_basis = -1;
  if (filter_option == 'oldest first') sort_basis = 1;
  let articles = [];
  if (filter_option == 'most liked') {
    articles = await article_model.find().sort({ likes: -1 });
  }
  else {
    articles = await article_model.find().sort({ date_of_publish: sort_basis })
  }

  let filtered_articles = articles;

  if (choose_topic != "") {
    filtered_articles=filtered_articles.filter((article) => {
      return article.topic == choose_topic;
    })
  }

  filtered_articles = filtered_articles.filter((article) => {
    if (based_on == 'title' && article.title.toLowerCase().includes(search_value.toLowerCase())) return true;
    else if (based_on == 'tags') {
      const tags = article.tags;
      for (let i = 0; i < tags.length; i++) {
        if (tags[i].toLowerCase().includes(search_value.toLowerCase())) return true;
      }
    }
  });

  res.render('all_articles', { articles: filtered_articles, topic: "", page: "all_articles" })

});

router.post('/all_experts/search',async (req,res)=>{
  console.log(req.body);
  const {searchitem,basis1,basis2}=req.body;
  let k=-1;
  if(basis2=='oldest')
   k=1;

  const experts=await expert_model.find({}).sort({doj:k});
  if(searchitem=='')
  {
    const count=await Promise.all(experts.map(async (expert)=>{
      number=await article_model.find({author_id:expert._id})
      length=number.length;
      return length;
     }))
     res.render('all_experts',{experts:experts,count:count})   
  }
  else
  {
    newexperts=experts.filter((expert)=>{
      if(basis1=='name')
      {
         return expert.firstname.toLowerCase().includes(searchitem.toLowerCase()) || expert.lastname.toLowerCase().includes(searchitem.toLowerCase())
      }
      else
      {
        return expert.email.toLowerCase().includes(searchitem.toLowerCase()) ;
      }
    })
    const count=await Promise.all(newexperts.map(async (expert)=>{
      number=await article_model.find({author_id:expert._id})
      length=number.length;
      return length;
     }))
     res.render('all_experts',{experts:newexperts,count:count})    
  }
  

})

  module.exports = router;