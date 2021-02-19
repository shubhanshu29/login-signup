const express= require("express");
const mysql= require("mysql");
const router= express.Router();
const bcrypt = require('bcrypt');


const db= mysql.createConnection({
    host: process.env.HOST,
    user: process.env.USER,
    password: process.env.PASSWORD,
    database: process.env.DATABASE
});


db.connect( (error) => {
    if(error){
        console.log(error);
    }
    else{
        console.log("DB Connected");
    }
});

router.get("/", (req, res) => {
    res.send("HOME PAGE");
});

router.get("/login", (req, res) => {
    res.send("LOGIN PAGE");
});

router.get("/register", (req, res) => {
    res.send("REGISTER PAGE");
});

router.post("/register", (req, res) => {

    const {username, password} = req.body;
    const hash= bcrypt.hash(password, 8);
    console.log(hash);
    db.query('SELECT username from users WHERE username= ?',[username], (error, results) =>{
        if(error){
            console.log(error);
            return res.send(error);
        }
        if(results.length > 0){
            return res.send(JSON.stringify("USERNAME ALREADY EXISTS! "));
        }
        else{
            db.query('INSERT INTO users SET ?', { username: username, password: password }, (error, result) => {
                if(error) {
                  console.log(error)
                } else {
                  return res.send(JSON.stringify("Registration Done"));
                }
            });
        }
    });
    console.log(username);
});

router.post("/login", (req, res) => {
    console.log(req.body)
    const {username, password} = req.body;
    db.query('SELECT username from users WHERE username= ? and password= ?',[username, password], (error, results) =>{
        if(error){
            console.log(error);
            res.send(error);
        }
        if(results.length == 0){
            res.send(JSON.stringify("THIS COMBINATION OF USERNAME PASSWORD DOESN'T EXIST"));
        }
        else{
            res.send(JSON.stringify('200'));
        }
    });
});

module.exports= router;