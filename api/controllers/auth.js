
const passport = require("passport");
const {createError} = require("../utils/error.js")
const CLIENT_URL = "http://localhost:3000/";


const loginSuccess = (req, res) => {

    if (req.user) {
      res.status(200).json({
        success: true,
        message: "successfull",
        user: req.user,
        cookies: req.cookies
      });
    }
    
  };


  const loginFailed = (req, res) => {
    return next(createError(401,"login failed"));
  };


  const logout = (req, res) => {
    req.logout();
    res.redirect(CLIENT_URL);
  };
  
  const google = passport.authenticate("google", { scope: ["profile","email"] });

  const googleCallback = passport.authenticate("google", {
    successRedirect: CLIENT_URL,
    failureRedirect: "/login/failed",
  });
  


  module.exports = {loginSuccess , loginFailed , logout , google , googleCallback}