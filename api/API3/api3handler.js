const express = require('express');
const router = express.Router();
const path = require('path');

router.get('/', (req, res, next) => {
    res.status(404);
    res.json({
        message:"API3 is working"
    });
});

// Dummy user data (replace with proper user database)
const users = {
  1: { id: 1, name: 'Alice', isAdmin: true, posts: ['Public post 1'] },
  2: { id: 2, name: 'Bob', isAdmin: false, posts: ['Public post 2'] },
  4: { id: 4, name: 'Michel', isAdmin: false, posts: ['Public post 3'] },
};

// Vulnerable endpoint for retrieving user profiles (Broken Authorization)
router.get('/users/:userId', (req, res, next) => {
  const userId = req.params.userId;
  const user = users[userId];

  if (!user) {
    return res.status(404).send('User not found');
  }

  // Return all user properties regardless of permissions!
  res.send(user);
});


module.exports = router;