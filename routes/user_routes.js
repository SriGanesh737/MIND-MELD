const express = require('express')
const router = express.Router();
const {isAuth} = require('../controllers/isAuth');
const user_c=require('../controllers/user_c');


router.get('/edit_e',isAuth,user_c.editprofile );
router.post('/edit_e',user_c.posteditprofile);
router.get('/',isAuth,user_c.getprofile);
router.get('/edit_u',isAuth,user_c.edituser);


module.exports = router;