import React, { useEffect, useState } from "react";
import axios from "axios";
import { getCurrentUserId } from "../globalUser";
import '../src/styles/UserBorrowedBooks.css';  // Import the external CSS file

const UserBorrowedBooks = () => {
  const [overdueBooks, setOverdueBooks] = useState([]);
  const [nonOverdueBooks, setNonOverdueBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [returnRequests, setReturnRequests] = useState({});

  useEffect(() => {
    const fetchBorrowedBooks = async () => {
      const userId = getCurrentUserId();
      try {
        const { data } = await axios.get(`/api/borrowed-books/${userId}`);
        const overdueBooks = [];
        const nonOverdueBooks = [];

        data.forEach(({ bookId, dueDate, isReturned, returnRequest }) => {
          if (new Date(dueDate) < new Date() && !isReturned) {
            overdueBooks.push({ bookId, dueDate, returnRequest });
          } else if (!isReturned) {
            nonOverdueBooks.push({ bookId, dueDate, returnRequest });
          }
        });

        setOverdueBooks(overdueBooks);
        setNonOverdueBooks(nonOverdueBooks);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching borrowed books:", err);
        setError("Failed to load borrowed books.");
        setLoading(false);
      }
    };

    // Load return request state from localStorage
    const storedReturnRequests = JSON.parse(localStorage.getItem("returnRequests")) || {};
    setReturnRequests(storedReturnRequests);

    fetchBorrowedBooks();
  }, []);

  const handleReturnRequest = async (bookId) => {
    const userId = getCurrentUserId();
    try {
      console.log("Sending data:", { userId, bookId });
      
      // Send a POST request to create a return request
      const response = await axios.post("/api/return-request", { userId, bookId });
  
      alert(response.data.message); // Success message

      // Update the returnRequests state to mark this book as pending approval
      setReturnRequests((prev) => {
        const newReturnRequests = { ...prev, [bookId]: "pending" }; // Mark as pending
        // Persist the new state in localStorage
        localStorage.setItem("returnRequests", JSON.stringify(newReturnRequests));
        return newReturnRequests;
      });

    } catch (error) {
      console.error("Error returning book:", error.response ? error.response.data : error);
      alert(error.response?.data?.message || "Failed to return the book.");
    }
  };

  // const handleRejectRequest = (bookId) => {
  //   // Reset the return request status after rejection
  //   setReturnRequests((prev) => {
  //     const newReturnRequests = { ...prev, [bookId]: "rejected" };
  //     // Update localStorage
  //     localStorage.setItem("returnRequests", JSON.stringify(newReturnRequests));
  //     return newReturnRequests;
  //   });
  // };

  // const handleApproveRequest = (bookId) => {
  //   // Mark as approved (optional)
  //   setReturnRequests((prev) => {
  //     const newReturnRequests = { ...prev, [bookId]: "approved" };
  //     // Update localStorage
  //     localStorage.setItem("returnRequests", JSON.stringify(newReturnRequests));
  //     return newReturnRequests;
  //   });
  // };

  if (loading) return <p>Loading borrowed books...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="user-borrowed-books">
      <h2>Borrowed Books</h2>

      <div className="user-borrowed-books-section">
        <h3>Overdue Books</h3>
        {overdueBooks.length === 0 ? (
          <p>No overdue books.</p>
        ) : (
          <ul className="user-borrowed-books-list">
            {overdueBooks.map(({ bookId, dueDate }) => (
              <li key={bookId._id} className="user-borrowed-book-item">
                <img src={bookId.coverImageLink} alt={bookId.title} width={50} />
                <p>
                  <strong>{bookId.title}</strong> by {bookId.author}
                </p>
                <p>Due Date: {new Date(dueDate).toLocaleDateString()}</p>
                {/* Show "Pending Admin Approval", "Rejected", or "Approved" */}
                {returnRequests[bookId._id] === "pending" ? (
                  <p>Pending Admin Approval</p>
                ) : returnRequests[bookId._id] === "rejected" ? (
                  <>
                    <p>Return Request Rejected</p>
                    <button onClick={() => handleReturnRequest(bookId._id)}>Request Return Again</button>
                  </>
                ) : returnRequests[bookId._id] === "approved" ? (
                  <p>Return Approved</p>
                ) : (
                  <button onClick={() => handleReturnRequest(bookId._id)}>Return Book</button>
                )}
              </li>
            ))}
          </ul>
        )}
      </div>

      <div className="user-borrowed-books-section">
        <h3>Other Borrowed Books</h3>
        {nonOverdueBooks.length === 0 ? (
          <p>No other borrowed books.</p>
        ) : (
          <ul className="user-borrowed-books-list">
            {nonOverdueBooks.map(({ bookId, dueDate }) => (
              <li key={bookId._id} className="user-borrowed-book-item">
                <img src={bookId.coverImageLink} alt={bookId.title} width={50} />
                <p>
                  <strong>{bookId.title}</strong> by {bookId.author}
                </p>
                <p>Due Date: {new Date(dueDate).toLocaleDateString()}</p>
                {/* Show "Pending Admin Approval", "Rejected", or "Approved" */}
                {returnRequests[bookId._id] === "pending" ? (
                  <p>Pending Admin Approval</p>
                ) : returnRequests[bookId._id] === "rejected" ? (
                  <>
                    <p>Return Request Rejected</p>
                    <button onClick={() => handleReturnRequest(bookId._id)}>Request Return Again</button>
                  </>
                ) : returnRequests[bookId._id] === "approved" ? (
                  <p>Return Approved</p>
                ) : (
                  <button onClick={() => handleReturnRequest(bookId._id)}>Return Book</button>
                )}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default UserBorrowedBooks;
