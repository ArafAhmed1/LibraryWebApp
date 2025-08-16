import express from 'express';
import Book from '../models/Book.js';

const router = express.Router();

// 1. View all books
router.get('/books', async (req, res) => {
  try {
    const books = await Book.find();
    res.json(books);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching books', error: err });
  }
});

// 2. Add a new book
router.post('/books', async (req, res) => {
  const {
    title,
    author,
    genre,
    publishedYear,
    description,
    availableCopies,
    totalCopies,
    categories,
    pdfLink,
    coverImageLink,
  } = req.body;

  try {
    const newBook = new Book({
      title,
      author,
      genre,
      publishedYear,
      description,
      availableCopies,
      totalCopies,
      categories,
      pdfLink,
      coverImageLink,
    });

    await newBook.save();
    res.status(201).json(newBook);
  } catch (err) {
    res.status(500).json({ message: 'Error adding book', error: err });
  }
});

// 3. Edit an existing book
router.put('/books/:id', async (req, res) => {
  const {
    title,
    author,
    genre,
    publishedYear,
    description,
    availableCopies,
    totalCopies,
    categories,
    pdfLink,
    coverImageLink,
  } = req.body;

  try {
    const updatedBook = await Book.findByIdAndUpdate(
      req.params.id,
      {
        title,
        author,
        genre,
        publishedYear,
        description,
        availableCopies,
        totalCopies,
        categories,
        pdfLink,
        coverImageLink,
      },
      { new: true }
    );

    res.json(updatedBook);
  } catch (err) {
    res.status(500).json({ message: 'Error editing book', error: err });
  }
});

// 4. Delete a book
router.delete('/books/:id', async (req, res) => {
    try {
      const bookId = req.params.id.trim(); // Remove extra spaces/newlines
      console.log("Book ID to delete:", bookId);
  
      const book = await Book.findById(bookId);
      if (!book) {
        console.log("Book not found");
        return res.status(404).json({ message: 'Book not found' });
      }
  
      await Book.findByIdAndDelete(bookId); // Use findByIdAndDelete for simplicity
      console.log("Book deleted");
      res.json({ message: 'Book deleted' });
    } catch (err) {
      console.error('Error deleting book:', err);
      res.status(500).json({ message: 'Error deleting book', error: err });
    }
  });
  
  // import express from 'express';

// const router = express.Router();

// Get all users
// router.route('/users').get(getAllUsers);

// // Delete a user
// router.route('/users/:id').delete(deleteUser);

// // Update user role (e.g., make admin)
// router.route('/users/:id/role').put(updateUserRole);

// // Ban or unban a user
// router.route('/users/:id/ban').put(banUser);

// // export default router;




export default router;
