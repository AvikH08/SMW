const express = require('express');
const app = express();
const port = 8000;
const expressLayouts = require('express-ejs-layouts');

app.use(express.static('./assets'));
app.use(expressLayouts);
//by default , it runs on port 80


//extract style and scripts from sub pages
app.set('layout extractStyles', true);
app.set('layout extractScripts', true);

//use express router
app.use('/', require('./routes/index.js'))

app.set('view engine', 'ejs');
app.set('views', './views');


app.listen(port, function(err) {
    if(err) {
        console.log(`Error in runnin the server : ${err}`)
    }
    console.log(`Server is running on port ${port}`);
});