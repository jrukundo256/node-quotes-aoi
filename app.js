const express = require('express');
const morgan = require('morgan');
const fs = require('fs');
const path = require('path');

const app = express();

// Middleware
app.use(express.json());
app.use(morgan('combined', {
  stream: fs.createWriteStream(path.join(__dirname, 'logs', 'request_logs.txt'), { flags: 'a' })
}));

// Routes
const quoteRoutes = require('./routes/quoteRoutes');
const authorRoutes = require('./routes/authorRoutes');

app.use('/quotes', quoteRoutes);
app.use('/authors', authorRoutes);

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});