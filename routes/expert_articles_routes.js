const express = require('express');
const router = express.Router();
const article_model = require('../models/article_model');
const {isAuth} = require('../controllers/isAuth');

router.get('/',isAuth, (req, res) => {
    const registeras = req.session.registeras;
    const expert_id = req.session.profile_data;
    article_model.find({ author_id: expert_id }).then((expert_articles_data) => {

            res.render('expert_articles', { data: expert_articles_data, 'registeras': registeras,page:"yourwork" });

    })

});

router.get('/delete/:article_id',isAuth, (req, res) => {
    const article_id = req.params.article_id;
    article_model.deleteOne({ _id: article_id }).then(() => {
        console.log('article delted succesfully ');
        res.redirect('/expert_articles');
    }).catch((err) => {
        console.log(err);
    })
});


module.exports = router;

