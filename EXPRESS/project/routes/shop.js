const express = require('express');
const router = express.Router();

// Display shop homepage 
router.get('/', (req, res) => {
  res.send('<h1>Welcome to the Shop</h1>');
});

module.exports = router;
