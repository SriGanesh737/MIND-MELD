const express = require('express');
const router = express.Router();


router.get('/', (req, res) => {
    const registeras = req.session.registeras;
    res.render('about', { 'registeras': registeras })
})

module.exports = router;
