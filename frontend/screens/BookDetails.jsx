import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import { getCurrentUserId } from "../globalUser";

const BookDetails = () => {
  const { id } = useParams(); // Retrieve the book ID from the URL params
  const [book, setBook] = useState(null); // State to store book details
  const [loading, setLoading] = useState(true); // Loading state
  const [error, setError] = useState(null); // Error state
  const [message, setMessage] = useState(""); // Success/Error message state

  // Fetch book details from backend
  useEffect(() => {
    const fetchBookDetails = async () => {
      try {
        const response = await axios.get(`/api/bookshelf/${id}/details`);
        setBook(response.data); // Set book details to state
        setError(null); // Clear any previous error
      } catch (err) {
        console.error("Error fetching book details:", err);
        setError("Unable to fetch book details. Please try again later.");
      } finally {
        setLoading(false); // Stop loading spinner
      }
    };

    fetchBookDetails();
  }, [id]);

  // Handle Borrow Request
  const handleBorrowRequest = async () => {
    try {
      const response = await axios.post(`/api/borrow`, {
        bookId: id, // ID of the book being borrowed
        userId: getCurrentUserId(), // Replace with the current logged-in user's ID
      });
      setMessage(response.data.message || "Borrow request sent successfully.");
    } catch (err) {
      console.error("Error sending borrow request:", err);
      setMessage("Failed to send borrow request. Please try again.");
    }
  };

  // Handle Add to Wishlist
const handleAddToWishlist = async () => {
  try {
    const response = await axios.post("/api/wishlist", {
      bookId: id,
      userId: getCurrentUserId(), // Fetch current user ID
    });
    setMessage(response.data.message || "Book added to wishlist!");
  } catch (err) {
    console.error("Error adding book to wishlist:", err);
    setMessage("Failed to add book to wishlist. Please try again.");
  }
};


  // Loading state
  if (loading) {
    return <div className="loading">Loading...</div>;
  }

  // Error state
  if (error) {
    return <div className="error">{error}</div>;
  }

  // Render book details
  return (
    <div className="book-details-container">
      <div className="book-info-details">
        <div className="book-cover-container">
          {/* Book Cover Image */}
          <img
            src={book.coverImageLink || "/placeholder.jpg"} // Use placeholder if cover image is missing
            alt={book.title || "Book Cover"}
            className="book-cover"
          />
        </div>

        {/* Book Details Section */}
        <div className="book-details-content">
          <div className="title-author-combo">
            <h1 className="book-title-details">{book.title || "Unknown Title"}</h1>
            <h3 className="book-author-details">{book.author || "Unknown Author"}</h3>
          </div>
          <div className="book-meta">
            <p>
              <strong>Genre:</strong> {book.genre || "N/A"}
            </p>
            <p>
              <strong>Published on:</strong> {book.publishedYear || "N/A"}
            </p>
          </div>

          <div className="book-description">
            <h4>Description:</h4>
            <p>{book.description || "No description available for this book."}</p>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="action-buttons">
        <button className="button" onClick={handleBorrowRequest}>
          Borrow this book
        </button>
        <button className="button" onClick={handleAddToWishlist}>
  Add to Wishlist
</button>

      </div>

      {/* Message Display */}
      {message && <div className="book-details-message">{message}</div>}
    </div>
  );
};

export default BookDetails;
