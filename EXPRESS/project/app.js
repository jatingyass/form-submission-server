const express = require('express');
const bodyParser = require('body-parser');

const app = express();

const adminRoutes = require('./admin');
const shopRoutes = require('./routes/shop');

// Use body-parser middleware to parse form data
app.use(bodyParser.urlencoded({ extended: false }));

// Use the routes
app.use('/admin', adminRoutes);
app.use('/shop', shopRoutes);

// Handle 404 for undefined routes
app.use((req, res) => {
  res.status(404).send('<h1>Page Not Found</h1>');
});

// Listen on port 3000
app.listen(3000, () => {
  console.log('Server is running on http://localhost:3000');
});
