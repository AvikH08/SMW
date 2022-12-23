const express = require('express');
const app = express();
const port = 8000;
//by default , it runs on port 80

//use express router
app.use('/', require('./routes/index.js'))


app.listen(port, function(err) {
    if(err) {
        console.log(`Error in runnin the server : ${err}`)
    }
    console.log(`Server is running on port ${port}`);
});