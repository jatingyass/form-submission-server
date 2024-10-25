// file: server.js
const http = require('http');
const fs = require('fs');
const handleRoutes = require('./routes');

// Create the server
const server = http.createServer(handleRoutes);

// Listen on port 4000
server.listen(4000, () => {
  console.log('Server running at http://localhost:4000');
});
