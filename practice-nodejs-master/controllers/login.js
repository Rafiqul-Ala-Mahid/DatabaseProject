const mysql = require("mysql");
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const async = require("hbs/lib/async");


const db= mysql.createConnection({
    host: process.env.DATABASE_HOST,
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE
});

exports.login = (req,res)=>{
    console.log(req.body);
    const {  email,password } = req.body;
    if(!email || !password) {
        return res.render('login', {
            message: 'Please Enter your email & password to continue! '
        });
      }  

      else if  (email== 'diptosarker802@gmail.com' && password == 85858585){
          return res.render('adminPage', {
            message: 'Welcome; Admin!! You are successfully logged in.'
          });
      }
    else{
          db.query('SELECT email FROM users WHERE email =?', [email], async (error, results)=>{
           if(error) {
               console.log(error);
            }
          if (results.length > 0) {
              return res.render('loggedin', {
                    message: 'Successfully logged in'
              });
           }else {
                return res.render('login', {
                    message: 'Email or Password is incorrect !!'
                });
              }

       })
    }
      
}