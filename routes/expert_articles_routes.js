const express = require('express');
const router = express.Router();
const {isAuth} = require('../controllers/isAuth');
const expertarticles_c=require('../controllers/expertartcles_c')



router.get('/',isAuth, expertarticles_c.getarticles);
router.get('/delete/:article_id',isAuth, expertarticles_c.deletearticle);
router.post('/',expertarticles_c.filterarticles);


module.exports = router;

