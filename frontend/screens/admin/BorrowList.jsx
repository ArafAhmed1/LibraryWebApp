import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../../src/styles/BorrowList.css';

const BorrowList = () => {
  const [borrowedBooks, setBorrowedBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBorrowedBooks = async () => {
      try {
        const { data } = await axios.get('/api/borrowedBooks/all');
        setBorrowedBooks(data);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchBorrowedBooks();
  }, []);

  if (loading) return <p>Loading borrowed books...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="borrowed-books-page">
      <h1>Borrowed Books</h1>
      <table className="borrowed-books-table">
        <thead>
          <tr>
            <th>User Name</th>
            <th>Email</th>
            <th>Book Title</th>
            {/* <th>Borrow Date</th> */}
            <th>Due Date</th>
          </tr>
        </thead>
        <tbody>
          {borrowedBooks.map(user =>
            user.borrowedBooks.map(book => (
              <tr key={book._id}>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>{book.bookId?.title || 'N/A'}</td>
                {/* <td>{new Date(book.borrowDate).toLocaleDateString() || 'N/A'}</td> */}
                <td>{new Date(book.dueDate).toLocaleDateString() || 'N/A'}</td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default BorrowList;
