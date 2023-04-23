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
const admin_model=require('./models/admin_model.js');
const admin_routes=require('./routes/adminroutes.js');
const query_model = require('./models/query_model.js');
const bcrypt = require('bcryptjs');

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
  saveUninitialized: false,
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
app.use('/admin',admin_routes);


app.get('/expertshow/:id',async (req,res)=>{
  const registeras=req.session.registeras;
  if(registeras=='admin')
  {
  id=req.params.id;
  // console.log(id)
  expert=await expert_model.find({_id:id})
  res.render('Expert_profile', {'data':expert[0],'registeras':'expert' });
  }

  else
{
res.render('notfound')
}
})
app.get('/mail',(req,res)=>{
  res.render('sendmail')
})

app.get('*', (req, res) => {
  res.render('notfound')
});





