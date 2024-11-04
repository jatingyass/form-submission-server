const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');
const session = require('express-session');

const app = express();
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: false }));

// Set up session management
app.use(session({
  secret: 'your_secret_key',
  resave: false,
  saveUninitialized: true,
}));

// Login page route
app.get('/login', (req, res) => {
  res.render('login');  // Render login form
});

// Handle login form submission and store username in session
app.post('/login', (req, res) => {
  const { username } = req.body;
  if (username) {
    req.session.username = username;  // Save username in session
    console.log(`User logged in: ${username}`); // Debugging line
    res.redirect('/');  // Redirect to home after login
  } else {
    res.status(400).send('Username is required');
  }
});

// Home route to display chat history
app.get('/', (req, res) => {
  const chatMsg = readMessages();
  res.render('chat', { chatMsg });
});

app.get('/contactus', (req, res) => {
  res.render('contactus');
});

app.post('/success', (req, res) => {
  const { name, email } = req.body;
  console.log(`Form filled with Name: ${name}, Email: ${email}`);
  res.render('success', {name});
});

// Handle message submission and store messages in chat.txt with username from session
app.post('/send-message', (req, res) => {
  const username = req.session.username || 'Guest';  // Get username from session
  const message = req.body.message;

  // Store message in chat.txt
  const chatMessage = `${username}: ${message}\n`;
  fs.appendFile('chat.txt', chatMessage, (err) => {
    if (err) throw err;
  });

  res.redirect('/');
});

// Function to read messages from chat.txt
function readMessages() {
  try {
    const data = fs.readFileSync('chat.txt', 'utf-8');
    // Split by new lines and filter out empty lines
    const messagesArray = data.split('\n').filter(line => line.trim() !== '');
    // Join back with new lines for text display
    return messagesArray.join('\n'); // Change to \n for <pre> to work
  } catch (err) {
    return 'No messages yet.';
  }
}


// Handle 404 errors
app.use((req, res) => {
  res.status(404).render('404');
});

// Start server
app.listen(3000, () => {
  console.log('Server is running on http://localhost:3000');
});








// const express = require('express');
// const bodyParser = require('body-parser');
// const fs = require('fs');
// const path = require('path');

// const app = express();
// app.set('view engine', 'ejs');

// // Middleware
// app.use(bodyParser.urlencoded({ extended: false }));
// app.set('views', path.join(__dirname, 'views'));
// app.use(express.static(path.join(__dirname, 'public')));

// // Routes
// app.get('/login', (req, res) => {
//   res.render('login');
// });

// // Main chat route
// app.get('/', (req, res) => {
//   res.render('chat', { chatHistory: readMessages() });
// });

// // Handle message submission
// app.post('/send-message', (req, res) => {
//   const username = req.body.username; // Get the username from the hidden input
//   const message = req.body.message;
//   const chatMessage = `${username}: ${message}\n`;

//   // Append message to the chat.txt file
//   fs.appendFile('chat.txt', chatMessage, (err) => {
//     if (err) throw err;
//     res.redirect('/'); // Redirect back to chat page
//   });
// });

// // Contact us route
// app.get('/contactus', (req, res) => {
//   res.render('contactus');
// });

// // Success route for form submission
// app.post('/success', (req, res) => {
//   const name = req.body.name;
//   const email = req.body.email;
//   res.render('success', { name });
// });

// // 404 Handling
// app.use((req, res) => {
//   res.status(404).render('404');
// });

// // Function to read messages from file
// // Function to read messages from file
// function readMessages() {
//   try {
//     const data = fs.readFileSync('chat.txt', 'utf-8');
//     // Split the data into lines and format each message
//     const messages = data.split('\n').map(line => {
//       const [username, message] = line.split(': ');
//       return `${username.trim()}: ${message ? message.trim() : ''}`;
//     }).filter(line => line[0]); // Filter out any empty lines
//     return messages.join('<br>'); // Join messages with line breaks for HTML display
//   } catch (err) {
//     return 'No messages yet.';
//   }
// }


// // Start the server
// app.listen(3000, () => {
//   console.log('Server is running on http://localhost:3000');
// });

