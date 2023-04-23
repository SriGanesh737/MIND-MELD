const express = require('express');
const router = express.Router();
const posts_c = require('../controllers/posts_c');
const { isAuth } = require('../controllers/isAuth');





router.get('/',isAuth, posts_c.postarticles);
router.get('/compose', isAuth,posts_c.compose_c);
router.get('/:article_id',isAuth, posts_c.getarticle);
router.post('/compose', posts_c.compose_post);
router.post('/comment/:article_id',posts_c.postcomment_articleid);
router.post('/replycomment/:article_id/:comment_id',posts_c.postreplycomment);
router.post('/liked/:articleid', posts_c.postlike);
router.post('/disliked/:articleid', posts_c.postdislike);
router.delete('/:article_id/:comment_id',posts_c.deletecomment);
//this is filter apply handler
router.post('/', posts_c.filterhandler);
module.exports = router;