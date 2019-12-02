const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const ejs = require('ejs');
const socketio = require('socket.io');

// Init app
const app = express();

// Template engine setup
app.set('view engine', 'html');
app.engine('html', ejs.renderFile);

// Body parser middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Index route
app.get('/', (req, res) => {
  res.render('index', {
    title: 'Kaizen Finances'
  });
});

// Public folder setup
app.use(express.static(path.join(__dirname + '/public')));

// Define port
const PORT = process.env.PORT || 3000;

const server = app.listen(PORT, () =>
  console.log(`Server started on port ${PORT}`)
);

// Connect to socket.io
const io = socketio(server);
io.on('connection', socket => {
  console.log('Connected');
  io.on('disconnect', () => {
    console.log('Disconnected');
  });
});
