const dotenv = require('dotenv');
const express = require('express');
const router = require('./routes')
const process = require('process');
const cors = require('cors');
const LinkedInStrategy = require('passport-linkedin-oauth2').Strategy;
const passport = require('passport');
const app = express();
var env = "development";
if (process.env.NODE_ENV) env = process.env.NODE_ENV;

console.log("ENV", env);
dotenv.config({
    path: `${__dirname}/.env.${env}`,
});
app.use(passport.initialize());
app.use(passport.session());
// app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.get('/', (req, res) => {
    res.send('Welcome to AI Teacher (Node Babel)');
});
passport.use(new LinkedInStrategy({
    clientID: process.env.LINKEDIN_API_KEY,
    clientSecret: process.env.LINKEDIN_SECRET_KEY,
    callbackURL: process.env.REDIRECT_URI,
    scope: ['r_emailaddress', 'r_liteprofile'],
}, function (token, tokenSecret, profile, ) {
    console.log("profile", profile)
    console.log("done", done)
    return done(null, profile);
}
));
app.use('/api', router);
app.all('/*', function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    next();
});
app.listen(process.env.PORT, () => {
    console.log(`[node] API listening on port ${process.env.PORT}`);
});