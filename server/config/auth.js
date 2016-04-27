// config/auth.js

// expose our config directly to our application using module.exports
module.exports = {

    'facebookAuth' : {
        'clientID'      : '814337352044542', // your App ID
        'clientSecret'  : '703b0e563da90b84e811af8b6e272c92', // your App Secret
        'callbackURL'   : 'http://localhost:8080/auth/facebook/callback'
    },

    'googleAuth' : {
        'clientID'      : '991659841451-u62fsocnuat17slkf29nc113v1s1cv9b.apps.googleusercontent.com',
        'clientSecret'  : '6l9uQlG0AbsMbdjN_S0dUZBS',
        'callbackURL'   : 'http://localhost:8080/auth/google/callback'
    }

};