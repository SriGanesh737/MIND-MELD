const express = require('express');
const router = express.Router();
const { isAuth } = require('../controllers/isAuth');
const askquery_c=require('../controllers/askquery_c')



router.get('/',isAuth,askquery_c.askquery );
router.post('/', askquery_c.postaskquery);
router.post('/filter', askquery_c.postfilter);
router.post('/answer/:question_id', askquery_c.answerquery);



module.exports = router;