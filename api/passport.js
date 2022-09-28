const GoogleStrategy = require('passport-google-oauth20').Strategy;
const passport = require('passport');
const mongoose = require('mongoose')
const User = require("../api/models/User");


passport.use(new GoogleStrategy({
    clientID: "711400732010-68mnfurfgnq2qc7hud33ljb485898i20.apps.googleusercontent.com",
    clientSecret: "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",
    callbackURL: "http://localhost:8800/auth/google/callback"
  },
  async function(accessToken, refreshToken, profile, done) {


    const newUser = {
      googleId: profile.id,
      displayName: profile.displayName,
      firstName: profile.name.givenName,
      lastName: profile.name.familyName,
      image: profile.photos[0].value,
      email: profile.emails[0].value,
    }

    try {
      //find the user in our database 
      let user = await User.findOne({ googleId: profile.id })

      if (user) {
        //If user present in our database.
        done(null, user)
      } else {
        // if user is not preset in our database save user data to database.
        user = await User.create(newUser)
        done(null, user)
      }
    } catch (err) {
      console.error(err)
    }

  }
));


passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  User.findById(id, (err, user) => done(err, user))
});