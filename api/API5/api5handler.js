const express = require('express');
const router = express.Router();
const path = require('path');

router.get('/', (req, res, next) => {
    res.status(404);
    res.json({
        message:"API5 is working"
    });
});

// Simulate a book database (replace with actual database interaction)
let books = [
    { id: 1, title: 'Book 1', author: 'Author 1' },
    { id: 2, title: 'Book 2', author: 'Author 2' },
  ];
  
// Vulnerable API endpoints (Broken Authorization)
router.get('/books', (req, res) => {
    res.send(books);
});


// Must be protected with JWT auth process  (check-auth middleware) 
router.post('/books', (req, res) => {
    const newBook = req.body;
    books.push(newBook); // Add book without authorization check!
    res.status(201).send('Book created successfully');
});
  
// ... Implement PUT and DELETE endpoints (assuming similar vulnerabilities)


module.exports = router;