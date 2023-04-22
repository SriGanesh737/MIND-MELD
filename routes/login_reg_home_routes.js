const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const user_model = require('../models/user');
const expert_model = require('../models/expert');
const {isAuth} = require('../controllers/isAuth');
const admin_model=require('../models/admin_model.js');


let em = "";
let resu = "";
let data1 = "";


function logger(req, res, next) {
    next();

    em = "";


}

function logger2(req, res, next) {
    next();
    data1 = "";
}



router.get('/logout', (req, res) => {
    req.session.destroy((err) => {
        if (err) throw err;
        res.redirect('/login');
    });
})

router.get('/signup', logger, (req, res) => {

    res.render('signup', { em});
})

router.post('/signup', async (req, res) => {
   let firstname = req.body.fname;
   let lastname = req.body.lastname;
   let email = req.body.email;
   let phno = req.body.phno;
   let pswd = req.body.pswd;
   let cnfpswd = req.body.cnfpswd;
   let registeras = req.body.registeras;
   let resume = req.body.resume;
   let checker=true;
    //console.log(firstname,lastname,email,phno,pswd,cnfpswd,registeras);
   await  user_model.findOne({email:email}).then((user)=>{
     if(user)
        {
         checker=false
         console.log('hello')
        em="This email already exists"
        }
       }
        ).catch((err)=>console.log(err))


       await expert_model.findOne({email:email}).then((user)=>{
            if(user)
            {
                console.log('bjeewrjeee')
                checker=false;
               em="This email already exists"
            }
        }).catch((err)=>console.log(err))

// console.log(checker);

    if (checker) {
        const hashedpswd = await bcrypt.hash(pswd, 12);
        // console.log(hashedpswd)

        data = "";
        if (registeras === 'user') {
            console.log('hii user')

          const user=new user_model({
                firstname:firstname,lastname:lastname,email:email,password:hashedpswd,phone:phno
            })
            user.save().then(() => console.log('Document saved')).catch((err) => console.error(err));
            res.redirect('/login');
        }
        else if (registeras === 'expert' && resume !== '')
                            {
            resu = "";
            const expert=new expert_model({
                firstname:firstname,lastname:lastname,email:email,password:hashedpswd,phone:phno
            })
            expert.save().then(() => console.log('Document saved')).catch((err) => console.error(err));

            res.redirect('/login');
        }
        else {
            resu = "You must upload resume as you are a expert"
            res.redirect('/signup');
        }
}
    else
    {

        res.redirect('/signup')

    }
})

router.get('/login', logger2, (req, res) => {
    res.render('loginpage', { data1 })
});

router.post('/login',async (req, res) => {
    email = req.body.email;
    password = req.body.password;
    const person3=await admin_model.findOne({email:email});
    const person=await user_model.findOne({email:email})
    const person1=await expert_model.findOne({email:email})
    console.log(person3);
     if(person3!=null)
     {
        let  result=await  bcrypt.compare(password, person3.password);
        if(result===true)
        {
                req.session.isAuth = true;
                let registeras = 'admin';
            req.session.registeras = 'admin';
            req.session.is_blocked = false;
                data1 = "";
                req.session.profile_data = person3._id;
                req.session.user_name = person3.firstname;
                req.session.profile_image_link = person3.profile_image_link;

                res.redirect('/admin')
        }
        else
            {
            data1 = "Incorrect Login details";
             res.redirect('/login')
            }

     }







    else if(person!=null)
    {
     let  result=await  bcrypt.compare(password, person.password)
            if (result === true)
            {
                req.session.isAuth = true;
                let registeras = 'user';
                req.session.registeras = 'user';
                req.session.is_blocked = false;
                data1 = "";
                let profile_data = {};
                req.session.profile_data = person._id;
                req.session.user_name = person.firstname;
                req.session.profile_image_link = person.profile_image_link;

                res.redirect('/landingpage')
            }
            else
            {
                data1 = "Incorrect Login details";
             res.redirect('/login')
            }
    }
    else if(person1!=null)
    {
        let  result=await  bcrypt.compare(password, person1.password)
        if (result === true)
        {
            req.session.isAuth = true;
            let registeras = 'expert';
            req.session.registeras = 'expert';
            data1 = "";
            let profile_data = {};
            req.session.profile_data = person1._id;
            req.session.user_name = person1.firstname;
            req.session.profile_image_link = person1.profile_image_link;
            req.session.is_blocked = person1.is_blocked;
            res.redirect('/landingpage')
        }
        else
        {
        data1 = "Incorrect Login details";
         res.redirect('/login')
        }
    }
    else
    {
        res.redirect('/login');
    }



});


router.get('/', (req, res) => {
    res.render('index');
});

router.get('/landingpage',isAuth, (req, res) => {
    const registeras = req.session.registeras;
    // console.log(registeras+"....");
    res.render('landingpage', { 'registeras': registeras, is_blocked: req.session.is_blocked });
});



module.exports = router;