const express = require('express');
const router = express.Router();
const query_model=require('../models/query_model.js')
let data="";
router.get('/',logger4,(req,res)=>{
    const registeras = req.session.registeras;
    res.render('contactus', {data:data,registeras:registeras,is_blocked:req.session.is_blocked});

})
router.post('/', (req, res) => {
    console.log(req.body);
    const query=new query_model({
        firstname:req.body.firstname,lastname:req.body.lastname,email:req.body.email,message:req.body.message,phone:req.body.phoneno
    })

    query.save().then(() => {console.log('Document saved')
    data='Thankyou for your response'
    res.redirect('/contactus');
       }
    ).catch((err) => {
        console.error(err)
        data="Invalid request "
        res.redirect('/contactus');

    }
    );


})

function logger4(req,res,next)
{
    next();
    data=""
}
module.exports = router;