const express= require("express");
const dotenv= require("dotenv");
const bodyParser= require("body-parser");

const  app= express();

app.use(bodyParser.json());
dotenv.config({path: './.env'});


app.use('/', require('./routes/pages'));


app.listen(8000, () => {
    console.log("SERVER started"); 
});