const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const getQuotes = async (req, res) => {
  try {
    const quotes = await prisma.quote.findMany({
      include: { author: true },
    });
    res.json(quotes);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch quotes' });
  }
};

const getQuoteById = async (req, res) => {
  const quoteId = parseInt(req.params.id, 10);
  try {
    const quote = await prisma.quote.findUnique({
      where: { id: quoteId },
      include: { author: true },
    });
    if (!quote) {
      return res.status(404).json({ error: 'Quote not found' });
    }
    res.json(quote);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch quote' });
  }
};

// const createQuote = async (req, res) => {
//   const { text, category, authorId } = req.body;
//   try {
//     const newQuote = await prisma.quote.create({
//       data: { text, category, authorId: authorId ? parseInt(authorId, 10) : undefined },
//       include: { author: true },
//     });
//     res.status(201).json(newQuote);
//   } catch (error) {
//     res.status(500).json({ error: 'Failed to create quote' });
//   }
// };

const createQuote = async (req, res) => {
  const { text, category, authorId } = req.body;
  const userId = req.user.userId;

  try {
    const newQuote = await prisma.quote.create({
      data: {
        text,
        category,
        authorId: authorId ? parseInt(authorId, 10) : undefined,
        createdBy: userId 
      },
      include: { author: true },
    });
    res.status(201).json(newQuote);
  } catch (error) {
    console.error('Error creating quote:', error);
    res.status(500).json({ error: 'Failed to create quote' });
  }
};

const updateQuote = async (req, res) => {
  const quoteId = parseInt(req.params.id, 10);
  const { text, category, authorId } = req.body;
  try {
    const updatedQuote = await prisma.quote.update({
      where: { id: quoteId },
      data: {
        text,
        category,
        authorId: authorId ? parseInt(authorId, 10) : undefined
      },
      include: { author: true },
    });
    res.json(updatedQuote);
  } catch (error) {
    if (error.code === 'P2025') {
      return res.status(404).json({ error: 'Quote not found' });
    }
    res.status(500).json({ error: 'Failed to update quote' });
  }
};

const deleteQuote = async (req, res) => {
  const quoteId = parseInt(req.params.id, 10);
  try {
    await prisma.quote.delete({
      where: { id: quoteId },
    });
    res.status(204).send();
  } catch (error) {
    if (error.code === 'P2025') {
      return res.status(404).json({ error: 'Quote not found' });
    }
    res.status(500).json({ error: 'Failed to delete quote' });
  }
};

module.exports = {
  getQuotes,
  getQuoteById,
  createQuote,
  updateQuote,
  deleteQuote
};