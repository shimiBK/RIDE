const router = require("express").Router();
const {sendMail} = require("../controllers/mail");



router.post("/", sendMail);


module.exports = router
    
