const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const getAuthors = async (req, res) => {
  try {
    const authors = await prisma.author.findMany();
    res.json(authors);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch authors..' });
  }
};

const getAuthorById = async (req, res) => {
  const authorId = parseInt(req.params.id, 10);
  try {
    const author = await prisma.author.findUnique({
      where: { id: authorId },
    });
    if (!author) {
      return res.status(404).json({ error: 'Author not found' });
    }
    res.json(author);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch author' });
  }
};

// const createAuthor = async (req, res) => {
//   const { name, picture } = req.body;
//   try {
//     const newAuthor = await prisma.author.create({
//       data: { name, picture },
//     });
//     res.status(201).json(newAuthor);
//   } catch (error) {
//     res.status(500).json({ error: 'Failed to create author' });
//   }
// };

const createAuthor = async (req, res) => {
  const { name, picture } = req.body;
  const userId = req.user.userId;
  console.log(req);
  try {
    const newAuthor = await prisma.author.create({
      // data: { name, picture, createdBy: userId },
      data: { name, picture },
    });
    res.status(201).json(newAuthor);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Failed to create author' });
  }
};

const updateAuthor = async (req, res) => {
  const authorId = parseInt(req.params.id, 10);
  const { name, picture } = req.body;
  try {
    const updatedAuthor = await prisma.author.update({
      where: { id: authorId },
      data: { name, picture },
    });
    res.json(updatedAuthor);
  } catch (error) {
    if (error.code === 'P2025') {
      return res.status(404).json({ error: 'Author not found' });
    }
    res.status(500).json({ error: 'Failed to update author' });
  }
};

const deleteAuthor = async (req, res) => {
  const authorId = parseInt(req.params.id, 10);
  try {
    await prisma.author.delete({
      where: { id: authorId },
    });
    res.status(204).send();
  } catch (error) {
    if (error.code === 'P2025') {
      return res.status(404).json({ error: 'Author not found' });
    }
    res.status(500).json({ error: 'Failed to delete author' });
  }
};

module.exports = {
  getAuthors,
  getAuthorById,
  createAuthor,
  updateAuthor,
  deleteAuthor
};