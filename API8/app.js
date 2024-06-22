const express = require('express');
const router = express.Router();
const Profile = require('./models/profile');

//Not working!

const p1 = { username: "username", name: "user1", email: "user@test.com" }
const  p2 = { username: "admin", name: "jane", email:"jane@test.com" }
const  p3 = { username: "user", name: "johny", email:"johny@test.com" }


router.get('/', (req, res, next) => {
  var p1p = new Profile({
      username: p1.username, 
      name: p1.name, 
      email: p1.email});
    p1p.save();
  
  var p2p = new Profile({
    username: p2.username, 
    name: p2.name, 
    email: p2.email});
  p2p.save();
  
  var p3p = new Profile({
    username: p3.username, 
    name: p3.name, 
    email: p3.email});
  p3p.save();

  res.status(200).json({
    message: "API8 is working"
  });
});



// Simulate a social media API endpoint (replace with actual logic)
// Permissive CORS policy (allowing all origins - BAD!)
router.get('/profiles/:user', (req, res) => {
  user = req.params.user;
  Profile.findOne({username: user})
  .exec()
  .then( (profile) =>{
    res.status(200).json({
      profile:profile
    });
  })
  .catch( (err) =>{
    res.status(500).json({
      error: err
    })
  })
});


module.exports = router;