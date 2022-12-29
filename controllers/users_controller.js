const User = require('../models/user.js');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');

module.exports.profile = function(req, res) {
    return res.render('user_profile.ejs', {
        title: "User Profile"
    })
}

module.exports.signIn = function(req, res) {
    if(req.isAuthenticated()) {
        return res.redirect('/users/profile');
    }
    res.render('user_sign_in.ejs', {
        title: "Codeial| Sign In"
    })
}
module.exports.signUp = function(req, res) {
    if(req.isAuthenticated()) {
        return res.redirect('/users/profile');
    }
    res.render("user_sign_up.ejs", {
        title: "Codeial| Sign Up"
    })
}

//get the sign up data
module.exports.create = function(req, res) {
    //console.log(req);
    if(req.body.password != req.body.confirm_password) {
        res.redirect('back');
    }

    User.findOne({email: req.body.email}, function(err, user) {

        if(err) {
            console.log('error in finding user in signing up');
            return;
        }

        if(!user) {
            //user not found
            User.create(req.body, function(err, user) {
                if(err) {console.log('error in creating user while signing up');return;}

                return res.redirect('/users/sign-in');
            })
        } else {
            res.redirect('back');
        }

    });
}

//sign in and create a session for the user
module.exports.createSession = function(req, res) {
    return res.redirect('/');
}

module.exports.destroySession = function(req, res) {
    req.logout(function(err) {
        if(err) {return next(err);}
        return res.redirect('/');
    });
}