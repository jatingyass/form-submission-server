const express = require('express');

const app = express();

app.use((req, res, next) => {
    console.log('In the middleware');
    next(); // allows the request to continue to the next middleware in the line
});

app.use((req, res, next) => {
    console.log('In another middleware!');
    res.send('<h1>Hello from Epress!</h1>');
});

app.listen(3000);