import React, { useState, useEffect } from 'react';
import BookDisplay from '../src/components/BookDisplay.jsx';
import SearchBar from '../src/components/SearchBar.jsx';

const AllBooks = () => {
  const [books, setBooks] = useState([]); // State to hold books from the backend
  const [filteredBooks, setFilteredBooks] = useState([]); // State for filtered books
  const [loading, setLoading] = useState(true); // Loading state
  const [error, setError] = useState(null); // Error state
  const [isSearching, setIsSearching] = useState(false); // State to track if a search is active

  useEffect(() => {
    // Fetch books from the backend
    const fetchBooks = async () => {
      try {
        const res = await fetch('/api/bookshelf'); // Replace with your API endpoint
        if (!res.ok) {
          throw new Error('Failed to fetch books');
        }
        const data = await res.json();
        setBooks(data);
        setFilteredBooks(data); // Initially set filteredBooks to all books
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchBooks();
  }, []);

  const handleSearch = (query) => {
    const lowerCaseQuery = query.toLowerCase();
    const results = books.filter(
      (book) =>
        book.title.toLowerCase().includes(lowerCaseQuery) ||
        book.author.toLowerCase().includes(lowerCaseQuery) ||
        book.genre.toLowerCase().includes(lowerCaseQuery)
    );
    setFilteredBooks(results);
    setIsSearching(true); // Mark search as active
  };


  if (loading) {
    return <div>Loading books...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <>
      <SearchBar onSearch={handleSearch} />
      <div className="bookshelf">
        {/* <h1 className="bookshelf-title">
          {isSearching ? 'Search Result...' : 'All Books'}
        </h1> */}
        <BookDisplay books={filteredBooks} />
      </div>
    </>
  );
};

export default AllBooks;


