const http = require('http');
const fs = require('fs');
const url = require('url');

const server = http.createServer((req, res) => {
  if (req.method === 'GET' && req.url === '/') {
    // Serve the HTML form and read data from the file to display
    fs.readFile('data.txt', 'utf-8', (err, data) => {
      if (err) {
        data = 'No submissions yet';
      }
      
      res.writeHead(200, { 'Content-Type': 'text/html' });
      res.write(`
        <html>
        <head><title>Form Submission</title></head>
        <body>
          <h2>Submit your data</h2>
          <form action="/submit" method="POST">
              <label for="name">Name:</label>
              <input type="text" id="name" name="name" required><br><br>
              <input type="submit" value="Submit">
          </form>
          <hr>
          <h3>Last Submission:</h3>
          <p>${data}</p>
        </body>
        </html>
      `);
      res.end();
    });
  } else if (req.method === 'POST' && req.url === '/submit') {
    // Collect form data
    let body = '';
    req.on('data', chunk => {
      body += chunk.toString();
    });

    req.on('end', () => {
      const formData = new URLSearchParams(body);
      const name = formData.get('name');

      // Write the submitted name to the data.txt file
      fs.writeFile('data.txt', `Name: ${name}`, (err) => {
        if (err) throw err;
        
        // After writing the file, redirect back to the form page
        res.writeHead(302, { 'Location': '/' });
        res.end();
      });
    });
  } else {
    res.writeHead(404, { 'Content-Type': 'text/plain' });
    res.end('Not Found');
  }
});

// Listen on port 4000
server.listen(4000, () => {
  console.log('Server running at http://localhost:4000');
});
