const fs = require('fs');

const handleRoutes = (req, res) => {
  if (req.method === 'GET' && req.url === '/') {
    // Serve the form and display last submission
    fs.readFile('data.txt', 'utf-8', (err, data) => {
      if (err) data = 'No submissions yet';
      
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
    // Collect form data and write it to data.txt
    let body = '';
    req.on('data', chunk => { body += chunk.toString(); });
    req.on('end', () => {
      const formData = new URLSearchParams(body);
      const name = formData.get('name');
      fs.writeFile('data.txt', `Name: ${name}`, (err) => {
        if (err) throw err;
        res.writeHead(302, { 'Location': '/' });
        res.end();
      });
    });
  } else {
    res.writeHead(404, { 'Content-Type': 'text/plain' });
    res.end('Not Found');
  }
};

module.exports = handleRoutes;
