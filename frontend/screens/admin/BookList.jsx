import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../../src/styles/BookList.css';
//Book list. front: screen/admin/BookList back: adminRoutes

const AdminBookList = () => {
  const [books, setBooks] = useState([]);
  const [newBook, setNewBook] = useState({
    title: '',
    author: '',
    genre: '',
    publishedYear: '',
    description: '',
    availableCopies: '',
    totalCopies: '',
    categories: '',
    pdfLink: '',
    coverImageLink: ''
  });
  const [showForm, setShowForm] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editBookId, setEditBookId] = useState(null);

  // Fetch books from the server
  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const response = await axios.get('/api/admin/books');
        setBooks(response.data); // Assuming the response contains the list of books
      } catch (error) {
        console.error('Error fetching books:', error);
      }
    };

    fetchBooks();
  }, []);

  // Add a new book
  const handleAddBook = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('/api/admin/books', newBook);
      setBooks([...books, response.data]); // Add the new book to the list
      setNewBook({
        title: '',
        author: '',
        genre: '',
        publishedYear: '',
        description: '',
        availableCopies: '',
        totalCopies: '',
        categories: '',
        pdfLink: '',
        coverImageLink: ''
      });
      setShowForm(false); // Hide the form after adding
    } catch (error) {
      console.error('Error adding book:', error);
    }
  };

  // Edit a book
  const handleEditBook = (book) => {
    setNewBook({
      title: book.title,
      author: book.author,
      genre: book.genre,
      publishedYear: book.publishedYear,
      description: book.description,
      availableCopies: book.availableCopies,
      totalCopies: book.totalCopies,
      categories: book.categories,
      pdfLink: book.pdfLink,
      coverImageLink: book.coverImageLink
    });
    setIsEditing(true);
    setEditBookId(book._id);
    setShowForm(true); // Show the form for editing
  
    // Scroll to the top
    window.scrollTo({ top: 200, behavior: 'smooth' });
  };
  

  // Update the book details
  const handleUpdateBook = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.put(
        `/api/admin/books/${editBookId}`,
        newBook
      );
      setBooks(
        books.map((book) =>
          book._id === editBookId ? { ...book, ...response.data } : book
        )
      );
      setNewBook({
        title: '',
        author: '',
        genre: '',
        publishedYear: '',
        description: '',
        availableCopies: '',
        totalCopies: '',
        categories: '',
        pdfLink: '',
        coverImageLink: ''
      });
      setShowForm(false);
      setIsEditing(false);
      setEditBookId(null);
    } catch (error) {
      console.error('Error updating book:', error);
    }
  };

  // Delete a book
  const handleDeleteBook = async (bookId) => {
    try {
      const response = await axios.delete(`/api/admin/books/${bookId}`);
      if (response.status === 200) {
        setBooks(books.filter((book) => book._id !== bookId));
      }
    } catch (error) {
      console.error('Error deleting book:', error);
    }
  };

  return (
    <div className="admin-container">
      <h2>Admin Dashboard</h2>
      <p>Welcome to the admin dashboard! You can add, edit, or delete books from the library.</p>

      <div className="add-book-section">
        <p className="add-book-description">Want to add a new book to the library?</p>
        <button className="add-book-button" onClick={() => setShowForm(!showForm)}>
          {showForm ? 'Cancel' : 'Add Book'}
        </button>
      </div>

      {showForm && (
        <form className="add-book-form" onSubmit={isEditing ? handleUpdateBook : handleAddBook}>
          <h3>{isEditing ? 'Edit Book' : 'Add a New Book'}</h3>
          <input
            type="text"
            value={newBook.title}
            onChange={(e) => setNewBook({ ...newBook, title: e.target.value })}
            placeholder="Title"
          />
          <input
            type="text"
            value={newBook.author}
            onChange={(e) => setNewBook({ ...newBook, author: e.target.value })}
            placeholder="Author"
          />
          <input
            type="text"
            value={newBook.genre}
            onChange={(e) => setNewBook({ ...newBook, genre: e.target.value })}
            placeholder="Genre"
          />
          <input
            type="number"
            value={newBook.publishedYear}
            onChange={(e) => setNewBook({ ...newBook, publishedYear: e.target.value })}
            placeholder="Published Year"
          />
          <textarea
            value={newBook.description}
            onChange={(e) => setNewBook({ ...newBook, description: e.target.value })}
            placeholder="Description"
          ></textarea>
          <input
            type="number"
            value={newBook.availableCopies}
            onChange={(e) => setNewBook({ ...newBook, availableCopies: e.target.value })}
            placeholder="Available Copies"
          />
          <input
            type="number"
            value={newBook.totalCopies}
            onChange={(e) => setNewBook({ ...newBook, totalCopies: e.target.value })}
            placeholder="Total Copies"
          />
          <input
            type="text"
            value={newBook.categories}
            onChange={(e) => setNewBook({ ...newBook, categories: e.target.value })}
            placeholder="Categories"
          />
          <input
            type="text"
            value={newBook.pdfLink}
            onChange={(e) => setNewBook({ ...newBook, pdfLink: e.target.value })}
            placeholder="PDF Link"
          />
          <input
            type="text"
            value={newBook.coverImageLink}
            onChange={(e) => setNewBook({ ...newBook, coverImageLink: e.target.value })}
            placeholder="Cover Image Link"
          />
          <div className="form-actions">
            <button type="submit" className="save-button">
              {isEditing ? 'Update Book' : 'Save Book'}
            </button>
            <button type="button" className="cancel-button" onClick={() => setShowForm(false)}>
              Cancel
            </button>
          </div>
        </form>
      )}

      {/* <h3>All Books</h3> */}
      <table className="book-table">
        <thead>
          <tr>
            <th>Title</th>
            <th>Author</th>
            <th>Genre</th>
            <th>Published Year</th>
            <th>Available Copies</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {books.length > 0 ? (
            books.map((book) => (
              <tr key={book._id}>
                <td>{book.title}</td>
                <td>{book.author}</td>
                <td>{book.genre}</td>
                <td>{book.publishedYear}</td>
                <td>{book.availableCopies}</td>
                <td>
                  <button className="edit-button-bookList" onClick={() => handleEditBook(book)}>
                    Edit
                  </button>
                  <button className="delete-button-bookList" onClick={() => handleDeleteBook(book._id)}>
                    Delete
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="6">No books available</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default AdminBookList;
