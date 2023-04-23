const express = require('express')
const router = express.Router();
const bookmarked_data = require('../infos/bookmarked_data');
const user_model = require('../models/user');
const expert_model = require('../models/expert');
const admin_model=require('../models/admin_model.js');
const Swal = require('sweetalert');
let expert_articles_data = [

];
const {isAuth} = require('../controllers/isAuth');

expert_articles_data = bookmarked_data;







router.get('/edit_e',isAuth, async (req, res) => {
    // Swal('Success!', 'Your form has been submitted', 'success');
    const registeras = req.session.registeras;

    const details=await expert_model.findOne({_id:req.session.profile_data});
    const date = new Date(details.dateofbirth);
  const formattedDate = date.toISOString().slice(0,10);
profile_details={
    firstname:details.firstname,
    lastname:details.lastname,
    domain:details.domain,
    email:details.email,
    phone:details.phone,
    gender:details.gender,
    insta_link:details.insta_link,
    facebook_link:details.facebook_link,
    github_link:details.github_link,
    qualification:details.qualification,
    profileimglink:details.profile_image_link,
    dateofbirth:formattedDate
    
}
// console.log(profile_details);
    res.render('editdetails', { 'registeras': registeras,'data':profile_details});
})

router.post('/edit_e',async (req,res)=>{
    // console.log(req.body);
    new_details={
        firstname:req.body.firstname,
        lastname:req.body.lastname,
        domain:req.body.domain,
        email:req.body.email,
        phone:req.body.mobile,
        gender:req.body.gender,
        insta_link:req.body.insta_link,
        facebook_link:req.body.facebook_link,
        github_link:req.body.github_link,
        qualification:req.body.qualification,
        dateofbirth:req.body.dob,
        profileimglink:req.body.profile_picture

    }
    const result = await expert_model.updateOne({ _id: req.session.profile_data },{ $set: {  firstname:req.body.firstname,
        lastname:req.body.lastname,
        domain:req.body.domain,
        email:req.body.email,
        phone:req.body.mobile,
        gender:req.body.gender,
        insta_link:req.body.insta_link,
        facebook_link:req.body.facebook_link,
        github_link:req.body.github_link,
        qualification:req.body.qualification,
        dateofbirth:req.body.dob ,
        profile_image_link:req.body.profile_picture
    } });
        // console.log(`${result.modifiedCount} document(s) was/were updated.`);
    // Swal('Success!', 'Your form has been submitted', 'success');
    res.redirect('/user')

})




router.get('/',isAuth,async (req, res) => {
    // console.log(req.session.id)
    const registeras=req.session.registeras;
    let profile_details={}
if(registeras=='expert')
{
 profile_details=await expert_model.findOne({_id:req.session.profile_data});
}
else
{
 profile_details=await admin_model.findOne({_id:req.session.profile_data});
}
// profile_details={
//     firstname:details.firstname,
//     lastname:details.lastname,
//     domain:details.domain,
//     email:details.email,
//     phone:details.phone,
//     gender:details.gender,
//     insta_link:details.insta_link,
//     facebook_link:details.facebook_link,
//     github_link:details.github_link,
//     qualification:details.qualification,
//     dateofbirth:details.dateofbirth
// }
// console.log(profile_details)

    res.render('Expert_profile', {'data':profile_details,'registeras': req.session.registeras });
});



module.exports = router;