const express = require('express');
const router = express.Router();
const faq_model = require('../models/faq_model');
const { isAuth } = require('../controllers/isAuth');
const expert_model = require('../models/expert');

router.get('/',isAuth, (req, res) => {
    const registeras = req.session.registeras;
    console.log(req.query);
    let is_solved = req.query.is_solved;
    is_solved = (is_solved == 'true');
    console.log(is_solved);
    faq_model.find({ is_answered: is_solved }).then((faq_data) => {
        res.render('askquery', { 'faq_data': faq_data, 'registeras': registeras,'is_answered':is_solved });
    }).catch((err) => {
        console.log(err);
    })
});


router.post('/', (req, res) => {
    const user_id = req.session.profile_data;
    const { topic, question } = req.body;
    const question_details = {
        user_id: user_id,
        topic: topic,
        question: question
    }
    const newFaq = new faq_model(question_details);
    newFaq.save().then(() => {
        console.log('faq posted...');
        res.redirect('/askquery?is_solved=true');
    }).catch((err) => {
        console.log(err);
    })
});


router.post('/filter', (req, res) => {
    const filter = req.body.is_solved;
    res.redirect('/askquery?is_solved=' + filter);
});


router.post('/answer/:question_id', (req, res) => {
    const question_id = req.params.question_id;
    const exp_id = req.session.profile_data;
    const answer = req.body['faq-solution'];
    expert_model.findOne({ _id: exp_id }).then((data) => {
        const profile_image_link = data['profile-img-link'];
        faq_model.updateOne(
            { _id: question_id },
            { $set: { is_answered: true, expert_id: exp_id, "profile-image-link": profile_image_link,answer:answer } }
        ).then(() => {
            console.log('solution added succesfully');
            res.redirect('/askquery?is_solved=true');
        })
            .catch((err) => {
                console.error(err);
            });

    }).catch((err) => {
        console.log(err);
    });





});


module.exports = router;