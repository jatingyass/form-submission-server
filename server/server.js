const http = require('http');

// Create server
const server = http.createServer((req, res) => {
  res.writeHead(200, { 'Content-Type': 'text/plain' });
  res.end('Hello, my name is Jatin Gyass!\n');
  console.log('Name logged: Jatin Gyass');
});

// Run server on port 4000
server.listen(4000, () => {
  console.log('Server running on http://localhost:4000');
});
