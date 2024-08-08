const fs = require('fs');
const path = require('path');

const quotesFilePath = path.join(__dirname, '../models/quotes.json');

const getQuotes = (req, res) => {
  fs.readFile(quotesFilePath, 'utf8', (err, data) => {
    if (err) {
      return res.status(500).json({ error: 'Failed to read quotes data' });
    }
    const quotes = JSON.parse(data);
    res.json(quotes);
  });
};

module.exports = {
  getQuotes
};
