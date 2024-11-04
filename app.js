const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');

const app = express();
app.set('view engine', 'ejs');


app.use(bodyParser.urlencoded({ extended: false }));

// Serve static files like CSS and client-side JavaScript
app.set('views', path.join(__dirname, 'views'));  // Ensures it works across OS
app.use(express.static(path.join(__dirname, 'public')));


// Route to show the login form
app.get('/login', (req, res) => {
  res.render('login');  // Render the login.ejs file
});

// Route to show the message form after login
app.get('/', (req, res) => {
  res.send(`
    <html>
    <head><title>Chat</title></head>
    <body>
      <h2>Send a Message</h2>
      <form action="/send-message" method="POST">
        <label for="message">Message:</label>
        <input type="text" id="message" name="message" required><br><br>
        <button type="submit">Send</button>
      </form>
      <hr>
      <h3>Chat History:</h3>
      <div id="chat">
        ${readMessages()}
      </div>
      <script src="/getUser.js"></script>
    </body>
    </html>
  `);
});

// Route to handle message submission
app.post('/send-message', (req, res) => {
  const username = req.body.username;
  const message = req.body.message;

  // Append message to file
  const chatMessage = `${username}: ${message}\n`;
  fs.appendFile('chat.txt', chatMessage, (err) => {
    if (err) throw err;
  });

  //  404 Page not found
app.use((req, res) => {
  res.status(404).render('404');  // Render the 404.ejs file
});

//contact us 
app.get('/contactus', (req, res) => {
  res.render('contactus');
});

app.post('/success', (req, res) => {
  // You can handle form data here if needed
  res.render('success');
});


  res.redirect('/');
});

// Function to read messages from file
function readMessages() {
  try {
    const data = fs.readFileSync('chat.txt', 'utf-8');
    return data.replace(/\n/g, '<br>');
  } catch (err) {
    return 'No messages yet.';
  }
}

// Start the server
app.listen(3000, () => {
  console.log('Server is running on http://localhost:3000');
});
