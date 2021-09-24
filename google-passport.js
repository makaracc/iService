const passport = require("passport");
var GoogleStrategy = require("passport-google-oauth20").Strategy;
const mongoose = require("mongoose");

const User = require("./models/IServiceUser");

const GOOGLE_CLIENT_ID =
  "753820512918-c31fievr05larpjje5p5ktsc3ksti93p.apps.googleusercontent.com";
const GOOGLE_CLIENT_SECRET = "fPEeSovWJq2RoNqH7zQ9hTfc";

passport.use(
  new GoogleStrategy(
    {
      clientID: GOOGLE_CLIENT_ID,
      clientSecret: GOOGLE_CLIENT_SECRET,
      callbackURL: "http://localhost:1337/auth/google/callback",
      // passReqToCallback   : true
    },
    function (accessToken, refreshToken, profile, cb) {
      User.findOrCreate({ googleId: profile.id }, function (err, user) {
        if (user) {
          const user = new User({
            id: profile.id,
            email: profile.emails[0].value,
            first_name: profile.name.givenName,
            last_name: profile.name.familyName,
          });
          user.save().catch((err) => console.log(err));
        }
        return cb(err, user);
      });
      // return cb(null, profile);
    }
  )
);

passport.serializeUser(function (user, done) {
  done(null, user.id);
  // done(null, user);
});

passport.deserializeUser(function (id, done) {
  User.findById(mongoose.Types.ObjectId(id)).then((user) => {
    done(null, user);
  });

  // User.findById(id, function(err, user) {
  //   done(err, user);
  //   // done(null, user);
  // });
});
