const express = require('express');
const router = express.Router();

// Route to display the add product form
router.get('/add-product', (req, res) => {
  res.send(`
    <form action="/admin/product" method="POST">
      <label for="productName">Product Name:</label>
      <input type="text" id="productName" name="productName" required><br><br>
      <label for="productSize">Product Size:</label>
      <input type="text" id="productSize" name="productSize" required><br><br>
      <button type="submit">Add Product</button>
    </form>
  `);
});

// Route to handle form submission
router.post('/product', (req, res) => {
  const { productName, productSize } = req.body;
  console.log(`Product Name: ${productName}, Product Size: ${productSize}`);
  res.redirect('/admin/add-product');
});


module.exports = router;
