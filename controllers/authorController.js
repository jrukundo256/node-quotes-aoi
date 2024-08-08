const fs = require('fs');
const path = require('path');

const authorsFilePath = path.join(__dirname, '../models/authors.json');

const getAuthors = (req, res) => {
  fs.readFile(authorsFilePath, 'utf8', (err, data) => {
    if (err) {
      return res.status(500).json({ error: 'Failed to read authors data' });
    }
    const authors = JSON.parse(data);
    res.json(authors);
  });
};

module.exports = {
  getAuthors
};
