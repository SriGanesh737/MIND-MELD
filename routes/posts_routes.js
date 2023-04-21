const express = require('express');
const router = express.Router();
const expert_model = require('../models/expert');
const article_model = require('../models/article_model');
const comments_data = require('../infos/commentsData');
const posts_c = require('../controllers/posts_c');
const { isAuth } = require('../controllers/isAuth');
const comment_model = require('../models/comment_model');
const user_model = require('../models/user');
const formatDate=require('../controllers/date_formatter');
const admin_model = require('../models/admin_model');


router.get('/',isAuth, (req, res) => {
    let topic = req.query.topic;
    let db_articles;
    const registeras = req.session.registeras;
    // console.log(topic,'...')
    article_model.find({ topic: topic }).then((data) => {
        res.render('posts', { topic: topic.toUpperCase(), articles_data: data, 'registeras': registeras,page:"posts" });

    }).catch((err) => {
        console.log(err);
    })




});


router.get('/compose', isAuth, (req, res) => {
    articleid = req.query.id;
    const registeras = req.session.registeras;
    if(registeras=='expert'|| registeras=='admin')
    {
    if (articleid == null) {
        console.log('here')
        data = {
            id: '',
            topic: '',
            title: '',
            content: '',
            tags: '',
            imagelink: '',
            tagstring: ''
        }
        res.render('compose', { 'registeras': registeras, 'data': data })
    }
    else {
        article_model.findOne({ _id: articleid }).then((blog) => {
            tagstring = "";
            for (let i = 0; i < blog.tags.length; i++) {
                tagstring += blog.tags[i] + '#';
            }
            data = {
                id: articleid,
                topic: blog.topic,
                title: blog.title,
                content: blog.content,
                tags: blog.tags,
                imagelink: blog.image_link,
                tagstring: tagstring
            }
            console.log(blog)
            res.render('compose', { 'registeras': registeras, 'data': data })
        })
    }
}
else
{
    res.render('notfound')
}


});

router.get('/:article_id',isAuth, (req, res) => {
    display_article_id = req.params.article_id;
    const registeras = req.session.registeras;
    const user_id = req.session.profile_data;

    let data = {};
    article_model.findOne({ _id: display_article_id })
        .then(async(blog) => {
            data = blog;
            array1 = blog.liked_userids;
            array2 = blog.disliked_userids
            //    console.log(array1.includes(req.session.profile_data));
            let indi1 = array1.includes(req.session.profile_data)
            let indi2 = array2.includes(req.session.profile_data)
            let value = 0;
            if (indi1 == true)
                value = 1;
            if (indi2 == true)
                value = 2;
            // const comments_data = await comments_fetcher(display_article_id);
            const all_comments = [];
            comment_model
                .find({ article_id: display_article_id, is_main_comment: true })
                .then(async (maincomments) => {
                    await Promise.all(
                        maincomments.map(async (data) => {
                            data['posted_date'] = formatDate(data.posted_date);
                            const main_comment = data;

                            try {
                                const replies = await comment_model.find({ _id: { $in: data['replies_ids'] } });
                                all_comments.push({ main_comment: main_comment, replies: replies });
                            } catch (err) {
                                console.log(err);
                            }
                        })
                    );
                    //  console.log(all_comments,'.>__<.');
                    res.render('display', { data: data, 'registeras': registeras, 'comments_data': all_comments,value:value,user_id:user_id });
                })
                .catch((err) => {
                    console.log(err);
                });


        })
        .catch((err) => {
        console.log(err)
    })
    // console.log(data);


});

router.post('/compose', (req, res) => {
    // console.log(req.body,'...')
    // console.log(req.body.tags_string.split('#').slice(0, -1));
    articleid = req.query.id;
    if (articleid == '') {
        var details = {
            topic: req.body.topic,
            title: req.body.title,
            content: req.body.blog_content_html,
            tags: req.body.tags_string.split('#').slice(0, -1),
            image_link: req.body.img_link
        };
        const exp_id = req.session.profile_data;
        // console.log(exp_id,'...');
        let exp_details = {}
        expert_model.findOne({ _id: exp_id }).then((data) => {
            // console.log(data);
            if(data!=null){
            exp_details = {
                author_id: exp_id,
                author_name: data.firstname + " " + data.lastname
            }
            details = { ...details, ...exp_details };
            //  console.log('details are: ', details);

            const new_blog = new article_model(details);

            new_blog.save().then(() => {
                console.log('blog data saved successfully...');
            })
                .catch((err) => {
                    console.log(err);
                });

       } }).catch((err) => {
            console.log(err);

        })
        admin_model.findOne({ _id: exp_id }).then((data) => {
            // console.log(data);
            if(data!=null){
            exp_details = {
                author_id: exp_id,
                author_name: data.firstname + " " + data.lastname
            }
            details = { ...details, ...exp_details };
            //  console.log('details are: ', details);

            const new_blog = new article_model(details);

            new_blog.save().then(() => {
                console.log('blog data saved successfully...');
            })
                .catch((err) => {
                    console.log(err);
                });

       } }).catch((err) => {
            console.log(err);

        })
        
        res.redirect('/posts/compose');
    }
    else {

        topic = req.body.topic,
            title = req.body.title,
            content = req.body.blog_content_html,
            tags = req.body.tags_string.split('#').slice(0, -1),
            image_link = req.body.img_link
        console.log(topic, title, content, tags, image_link, tags)

        article_model.updateOne({ _id: articleid }, {
            $set: {
                topic: topic, title: title, content: content, tags: tags, image_link:
                    image_link
            }
        }).then((result) => {
            console.log(`${result.modifiedCount} document(s) was/were updated.`);
            res.redirect('/expert_articles')
        })
    }
});


router.post('/comment/:article_id', (req, res) => {
    const article_id = req.params.article_id;
    const user_id = req.session.profile_data;
    const comment_info = req.body['comment-message'];
    const registeras = req.session.registeras;
    const is_main_comment = true;
    if (registeras == 'user') {
        user_model.findOne({ _id: user_id }).then((data) => {
            const { profile_image_link, firstname:user_name } = data;
            const newComment = new comment_model({ article_id, user_id, comment_info, profile_image_link, user_name, is_main_comment });
            newComment.save().then(() => {
                console.log('comment posted...');
                res.redirect('/posts/'+article_id);
            }).catch((err) => {
                console.log(err);
            })
        }).catch((err) => {
            console.log(err);
        })
    }
    else if (registeras == 'expert') {
        expert_model.findOne({ _id: user_id }).then((data) => {
            const { profile_image_link, firstname: user_name } = data;
            const newComment = new comment_model({ article_id, user_id, comment_info, profile_image_link, user_name, is_main_comment });
            newComment.save().then(() => {
                console.log('comment posted...');
                res.redirect('/posts/' + article_id);
            }).catch((err) => {
                console.log(err);
            })
        }).catch((err) => {
            console.log(err);
        })
    }
});


router.post('/replycomment/:article_id/:comment_id', (req, res) => {
    const article_id = req.params.article_id;
    const comment_id= req.params.comment_id;
    const user_id = req.session.profile_data;
    const comment_info = req.body.reply_box_value;
    const reply_for = req.query.reply_for;
    const user_name = req.session.user_name;
    const profile_image_link = req.session.profile_image_link;
    // console.log({ article_id, user_id, comment_info, reply_for, user_name, profile_image_link });
    const new_reply_comment = new comment_model({ article_id, user_id, comment_info, reply_for, user_name, profile_image_link });
    new_reply_comment.save().then(() => {
        comment_model.findOneAndUpdate({_id:comment_id}, { $push: { replies_ids: new_reply_comment._id } }, { new: true })
            .then((updatedDocument) => {
                // console.log(updatedDocument,'...***');
                console.log('reply posted');
                res.redirect('/posts/' + article_id);
            })
            .catch((error) => {
                console.log(error);
            });
    }).catch((err) => {
        console.log(err);
     });


});


router.post('/liked/:articleid', (req, res) => {
    articleid = req.params.articleid
    article_model.find({ _id: articleid }).then((data) => {
        // console.log(data)
        newarray1 = data[0].liked_userids;
        console.log(newarray1)
        likes = data[0].likes;
        dislikes = data[0].dislikes;
        console.log(req.session.profile_data)
        console.log(newarray1.includes(req.session.profile_data))
        let index = newarray1.includes(req.session.profile_data)
        console.log(likes, dislikes);
        if (index == true) {
            console.log('liked before')
        }
        else {
            ++likes;
            console.log('liked now')
            newarray1.push(req.session.profile_data)
        }
        newarray2 = data[0].disliked_userids;
        index = newarray2.includes(req.session.profile_data)
        if (index == true) {
            --dislikes;
            console.log('disliked before and removing')
            console.log(newarray2)
            newarray2 = newarray2.filter(fruit => fruit !== req.session.profile_data)
            console.log(newarray2)
            // newarray2.push(req.session.profile_data)
        }
        else {
            console.log('not available in dislikes ')
        }
        article_model.updateOne({ _id: articleid }, { $set: { likes: parseInt(likes), dislikes: parseInt(dislikes), liked_userids: newarray1, disliked_userids: newarray2 } }).then(() => {
            console.log('successfully updated');
            res.redirect('/posts/' + articleid)
        })
        //    article_model.updateOne({_id:articleid},{$set:{}})
    }).catch((err) => {
        console.log(err);
    });


});

router.post('/disliked/:articleid', (req, res) => {
    articleid = req.params.articleid
    article_model.find({ _id: articleid }).then((data) => {
        console.log(data)
        newarray1 = data[0].disliked_userids;
        console.log(newarray1)
        likes = data[0].likes;
        dislikes = data[0].dislikes;
        console.log(req.session.profile_data)
        // console.log(newarray1.includes(req.session.profile_data))
        let index = newarray1.includes(req.session.profile_data)
        console.log(likes, dislikes);
        if (index == true) {
            console.log('disliked before')
        }
        else {
            ++dislikes;
            console.log('disliked now')
            newarray1.push(req.session.profile_data)
        }
        newarray2 = data[0].liked_userids;
        index = newarray2.includes(req.session.profile_data)
        if (index == true) {
            --likes;
            console.log('liked before removing')
            newarray2 = newarray2.filter(fruit => fruit !== req.session.profile_data)
            console.log(newarray2)
        }
        else {

            console.log('not available in likes')
        }
        article_model.updateOne({ _id: articleid }, { $set: { likes: parseInt(likes), dislikes: parseInt(dislikes), liked_userids: newarray2, disliked_userids: newarray1 } }).then(() => {
            console.log('successfully updated');
            res.redirect('/posts/' + articleid)
        })

        //    article_model.updateOne({_id:articleid},{$set:{}})
    }).catch((err) => {
        console.log(err);
    });

});

router.delete('/:article_id/:comment_id', (req, res) => {
    const article_id = req.params.article_id;
    const comment_id = req.params.comment_id;
    // console.log(article_id, comment_id,"....");
    comment_model.findOne({ _id: comment_id }).then((comment) => {
        const replies_ids = comment['replies_ids'];
        console.log(replies_ids, '...');
        comment_model.deleteMany({ _id: { $in: replies_ids } }).then(() => {
            // console.log('replies deleted');
            comment_model.deleteOne({ _id: comment_id }).then(() => {
                console.log('main comment also delted...');
                // res.redirect('/');
                res.end();
            })
                .catch((err) => { console.log(err) });
        }).catch((err) => {
            console.log(err);
        })
    }).catch((err) => {
        console.log(err);
    })
});

//this is filter apply handler
router.post('/', (req, res) => {
    console.log(req.body);
    const registeras = req.session.registeras;
    let { search_value, based_on, topic_name, filter_option } = req.body;
    let topic_lower = topic_name.toLowerCase();
    search_value = search_value.toLowerCase();
    let sort_basis = -1;
    if (filter_option == 'oldest first') sort_basis = 1;


    if (filter_option == 'most liked') {
        article_model.find({ topic: topic_lower }).sort({ likes: -1 }).then((data) => {
            const filtered_data = data.filter((article) => {
                if (based_on == 'title' && article.title.toLowerCase().includes(search_value.toLowerCase())) return true;
                else if (based_on == 'tags') {
                    const tags = article.tags;
                    for (let i = 0; i < tags.length; i++) {
                        if (tags[i].toLowerCase().includes(search_value.toLowerCase())) return true;
                    }
                }
            });
            res.render('posts', { topic: topic_name, articles_data: filtered_data, registeras: registeras, page: "posts" });

        }).catch((err) => {
            console.log(err);
        })
    }
    else {
        console.log(sort_basis, "...");
        article_model.find({ topic: topic_lower }).sort({ date_of_publish: sort_basis }).then((data) => {
            console.log(data)
            const filtered_data = data.filter((article) => {
                if (based_on == 'title' && article.title.toLowerCase().includes(search_value)) return true;
                else if (based_on == 'tags') {
                    const tags = article.tags;
                    for (let i = 0; i < tags.length; i++) {
                        if (tags[i].toLowerCase().includes(search_value)) return true;
                    }
                }
            });
            res.render('posts', { topic: topic_name, articles_data: filtered_data, registeras: registeras, page: "posts" });

        }).catch((err) => {
            console.log(err);
        })
    }

});


module.exports = router;