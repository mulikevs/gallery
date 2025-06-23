const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const path = require('path');
const config = require('./_config');

// Define routes
let index = require('./routes/index');
let image = require('./routes/image');

// Connect to MongoDB
const environment = process.env.NODE_ENV || 'development';
const mongoURI = config.mongoURI[environment];
mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true }, (err) => {
    if (err) {
        console.error('MongoDB connection error:', err);
        process.exit(1);
    }
});

// Log successful DB connection
mongoose.connection.once('open', () => {
    console.log('Database connected successfully');
});

// Initialize the app
const app = express();

// View Engine
app.set('view engine', 'ejs');

// Set up public folder
app.use(express.static(path.join(__dirname, 'public')));

// Body parser middleware
app.use(express.json());

// Routes
app.use('/', index);
app.use('/image', image);

// Start server only if not in test environment
const PORT = process.env.PORT || 5010;
if (process.env.NODE_ENV !== 'test') {
    app.listen(PORT, () => {
        console.log(`Server is listening at http://localhost:${PORT}`);
    });
}

module.exports = app; // Export app for testing
