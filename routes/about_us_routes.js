const express = require('express');
const router = express.Router();


router.get('/', (req, res) => {
    const registeras = req.session.registeras;
    const is_blocked = req.session.is_blocked;
    res.render('about', { 'registeras': registeras,is_blocked:is_blocked });
})

module.exports = router;
