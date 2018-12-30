const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const passport = require('passport');

//user model
const User = require("../models/User");
router.get("/login", (req, res) => {
  res.render("login");
});

router.get("/register", (req, res) => {
  res.render("register");
});

router.post("/register", (req, res) => {
  console.log(req.body);
  const {
    name,
    email,
    password,
    password2
  } = req.body;
  let errors = [];

  if (!name || !email || !password || !password2) {
    errors.push({
      msg: "pls fill in all details"
    });
  }

  if (password != password2) {
    errors.push({
      msg: "password did not match"
    });
  }

  if (password.length < 6) {
    errors.push({
      msg: "Password must be at least 6 characters"
    });
  }

  if (errors.length > 0) {
    res.render("register", {
      errors,
      name,
      email,
      password,
      password2
    });
  } else {
    //validation pass
    User.findOne({
      email: email
    }).then(user => {
      if (user) {
        //if user exists
        errors.push({
          msg: "user exists"
        });
        res.render("register", {
          errors,
          name,
          email,
          password,
          password2
        });
      } else {
        const newUser = new User({
          name,
          email,
          password
        });
        bcrypt.genSalt(10, (err, salt) => {
          bcrypt.hash(newUser.password, salt, (err, hash) => {
            if (err) throw err;
            newUser.password = hash;

            newUser
              .save()
              .then(user => {
                req.flash('success_msg','u r logged in')
                res.redirect('/users/login')
              })
              .catch(err => console.log(err));
          });
        });
        console.log(newUser);

      }
    });
  }
});

//login handles
router.post('/login',(req,res,next)=>{
  passport.authenticate('local',{
    successRedirect:'/dashboard',
    failureRedirect:'/user/login',
    failureFlash:true
  })(req,res,next)
})

//logout handle
router.get('/logout',(req,res)=>{
  req.logOut();
  req.flash('success_msg','you are logged out')
  res.redirect('/users/login')
})


module.exports = router;