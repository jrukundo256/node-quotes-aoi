const express = require('express');
const morgan = require('morgan');
const fs = require('fs');
const path = require('path');
const quoteRoutes = require('./routes/quoteRoutes');
const authorRoutes = require('./routes/authorRoutes');

const app = express();

// M/W
app.use(express.json());
app.use(morgan('combined', {
  stream: fs.createWriteStream(path.join(__dirname, 'logs', 'request_logs.txt'), { flags: 'a' })
}));

// Routes
app.use('/quotes', quoteRoutes);
app.use('/authors', authorRoutes);

const PORT = 3500;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});