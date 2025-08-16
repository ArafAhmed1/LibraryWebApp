import { useState, useEffect } from "react";
import axios from "axios";
import { getCurrentUserId } from "../globalUser";
import '../src/styles/UserWishlistAndFinishRead.css';

const UserBookshelf = () => {
  const [wishlist, setWishlist] = useState([]);
  const [finishedBooks, setFinishedBooks] = useState([]);

  // Fetch books data
  const fetchUserBooks = async () => {
    try {
      const userId = getCurrentUserId();
      const response = await axios.get(`/api/users/${userId}/books`);
      setWishlist(response.data.wishlist || []);
      setFinishedBooks(response.data.finishedBooks || []);
    } catch (err) {
      console.error("Error fetching user books:", err);
    }
  };

  useEffect(() => {
    fetchUserBooks();
  }, []);

  // Remove book from wishlist
  const removeFromWishlist = async (bookId) => {
    try {
      const userId = getCurrentUserId();
      await axios.post("/api/wishlist/remove", { bookId, userId });
      setWishlist(wishlist.filter((book) => book._id !== bookId));
    } catch (err) {
      console.error("Error removing from wishlist:", err);
    }
  };

  // Add book to finished reading
  const addToFinishedReading = async (bookId) => {
    try {
      const userId = getCurrentUserId();
      const response = await axios.post("/api/finished-reading", { bookId, userId });
      const addedFinishedBook = response.data[response.data.length - 1]; 

      setWishlist((prevWishlist) => prevWishlist.filter((book) => book._id !== bookId));
      setFinishedBooks((prevFinishedBooks) => {
        const isBookAlreadyInFinished = prevFinishedBooks.some(
          (book) => book.bookId._id === addedFinishedBook.bookId._id
        );
        if (!isBookAlreadyInFinished) {
          return [...prevFinishedBooks, addedFinishedBook];
        }
        return prevFinishedBooks;
      });
    } catch (err) {
      console.error("Error adding to finished reading:", err);
    }
  };

  // Remove book from finished reading
  const removeFromFinishedReading = async (bookId) => {
    try {
      const userId = getCurrentUserId();
      await axios.post("/api/finished-reading/remove", { bookId, userId });
      setFinishedBooks(finishedBooks.filter((book) => book.bookId._id !== bookId));
    } catch (err) {
      console.error("Error removing from finished reading:", err);
    }
  };

  return (
    <div className="user-bookshelf">
      <h2>Your Books</h2>

      {/* Wishlist Section */}
      <div className="wishlist-section">
        <h3>Wishlist</h3>
        {wishlist.length === 0 ? (
          <p>Your wishlist is empty.</p>
        ) : (
          <ul>
            {wishlist.map((book) => (
              <li key={book._id} className="book-item">
                <img src={book.coverImageLink} alt={book.title} className="book-cover" />
                <div className="book-info">
                  <p>{book.title} by {book.author}</p>
                  <button onClick={() => removeFromWishlist(book._id)}>Remove from Wishlist</button>
                  <button onClick={() => addToFinishedReading(book._id)}>Add to Finished Reading</button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* Finished Books Section */}
      <div className="finished-books-section">
        <h3>Finished Reading</h3>
        {finishedBooks.length === 0 ? (
          <p>You haven't finished any books yet.</p>
        ) : (
          <ul>
            {finishedBooks.map((finishedBook) => (
              <li key={finishedBook._id} className="book-item">
                <img src={finishedBook.bookId.coverImageLink} alt={finishedBook.bookId.title} className="book-cover" />
                <div className="book-info">
                  <p>{finishedBook.bookId.title} by {finishedBook.bookId.author}</p>
                  <p>Finished At: {new Date(finishedBook.finishedAt).toLocaleDateString()}</p>
                  <button onClick={() => removeFromFinishedReading(finishedBook.bookId._id)}>Remove from List</button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default UserBookshelf;
