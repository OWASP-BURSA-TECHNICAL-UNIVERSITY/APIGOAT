const express = require('express');
const bodyParser = require("body-parser");
const path = require('path');

import { PORT_WEB, mongoDBURL } from '../config.js';


const mongose = require('mongoose');
mongose.connect(mongoDBURL);


const app = express();

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());


const routes = require('./routes');
app.use('/',routes);

//not found middleware
app.use((req, res, next) => {
    const error = new Error('Not Found');
    error.status = 404; 
    if(error){
        next(error);
    } else {
        res.sendFile(path.join(__dirname, './404.html'));
    }
});

// other error middleware
app.use((error, req, res, next) =>{
    res.status(error.status || 500);
    res.json({
        error: {
            message: error.message
        }
    });
});


app.listen(PORT_WEB, ()=> {
    console.log("listening on port", PORT_WEB);
});

