const express = require('express');
const router = express.Router();
const article_model = require('../models/article_model');
const {isAuth} = require('../controllers/isAuth');

router.get('/',isAuth, (req, res) => {

    const registeras = req.session.registeras;
    if(registeras=='expert'||registeras=='admin')
    {
    const expert_id = req.session.profile_data;
    article_model.find({ author_id: expert_id }).then((expert_articles_data) => {

        res.render('expert_articles', { data: expert_articles_data, topic: "", 'registeras': registeras, page: "yourwork", is_blocked: req.session.is_blocked });

    })
}
else
{
    res.render('notfound')
}
});

router.get('/delete/:article_id',isAuth, (req, res) => {
    const article_id = req.params.article_id;
    article_model.deleteOne({ _id: article_id }).then(() => {
        console.log('article deleted succesfully ');
        if(req.session.registeras=='admin')
        res.redirect('/admin/all_articles')
        else
        res.redirect('/expert_articles');
    }).catch((err) => {
        console.log(err);
    })
});

router.post('/', async(req, res) => {
    console.log(req.body);
    let { search_value, based_on, filter_option, choose_topic } = req.body;
    const id = req.session.profile_data;
    const registeras = req.session.registeras;
    let sort_basis = -1;
    if (filter_option == 'oldest first') sort_basis = 1;
    let articles = [];
    if (filter_option == 'most liked') {
        articles = await article_model.find({ author_id: id }).sort({ likes: -1 });
    }
    else {
        articles= await article_model.find({ author_id: id }).sort({date_of_publish:sort_basis})
    }

    let filtered_articles = articles;

    if (choose_topic != "") {
        filtered_articles = filtered_articles.filter((article) => {
            return article.topic == choose_topic;
        });
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
    console.log('hello');
    res.render('expert_articles', { data: filtered_articles, topic: "", 'registeras': registeras, page: "yourwork", is_blocked: req.session.is_blocked });


});


module.exports = router;

