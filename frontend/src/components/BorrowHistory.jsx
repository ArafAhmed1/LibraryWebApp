import React, { useState, useEffect } from "react";
import { getCurrentUserId } from '/globalUser.js';
 // Assuming this file contains getCurrentUserId()

const BorrowingHistory = () => {
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const API_URL = import.meta.env.VITE_API_URL;


  useEffect(() => {
    const fetchHistory = async () => {
      const userId = getCurrentUserId();
      try {
        const response = await fetch(`${API_URL}/api/borrow/history/${userId}`);
        const data = await response.json();
        setHistory(data.borrowingHistory);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching borrowing history:", error);
        setLoading(false);
      }
    };

    fetchHistory();
  }, []);

  if (loading) return <p>Loading...</p>;

  return (
    <div>
      <h2>Borrowing History</h2>
      <ul>
        {history.map((entry, index) => (
          <li key={index}>
            <strong>{entry.bookTitle}</strong> by {entry.author}
            <br />
            Due Date: {new Date(entry.dueDate).toLocaleDateString()}
            {entry.overdue && <span style={{ color: "red" }}> (Overdue)</span>}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default BorrowingHistory;
