const express = require('express');
const bodyParser = require('body-parser');

const app = express();

// Use body-parser middleware to parse form data
app.use(bodyParser.urlencoded({ extended: false }));

// Route to display the form
app.get('/add-product', (req, res) => {
  res.send(`
    <form action="/product" method="POST">
      <label for="productName">Product Name:</label>
      <input type="text" id="productName" name="productName" required><br><br>
      <label for="productSize">Product Size:</label>
      <input type="text" id="productSize" name="productSize" required><br><br>
      <button type="submit">Add Product</button>
    </form>
  `);
});

// Route to handle form submission
app.post('/product', (req, res) => {
  const { productName, productSize } = req.body;
  console.log(`Product Name: ${productName}, Product Size: ${productSize}`);
  res.redirect('/add-product');
});

// Listen on port 3000
app.listen(3000, () => {
  console.log('Server is running on http://localhost:3000');
});
