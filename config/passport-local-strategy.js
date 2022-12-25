const passport = require('passport');

const LocalStrategy = require('passport-local').Strategy;

const User = require('../models/user.js')
// authentication using passport 
passport.use(new LocalStrategy({
    usernameField: 'email'
    }, 
    function(email, password, done) {
        //find a user and establish the identitity
        User.findOne({email: email}, function(err, user) {
            if(err) {
                console.log('Error in finding user ---> Passport');
                return done(err);
            }

            if(!user || user.password != password) {
                console.log('Invalid Username/Password');
                return done(null, false);
            }

            return done(null, user);
        });
    }

));

//serialize user function
//when we were authenticating we were taking out the id and putting it into the user id
//serializing the user to decide which key is to kept in the cookies

passport.serializeUser(function(user, done){
    done(null, user.id);
})

//deserialize user function
//when the cookie is being sent back to the server we were taking out that id and check which user's request came to the server
//deserialize the user from the key in the cookies
passport.deserializeUser(function(id, done){
    User.findById(id, function(err, user){
        if(err) {
            console.log('Error in finding user ---> Passport');
            return done(err);
        }
        return done(null, user);
    });
})
module.exports = passport;