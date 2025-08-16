import React, { useState } from 'react';

const SearchBar = ({ onSearch }) => {
  const [query, setQuery] = useState('');

  const handleInputChange = (e) => {
    setQuery(e.target.value);
    onSearch(e.target.value); // Update search results as user types
  };

  const handleClearSearch = () => {
    setQuery('');
    onSearch(''); // Reset search results
  };

  return (
    <div
      className="search-bar-container"
      style={{
        position: 'relative',
        width: '100%',
        maxWidth: '700px', // Increased maxWidth for a larger bar
        margin: '20px auto', // Added margin-top for space from navbar
      }}
    >
      <input
        type="text"
        value={query}
        onChange={handleInputChange}
        className="form-control"
        placeholder="Search by title, author, or genre..."
        style={{
          width: '100%',
          padding: '15px 50px 15px 25px', // Bigger padding for size
          borderRadius: '30px', // Rounder corners
          fontSize: '18px', // Larger text size
          border: '1px solid #ccc',
          boxShadow: '0 3px 6px rgba(0, 0, 0, 0.1)',
        }}
      />
      {query && (
        <button
          onClick={handleClearSearch}
          style={{
            position: 'absolute',
            right: '20px', // Adjusted for larger padding
            top: '50%',
            transform: 'translateY(-50%)',
            border: 'none',
            background: 'transparent',
            cursor: 'pointer',
            fontSize: '20px', // Larger close icon
            color: 'gray',
          }}
          aria-label="Clear search"
        >
          ×
        </button>
      )}
    </div>
  );
};

export default SearchBar;
