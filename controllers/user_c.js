// const bookmarked_data = require('../infos/bookmarked_data');
const user_model = require('../models/user');
const expert_model = require('../models/expert');
const admin_model=require('../models/admin_model.js');

exports.editprofile=async (req, res) => {
    const registeras = req.session.registeras;
    if (registeras == 'user') {
        res.redirect('/user/edit_u');
    }
    else {
        const details = await expert_model.findOne({ _id: req.session.profile_data });
        const date = new Date(details.dateofbirth);
        const formattedDate = date.toISOString().slice(0, 10);
        profile_details = {
            firstname: details.firstname,
            lastname: details.lastname,
            domain: details.domain,
            email: details.email,
            phone: details.phone,
            gender: details.gender,
            insta_link: details.insta_link,
            facebook_link: details.facebook_link,
            github_link: details.github_link,
            qualification: details.qualification,
            dateofbirth: formattedDate,
            profile_image_link:details.profile_image_link
        }
        res.render('editdetails', { 'registeras': registeras, 'data': profile_details, is_blocked: req.session.is_blocked });
    }

}

exports.posteditprofile=async (req,res)=>{
    if (req.session.registeras == 'user') {
        const { firstname, lastname, email, mobile, gender, link } = req.body;
        // console.log(req.body);
        const result = await user_model.updateOne({ _id: req.session.profile_data }, {
            $set: {
                firstname: firstname,
                lastname: lastname,
                email: email,
                profile_image_link:link,
                gender: gender,
                phone: mobile

            }
        });
        console.log(`${result.modifiedCount} document(s) was/were updated.`);
    }
    else {
        new_details = {
            firstname: req.body.firstname,
            lastname: req.body.lastname,
            domain: req.body.domain,
            email: req.body.email,
            phone: req.body.mobile,
            gender: req.body.gender,
            insta_link: req.body.insta_link,
            facebook_link: req.body.facebook_link,
            github_link: req.body.github_link,
            qualification: req.body.qualification,
            dateofbirth: req.body.dob,
            profile_image_link:req.body.profile_image_link,
        }
        const result = await expert_model.updateOne({ _id: req.session.profile_data }, {
            $set: {
                firstname: req.body.firstname,
                lastname: req.body.lastname,
                domain: req.body.domain,
                email: req.body.email,
                phone: req.body.mobile,
                gender: req.body.gender,
                insta_link: req.body.insta_link,
                facebook_link: req.body.facebook_link,
                github_link: req.body.github_link,
                qualification: req.body.qualification,
                dateofbirth: req.body.dob,
                profile_image_link:req.body.profile_image_link
            }
        });
        console.log(`${result.modifiedCount} document(s) was/were updated.`);
    // Swal('Success!', 'Your form has been submitted', 'success');
    }

    res.redirect('/user')

}

exports.getprofile=async (req, res) => {
    // console.log(req.session.id)
    const registeras = req.session.registeras;
    const id_param = req.query.id;
    // console.log(id_param);
    let display_id = id_param;
    if (display_id === undefined) display_id = req.session.profile_data;
    
    let profile_details = {}
    let person1 = await user_model.findOne({ _id: display_id });
    let person2 = await expert_model.findOne({ _id: display_id });
    let person3 = await admin_model.findOne({ _id: display_id });
    if (person1 !== null) profile_details = person1;
    if (person2 !== null) profile_details = person2;
    if (person3 !== null) profile_details = person3;

    if (person1 !== null) {
        res.render('user_profile', { data: profile_details, 'registeras': req.session.registeras, is_blocked: req.session.is_blocked, user_id: req.session.profile_data });
    }
    else {
        // console.log(profile_details)
        res.render('Expert_profile', { 'data': profile_details, 'registeras': req.session.registeras, is_blocked: req.session.is_blocked, user_id: req.session.profile_data });
    }


}

exports.edituser=async (req, res) => {

    let profile_details = await user_model.findOne({ _id: req.session.profile_data })
     res.render('edit_u',{data:profile_details,'registeras': req.session.registeras, is_blocked: req.session.is_blocked});
 }