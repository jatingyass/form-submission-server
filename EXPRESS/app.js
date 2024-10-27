const express = require('express');
const app = express();

// Middleware 1
app.use((req, res, next) => {
  console.log('Middleware 1: Incoming request');
  next(); // Passing control to the next middleware
});

// Middleware 2
app.use((req, res, next) => {
  console.log('Middleware 2: Processing request');
  next();
});

app.get('/', (req, res) => {
  res.send('<h1> Hello to Node JS </h1>');
});

// Start server on port 3000
app.listen(3000, () => {
  console.log('Server is running on port 3000');
});


