const express = require('express');
const router = express.Router();
const bookmarks_model = require('../models/bookmarks_model');
const article_model = require('../models/article_model');
const {isAuth} = require('../controllers/isAuth');


router.get('/',isAuth,(req, res) => {
    const registeras = req.session.registeras;
    const user_id = req.session.profile_data;
    let bookmarks_ids = [];
    bookmarks_model.findOne({ user_id: user_id }).then(
        (data) => {
            if (!data) {
                console.log("no bookmarks...");
                res.render('bookmarks', {page:"bookmarks",topic:"",'bookmarked_data': [], 'registeras': registeras });
                res.end();
            }
            else {
            bookmarks_ids = data.bookmarks_ids;
            article_model.find({ _id: { $in: bookmarks_ids } }).then((bookmarked_data) => {
                // console.log('bookmarked data found', bookmarked_data);
                res.render('bookmarks', { topic:"",'bookmarked_data': bookmarked_data, 'registeras': registeras,page:"bookmarks" });
            })
                .catch((err) => {
                    console.log(err);
                })
            }

        }
    ).catch((err) => {
        console.log(err);
    });

});

router.get('/addBookmark/:article_id',isAuth,(req, res) => {
    let a_id = req.params.article_id;
    let user_type = req.session.registeras;
    let user_id = req.session.profile_data;
    let bookmarks_data = {};
    bookmarks_model.findOne({ user_id: user_id })
        .then((data) => {
            bookmarks_data = data;
            let arr = [];
            if (!data) {
                arr.push(a_id);
                bookmarks_data = {
                    user_id: user_id,
                    bookmarks_ids:arr
                }
                const new_bookmarks_data = new bookmarks_model(bookmarks_data);
                new_bookmarks_data.save().then(() => {
                    console.log('new bookmarks data added succesfully ...');
                    res.redirect('/bookmarks');
                }).catch((err) => {
                    console.log(err);
                });
            }
            else {
                arr = data.bookmarks_ids;
                arr.unshift(a_id);
                updated_bookmarks_data = {
                    user_id: user_id,
                    bookmarks_ids: arr
                }
                bookmarks_model.replaceOne({ user_id: user_id }, updated_bookmarks_data).then(() => {
                    console.log('bookmark added succesfully...');
                    res.redirect('/bookmarks');
                }).catch((err) => {
                    console.log(err);
                })

            }

        })
        .catch((err) => {
            console.log(err);
        });


    // let bookmarked_article = fetch_object(a_id, posts_data[topic]);

    // if (!is_present(a_id, bookmarked_data))
    //     bookmarked_data.unshift(bookmarked_article);

});

router.get('/removeBookmark/:article_id',isAuth, (req, res) => {
    let a_id = req.params.article_id;
    let user_id = req.session.profile_data;
    // await Bookmark.updateMany({}, { $pull: { articleIds: articleId } });
    bookmarks_model.updateOne({ user_id: user_id }, { $pull: { bookmarks_ids: a_id } }).then(() => {
        console.log('bookmark removed');
        res.redirect('/bookmarks');
    }).catch((err) => {
        console.log(err);
    })

});

router.post('/', (req, res) => {
    console.log(req.body);
    let { search_value, based_on, choose_topic } = req.body;
    const user_id = req.session.profile_data;
    const registeras = req.session.registeras;

    let bookmarks_ids = [];
    bookmarks_model.findOne({ user_id: user_id }).then(
        (data) => {
            if (!data) {
                console.log("no bookmarks...");
                //   hello=[]
                res.render('bookmarks', { topic: "", 'bookmarked_data': [], 'registeras': registeras });
                res.end();
            }
            else {
                bookmarks_ids = data.bookmarks_ids;
                article_model.find({ _id: { $in: bookmarks_ids } }).then((bookmarked_data) => {
                    // console.log('bookmarked data found', bookmarked_data);
                    let filtered_data = bookmarked_data;
                    // filtering based on topic if required
                    if (choose_topic != "") {
                        filtered_data = bookmarked_data.filter((article) => {
                            return article.topic == choose_topic;
                        })
                    }

                    filtered_data = filtered_data.filter((article) => {
                        if (based_on == 'title' && article.title.toLowerCase().includes(search_value.toLowerCase())) return true;
                        else if (based_on == 'tags') {
                            const tags = article.tags;
                            for (let i = 0; i < tags.length; i++) {
                                if (tags[i].toLowerCase().includes(search_value.toLowerCase())) return true;
                            }
                        }
                    });

                    res.render('bookmarks', { topic: "", 'bookmarked_data': filtered_data, 'registeras': registeras, page: "bookmarks" });
                })
                    .catch((err) => {
                        console.log(err);
                    })
            }

        }
    ).catch((err) => {
        console.log(err);
    });

});

module.exports = router;