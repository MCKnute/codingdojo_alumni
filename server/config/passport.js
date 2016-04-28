console.log('in the system');

var LocalStrategy = require('passport-local').Strategy;

var User = require('../models/user');

module.exports = function(passport) {

    passport.serializeUser(function(user, done) {
        console.log('test 2');
        done(null, user.id);
    });

    passport.deserializeUser(function(id, done) {
        console.log('test 3');
        User.findById(id, function(err, user) {
            done(err, user);
        });
    });

    passport.use('local-signup', new LocalStrategy({

        usernameField : 'email',
        passwordField : 'password',
        passReqToCallback : true
    },
    function(req, email, password, done) {
        console.log('does it go here?');
        User.findOne({ 'email' :  email }, function(err, user) {
            if (err){
                console.log('nope');
                return done(err);
            }
            if (user) {
                return done(null, false, req.flash('signupMessage', 'That email is already taken.'));
            } else {
                console.log('yep');
                var newUser = new User();

                newUser.email = email;
                newUser.password = newUser.generateHash(password); 
                newUser.firstName = req.param('firstName');
                newUser.lastName = req.param('lastName');
                newUser.currentJob = req.param('currentJob');
                newUser.summary = req.param('summary');
                newUser.github = req.param('github');
                newUser.linkedin = req.param('linkedin');
                newUser.contact = req.param('contact');
                newUser.primaryStack = req.param('primaryStack');
                newUser.primaryLocation = req.param('primaryLocation');

                newUser.save(function(err) {
                    if (err)
                        throw err;
                    return done(null, newUser);
                });
            }

        });

    }));

    passport.use('local-login', new LocalStrategy({

        usernameField : 'email',
        passwordField : 'password',
        passReqToCallback : true
    },
    function(req, email, password, done) { 

        User.findOne({ 'email' :  email }, function(err, user) {

            if (err)
                return done(err);


            if (!user)
                return done(null, false, req.flash('loginMessage', 'No user found.'));

            if (!user.validPassword(password))
                return done(null, false, req.flash('loginMessage', 'Oops! Wrong password.')); 
            
            return done(null, user);
        });

    }));

};
