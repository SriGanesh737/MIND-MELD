const expert_model = require('../models/expert');
const article_model = require('../models/article_model');
const user_model = require('../models/user');
const nodemailer=require('nodemailer');
const query_model = require('../models/query_model.js');


exports.admindashboard= (req, res) => 
{
    const registeras = req.session.registeras;
    const is_blocked = req.session.is_blocked;
     if(registeras=='admin')
     {
      user_model.find({}).sort({doj:-1}).then((userdata)=>{
        expert_model.find({}).sort({doj:-1}).then((expertdata)=>{

        article_model.find({}).sort({date_of_publish:-1}).then((articles)=>
        {

          res.render('admin', { registeras: 'admin',userdata:userdata,expertdata:expertdata,articles:articles,is_blocked:is_blocked });
        })
      })
    })
  }
  else
  {
    res.render('notfound')
  }
    }


exports.allarticles=async (req, res) => {

    const registeras = req.session.registeras;
    const is_blocked = req.session.is_blocked;
    if (registeras == 'admin') {
      let articles = await article_model.find({});
      res.render('all_articles', { articles: articles, topic: "", page: "all_articles",is_blocked:is_blocked })
    }
    else {
      res.render('notfound')
    }
  }

  exports.allexperts=async (req, res) => {
    const registeras = req.session.registeras;
    const is_blocked = req.session.is_blocked;
    if (registeras == 'admin') {
      let experts = await expert_model.find({})
      const count = await Promise.all(experts.map(async (expert) => {
        number = await article_model.find({ author_id: expert._id })
        length = number.length;
        return length;
      }))
      // console.log(count)
      res.render('all_experts', {
        experts: experts, count: count, is_blocked: is_blocked})
    }


    else {
      res.render('notfound')
    }
  }

  exports.query=async (req,res)=>{
    const registeras = req.session.registeras;
    query_data=await query_model.find({isresolved:false});

    res.render('query_page',{query_data:query_data})
  }

  exports.postquery= (req,res)=>{
    
    id=req.params.id;
    //  console.log(id);
     query_model.updateOne({ _id: id }, { $set: { isresolved: true } }).then((updated) => {
       res.redirect('/admin/query');
    });
    // console.log(updated);
  }

  exports.postallarticles=async(req, res) => {
    // console.log(req.body);
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

    res.render('all_articles', { articles: filtered_articles, topic: "", page: "all_articles", is_blocked: req.session.is_blocked })

  }
  exports.expertsearch=async (req,res)=>{
    // console.log(req.body);
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
      res.render('all_experts', { experts: experts, count: count, is_blocked: req.session.is_blocked })
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
      res.render('all_experts', { experts: newexperts, count: count, is_blocked: req.session.is_blocked })
    }


  }
  exports.removeexpert=async (req, res) => {
    const expert_id = req.body.expert_id;
    // console.log(expert_id);
    await expert_model.deleteOne({ _id: expert_id });
    console.log("expert removed successfully");
    res.redirect('/admin/all_experts');
  }

  exports.blockexpert= async(req, res) => {
    const expert_id = req.body.expert_id;
    const expert_details = await expert_model.findOne({ _id: expert_id });
    await expert_model.findByIdAndUpdate(expert_id, { is_blocked:!expert_details.is_blocked  });
    if(expert_details.is_blocked)console.log("expert unblocked successfully");
    else console.log("expert unblocked successfully");
    res.redirect('/admin/all_experts');
  }