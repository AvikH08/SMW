const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = 8000;
const expressLayouts = require('express-ejs-layouts');
const db = require('./config/mongoose.js');
//used for session cookie
const session = require('express-session');
const passport = require('passport');
const passportLocal = require('./config/passport-local-strategy.js');

app.use(express.static('./assets'));
app.use(expressLayouts);
app.use(express.urlencoded());
//by default , it runs on port 80


//extract style and scripts from sub pages
app.set('layout extractStyles', true);
app.set('layout extractScripts', true);

//use express router
app.use('/', require('./routes/index.js'))

app.set('view engine', 'ejs');
app.set('views', './views');

//just after it we have 


app.listen(port, function(err) {
    if(err) {
        console.log(`Error in runnin the server : ${err}`)
    }
    console.log(`Server is running on port ${port}`);
});