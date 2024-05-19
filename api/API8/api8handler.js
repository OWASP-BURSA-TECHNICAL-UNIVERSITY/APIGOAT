const express = require('express');
const router = express.Router();
const path = require('path');

//Not working!

router.get('/', (req, res, next) => {
  res.status(404);
  res.json({
    message: "API8 is working"
  });
});

// Placeholder for a third-party authentication library (assuming insecure default credentials - BAD!)
const users = [
  { username: "username", password: "passsword" },
  { username: "admin", password: "admin" },
  { username: "user", password: "1234" }
];
// ... insecure default credentials
// Placeholder for sensitive data (like username/password
//   // Insecure communication over plain HTTP (BAD!)
//   const isValid = auth.authenticate(username, password); // Replace with secure authentication logic

//   if (isValid) {
//     // Placeholder for generating a token (replace with secure JWT generation)
//     const token = 'fake-token';
//     res.send({ token });
//   } else {
//     res.status(401).send('Invalid credentials'); // Potentially verbose error message (BAD!)
//   }
// });


// Placeholder for a third-party authentication library (assuming insecure default credentials - BAD!)
const auth = {
  // ... insecure default credentials
};

// Placeholder for sensitive data (like username/password) in request body
router.post('/login', (req, res) => {
  const username = req.body.username;
  const password = req.body.password;

  // Insecure communication over plain HTTP (BAD!)
  const isValid = auth.authenticate(username, password); // Replace with secure authentication logic

  if (isValid) {
    // Placeholder for generating a token (replace with secure JWT generation)
    const token = 'fake-token';
    res.send({ token });
  } else {
    res.status(401).send('Invalid credentials: ' +  // Potentially verbose error message (BAD!)
      (process.env.NODE_ENV !== 'production' ? auth.getErrorMessage(username) : '')); // Leak info in dev mode
  }
});


// Placeholder for exposed debugging endpoint (REMOVE in production!)
router.get('/debug/info', (req, res) => {
  res.send({ serverInfo: 'Internal server details' }); // Potentially sensitive information (BAD!)
});

module.exports = router;