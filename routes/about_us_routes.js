const express = require('express');
const router = express.Router();
const aboutus_c=require('../controllers/aboutus_c');

router.get('/',aboutus_c.aboutus);


module.exports = router;
