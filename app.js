const express = require('express');
const path = require('path');

const app = express();

const mongoConnect = require('./util/database').mongoConnect;

const bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({extended: false}));
app.use(express.static(path.join(__dirname, 'public')));

const appRoutes = require('./routes.js');

app.use(appRoutes);

mongoConnect(()=>{
    app.listen(3000);
});
