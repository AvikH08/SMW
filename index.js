const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const app = express();
const port = 8000;
const expressLayouts = require('express-ejs-layouts');
const db = require('./config/mongoose.js');
//used for session cookie
const session = require('express-session');
const passport = require('passport');
const passportLocal = require('./config/passport-local-strategy.js');
const MongoStore = require('connect-mongo')(session);
const sassMiddleware = require('node-sass-middleware');
//by default , it runs on port 80

app.use(sassMiddleware({
    src: './assets/scss',
    dest: './assets/css',
    debug: true,
    outputStyle: 'extended',
    prefix: '/css'
}));

app.use(express.urlencoded());
app.use(cookieParser());
app.use(express.static('./assets'));
app.use(expressLayouts);


//extract style and scripts from sub pages
app.set('layout extractStyles', true);
app.set('layout extractScripts', true);


app.set('view engine', 'ejs');
app.set('views', './views');

//just after it we have to set up the middleware for using passport


//mongo store is used to store the session cookie in db
app.use(session({
    name: 'codeial',
    //TODO change the secret before deployment in production mode
    secret: 'blahsomething',
    saveUninitialized: false,//when a request is uninitialised, we dont want to store extra data, so it is false
    resave: false,//when identity is established, if the session cookie is stored, do we want to change or rewrite it , we do not want to store, so we set it as false
    cookie: {
        maxAge: (1000 * 60 * 100)//in  milliseconds, this is the session expiry time
    },
    store: new MongoStore(
        {
            mongooseConnection: db,
            autoRemove: 'disabled'
        },
        function(err) {
            console.log(err || 'connect-mongodb setup ok');
        }
    )
}));

app.use(passport.initialize());
app.use(passport.session());
app.use(passport.setAuthenticatedUser);
//use express router
app.use('/', require('./routes/index.js'));

app.listen(port, function(err) {
    if(err) {
        console.log(`Error in running the server : ${err}`)
    }
    console.log(`Server is running on port ${port}`);
});