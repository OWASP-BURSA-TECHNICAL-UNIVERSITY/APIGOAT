const express = require('express');
const router = express.Router();
const path = require('path');
const installer = require('./middlewares/installer');
const logins = require('./middlewares/logins');
const checkAuth = require('./middlewares/check-auth');
const Account = require('./models/Account');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');



router.get('/', installer, (req, res, next) => {
    res.status(404);
    res.json({
        message:"API2 is working, run to /logins path"
    });
});

router.get('/logins', logins, (req, res, next) => {
  res.status(404);
  res.json({
      message:"API2 is working"
  });
});


  
// Vunerable login endpoint (Broken Authentication)l
router.post('/signup', (req, res, next) => {
  Account.find({email:req.body.email})
  .exec()
  .then( account=> {
      if (account.length >= 1) {
          return res.status(409).json({
              message: 'Mail Exist'
          });
      } else {
          bcrypt.hash(req.body.password, 10, (err, hash) => {
          
              if (err) {
                  return res.status(500).json({
                      message: "unexpected error",
                      error: err
                  });
      
              } else {
                  const account = new Account({_id: new mongoose.Types.ObjectId, name:req.body.name, email: req.body.email, password: hash});
                  
                  account
                  .save()
                  .then( (result) => {
                      res.status(201).json({
                          message: "auth succesfull",
                          result: result
                      });
                  })
                  .catch( (err) => {
                      res.status(500).json({
                          message: "error",
                          error: err
                      });
                  });
              }
          });
      }
  
  })
  .catch( (err) => {
      console.error(err);
      res.status(500).json({
          message:"unexpected error",
          error: err
      })
  })
});

router.post("/login", (req, res, next) => {
  Account.find({ email: req.body.email })
  .exec()
  .then( (accounts) => {
      if (accounts.length <1) {
          return res.status(404).json({
              message: "Mail not found, account doesn't exist",
              message: 'Auth Failed'
          });
      } 
      bcrypt.compare(req.body.password, accounts[0].password, (err, result) => {
          if(err) {
              return res.status(401).json({
                  message: 'auth failed'
              });
          }

          if (result) {
              const token = jwt.sign({
                  email: accounts[0].email,
                  Id: accounts[0]._id
              }, "api2", 
              {
                  expiresIn: "1h"
              })

              return res.status(200).json({
                  message: 'Auth succesfull',
                  token: token
              });
          }

          res.status(401).json({
              message: 'Auth failed'
          });
      })
  })
  .catch();
});
  
  // Hypothetical protected API endpoint (assuming successful login)
router.get('/protected',checkAuth, (req, res, next) => {
    const authHeader = req.headers.authorization;
  
    // No token validation! (placeholder for actual token verification)
    if (!authHeader || authHeader !== 'Bearer fake-token') {
      return res.status(401).send('Unauthorized');
    }
  
    res.send('This is protected data!');
});

module.exports = router;