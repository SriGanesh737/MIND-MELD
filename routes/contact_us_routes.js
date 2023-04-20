const express = require('express');
const router = express.Router();


router.get('/', (req, res) => {
    const registeras = req.session.registeras;
    res.render('contactus', { 'registeras': registeras });
})

module.exports = router;