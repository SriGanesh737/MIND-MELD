const express=require('express');
const path = require('path');
const app=express();
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const session = require('express-session');
const login_reg = require('./routes/login_reg_home_routes.js');
const posts = require('./routes/posts_routes.js');
const user_routes = require('./routes/user_routes.js');
const contact_us_routes = require('./routes/contact_us_routes.js');
const about_us_routes = require('./routes/about_us_routes.js');
const ask_query_route = require('./routes/ask_auery_route.js');
const bookmarks_routes = require('./routes/bookmark_routes.js');
const expert_articles_routes = require('./routes/expert_articles_routes.js');
const user_model = require('./models/user.js');
const expert_model = require('./models/expert.js');
const article_model = require('./models/article_model.js');
// hello

app.use(express.json());
dotenv.config();
app.use(express.urlencoded({ extended: false }))
app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname, 'public')))


// const UrI='mongodb://0.0.0.0:27017/mindmeld';
const connectionparams={ useNewUrlParser: true };
mongoose.set('strictQuery',false);


// Set up session middleware
app.use(session({
  secret: process.env.secret_key,
  resave: false,
  saveUninitialized: false
}));

//set up mongoose connection
mongoose.connect(process.env.myUri, connectionparams)
  .then(() => {
    console.info("connected to the db");
    app.listen(3000, () => {
      console.log('app listening in port 3000')
    })
  })
  .catch((e) => { console.log(e) })


app.use('/', login_reg);
app.use('/posts', posts);
app.use('/user', user_routes);
app.use('/contactus', contact_us_routes);
app.use('/aboutus', about_us_routes);
app.use('/askquery', ask_query_route);
app.use('/bookmarks', bookmarks_routes);
app.use('/expert_articles', expert_articles_routes);

app.get('/admin', (req, res) => {
  user_model.find({}).then((userdata)=>{
    expert_model.find({}).then((expertdata)=>{

    article_model.find({}).then((articles)=>{

      res.render('admin', { registeras: 'expert',userdata:userdata,expertdata:expertdata,articles:articles });
    })
  })
})
});
app.get('/all_articles',async (req,res)=>{
  let articles=await article_model.find({});
  res.render('all_articles',{articles:articles})
})
app.get("/all_experts",async (req,res)=>{
  let experts=await expert_model.find({})
  const count=await Promise.all(experts.map(async (expert)=>{
   number=await article_model.find({author_id:expert._id})
   length=number.length;
   return length;
  }))
  console.log(count)
  res.render('all_experts',{experts:experts,count:count})
})
app.get('/expertshow/:id',async (req,res)=>{
  id=req.params.id
  expert=await expert_model.find({_id:id})
  res.render('Expert_profile', {'data':expert[0],'registeras':'expert' });
})
app.get('*', (req, res) => {
  // console.log(req);
});






