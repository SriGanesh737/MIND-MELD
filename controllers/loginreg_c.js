

exports.logout=(req, res) => {
    req.session.destroy((err) => {
        if (err) throw err;
        res.redirect('/login');
    });
}

exports.index=(req, res) => {
    res.render('index');
}

exports.landingpage=(req, res) => {
    const registeras = req.session.registeras;
    // console.log(registeras+"....");
    res.render('landingpage', { 'registeras': registeras, is_blocked: req.session.is_blocked });
}