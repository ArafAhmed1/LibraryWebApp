import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { getCurrentUserId } from "../../globalUser.js";

const BookCard = ({ book, viewMode }) => {
  const [finishedBooks, setFinishedBooks] = useState([]);
  const currentUserId = getCurrentUserId();

  useEffect(() => {
    const fetchUserFinishedBooks = async () => {
      try {
        const { data } = await axios.get(`/api/users/${currentUserId}`);
        setFinishedBooks(data.finishedBooks);
      } catch (error) {
        console.error("Failed to fetch user data:", error);
      }
    };

    if (currentUserId) {
      fetchUserFinishedBooks();
    }
  }, [currentUserId]);

  const isFinished = finishedBooks.some((finishedBook) => finishedBook.bookId === book._id);

  return (
    <div className={`book-card ${viewMode}`}>
      <Link to={`/book/${book._id}`} className="book-link">
        {viewMode === 'front' ? (
          <img src={book.coverImageLink} alt={book.title} className="book-cover-full" />
        ) : (
          <div className="book-side-view">
            <div className="book-title-vertical">{book.title}</div>
          </div>
        )}
      </Link>
      {isFinished && (
        <div className="finished-indicator">
          <span>&#10003;</span> {/* Green Tick */}
        </div>
      )}
    </div>
  );
};

export default BookCard;
