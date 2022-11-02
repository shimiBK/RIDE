const router = require("express").Router();

const {loginSuccess, loginFailed , logout , google , googleCallback} = require("../controllers/auth");




//google

router.get("/login/success", loginSuccess);

router.get("/login/failed", loginFailed);


router.get("/logout", logout);

router.get("/google", google);

router.get(
  "/google/callback",googleCallback);
  



module.exports = router