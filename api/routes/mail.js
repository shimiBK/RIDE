const nodemailer = require("nodemailer");
const router = require("express").Router();



router.post("/", function(req, res){
    let to = req.body.to;
    let subject = req.body.subject;
    let message = req.body.message;
    
    
    let transporter = nodemailer.createTransport({
        service: 'gmail',
        auth:{
            user: 'ridedmusic@gmail.com',
            pass: 'phhocybxmpljuhgd'      
        }
    });
    
    let mailOptions = {
    from :'ridedmusic@gmail.com',
    to: to,
    subject: subject,
    text : message
    
    }
    
    transporter.sendMail(mailOptions , function(err , info){
    
        if(err){
            console.log(err);
        }else{
            console.log("Email Sent" + info.response);
        }
        
    })
    
    
    });


module.exports = router
    
