exports.compose_c = (req, res) => {
    console.log('here')
    const registeras = req.session.registeras;

    res.render('compose', { 'registeras': registeras })
};