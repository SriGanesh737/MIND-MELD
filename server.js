const express=require('express');
const path = require('path');
const app=express();
const mongoose = require('mongoose');
const dotenv = require('dotenv');

const session = require('express-session');
const MongoStore = require('connect-mongo');

const login_reg = require('./routes/login_reg_home_routes.js');
const posts = require('./routes/posts_routes.js');
const user_routes = require('./routes/user_routes.js');
const contact_us_routes = require('./routes/contact_us_routes.js');
const about_us_routes = require('./routes/about_us_routes.js');
const ask_query_route = require('./routes/ask_auery_route.js');
const bookmarks_routes = require('./routes/bookmark_routes.js');
const expert_articles_routes = require('./routes/expert_articles_routes.js');
const expert_model = require('./models/expert.js');
const admin_routes=require('./routes/adminroutes.js');
const bcrypt = require('bcryptjs');

app.use(express.json());
dotenv.config();
app.use(express.urlencoded({ extended: false }))
app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname, 'public')))


// const UrI='mongodb://0.0.0.0:27017/mindmeld';
const connectionparams={ useNewUrlParser: true };
mongoose.set('strictQuery',false);

//set up mongoose connection
mongoose.connect(process.env.myUri, connectionparams)
  .then(() => {
    console.info("connected to the db");
    app.listen(process.env.PORT || 3000, () => {
      console.log('app listening in port 3000')
    })
  })
  .catch((e) => { console.log(e) })


app.use(session({
  secret: process.env.secret_key,
  resave: false,
  saveUninitialized: false,
  store: MongoStore.create({
    mongoUrl:process.env.myUri,
    mongooseConnection: mongoose.connection,
    collectionName:'sessions'
  })
}));

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
  const is_blocked=req.session.is_blocked;
  if(registeras=='admin'||registeras=='expert'||registeras=='user')
  {
  id=req.params.id;
  // console.log(id)
  expert=await expert_model.find({_id:id})
    res.render('Expert_profile', { 'data': expert[0], 'registeras': registeras, is_blocked: is_blocked, user_id: req.session.profile_data });
  }

  else
{
res.render('notfound')
}
})


app.get('*', (req, res) => {
  res.render('notfound')
});
