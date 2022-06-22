const express = require('express');
const Connection = require('mysql/lib/Connection');
const mysql = require("mysql");
const router = express.Router();

const db= mysql.createConnection({
   host: process.env.DATABASE_HOST,
   user: process.env.DATABASE_USER,
   password: process.env.DATABASE_PASSWORD,
   database: process.env.DATABASE
});

router.get("/", (req, res) => {
    // res.send("<h1> Home Page </h1>")
    res.render("index");
 });
 
router.get("/register", (req, res) => {
     // res.send("<h1> Home Page </h1>")
     res.render("register");
  });

  router.get("/login", (req, res) => {
    // res.send("<h1> Home Page </h1>")
    res.render("login");
 });

 router.get("/logout", (req, res) => {   
   res.render("index");
});

//router.get("/bookList", (req, res) => {
  // res.render("bookList");
//});



router.get("/bookList", (req, res) => {
   let sql = "SELECT id,name,email,mobile FROM users ";
   let query = db.query(sql, (err, result) => {
     if (err) throw err;
     console.log(result);
     res.render("bookList", { result });
   });
 });



  module.exports = router;