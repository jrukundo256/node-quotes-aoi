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

const getQuoteById = (req, res) => {
  const quoteId = parseInt(req.params.id, 10);
  fs.readFile(quotesFilePath, 'utf8', (err, data) => {
    if (err) {
      return res.status(500).json({ error: 'Failed to read quotes data' });
    }
    const quotes = JSON.parse(data);
    const quote = quotes.find(q => q.id === quoteId);
    if (!quote) {
      return res.status(404).json({ error: 'Quote not found' });
    }
    res.json(quote);
  });
};

const createQuote = (req, res) => {
  const newQuote = req.body;
  fs.readFile(quotesFilePath, 'utf8', (err, data) => {
    if (err) {
      return res.status(500).json({ error: 'Failed to read quotes data' });
    }
    const quotes = JSON.parse(data);
    newQuote.id = quotes.length ? quotes[quotes.length - 1].id + 1 : 1;
    quotes.push(newQuote);
    fs.writeFile(quotesFilePath, JSON.stringify(quotes, null, 2), (err) => {
      if (err) {
        return res.status(500).json({ error: 'Failed to save quote' });
      }
      res.status(201).json(newQuote);
    });
  });
};

const updateQuote = (req, res) => {
  const quoteId = parseInt(req.params.id, 10);
  const updatedQuote = req.body;
  fs.readFile(quotesFilePath, 'utf8', (err, data) => {
    if (err) {
      return res.status(500).json({ error: 'Failed to read quotes data' });
    }
    let quotes = JSON.parse(data);
    const quoteIndex = quotes.findIndex(q => q.id === quoteId);
    if (quoteIndex === -1) {
      return res.status(404).json({ error: 'Quote not found' });
    }
    quotes[quoteIndex] = { ...quotes[quoteIndex], ...updatedQuote };
    fs.writeFile(quotesFilePath, JSON.stringify(quotes, null, 2), (err) => {
      if (err) {
        return res.status(500).json({ error: 'Failed to update quote' });
      }
      res.json(quotes[quoteIndex]);
    });
  });
};

const deleteQuote = (req, res) => {
  const quoteId = parseInt(req.params.id, 10);
  fs.readFile(quotesFilePath, 'utf8', (err, data) => {
    if (err) {
      return res.status(500).json({ error: 'Failed to read quotes data' });
    }
    let quotes = JSON.parse(data);
    quotes = quotes.filter(q => q.id !== quoteId);
    fs.writeFile(quotesFilePath, JSON.stringify(quotes, null, 2), (err) => {
      if (err) {
        return res.status(500).json({ error: 'Failed to delete quote' });
      }
      res.status(204).send();
    });
  });
};

module.exports = {
  getQuotes,
  getQuoteById,
  createQuote,
  updateQuote,
  deleteQuote
};
