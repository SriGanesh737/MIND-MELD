const express = require('express');
const router = express.Router();
const {isAuth} = require('../controllers/isAuth');
const bookmarks_c=require('../controllers/bookmarks_c');

router.get('/',isAuth,bookmarks_c.bookmarks);
router.get('/addBookmark/:article_id',isAuth,bookmarks_c.addbookmarks);
router.get('/removeBookmark/:article_id',isAuth,bookmarks_c.removebookmarks);
router.post('/', bookmarks_c.postarticle);

module.exports = router;