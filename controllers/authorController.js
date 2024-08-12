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

const getAuthorById = (req, res) => {
  const authorId = parseInt(req.params.id, 10);
  fs.readFile(authorsFilePath, 'utf8', (err, data) => {
    if (err) {
      return res.status(500).json({ error: 'Failed to read authors data' });
    }
    const authors = JSON.parse(data);
    const author = authors.find(a => a.id === authorId);
    if (!author) {
      return res.status(404).json({ error: 'Author not found' });
    }
    res.json(author);
  });
};

const createAuthor = (req, res) => {
  const newAuthor = req.body;
  fs.readFile(authorsFilePath, 'utf8', (err, data) => {
    if (err) {
      return res.status(500).json({ error: 'Failed to read authors data' });
    }
    const authors = JSON.parse(data);
    newAuthor.id = authors.length ? authors[authors.length - 1].id + 1 : 1;
    authors.push(newAuthor);
    fs.writeFile(authorsFilePath, JSON.stringify(authors, null, 2), (err) => {
      if (err) {
        return res.status(500).json({ error: 'Failed to save author' });
      }
      res.status(201).json(newAuthor);
    });
  });
};

const updateAuthor = (req, res) => {
  const authorId = parseInt(req.params.id, 10);
  const updatedAuthor = req.body;
  fs.readFile(authorsFilePath, 'utf8', (err, data) => {
    if (err) {
      return res.status(500).json({ error: 'Failed to read authors data' });
    }
    let authors = JSON.parse(data);
    const authorIndex = authors.findIndex(a => a.id === authorId);
    if (authorIndex === -1) {
      return res.status(404).json({ error: 'Author not found' });
    }
    authors[authorIndex] = { ...authors[authorIndex], ...updatedAuthor };
    fs.writeFile(authorsFilePath, JSON.stringify(authors, null, 2), (err) => {
      if (err) {
        return res.status(500).json({ error: 'Failed to update author' });
      }
      res.json(authors[authorIndex]);
    });
  });
};

const deleteAuthor = (req, res) => {
  const authorId = parseInt(req.params.id, 10);
  fs.readFile(authorsFilePath, 'utf8', (err, data) => {
    if (err) {
      return res.status(500).json({ error: 'Failed to read authors data' });
    }
    let authors = JSON.parse(data);
    authors = authors.filter(a => a.id !== authorId);
    fs.writeFile(authorsFilePath, JSON.stringify(authors, null, 2), (err) => {
      if (err) {
        return res.status(500).json({ error: 'Failed to delete author' });
      }
      res.status(204).send();
    });
  });
};

module.exports = {
  getAuthors,
  getAuthorById,
  createAuthor,
  updateAuthor,
  deleteAuthor
};
