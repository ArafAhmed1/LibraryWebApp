import React, { useState, useEffect } from 'react';
import BookDisplay from './BookDisplay.jsx';

const Bookshelf = () => {
    const [books, setBooks] = useState([]); // State to hold books from backend

    useEffect(() => {
    // Fetch books from backend when the component mounts
        const fetchBooks = async () => {
        try {
            const res = await fetch('/api/bookshelf');
            const data = await res.json();
            setBooks(data); // Set books to the state
        } catch (error) {
            console.error('Error fetching books:', error);
        }
        };

        fetchBooks(); // Call the function to fetch books
    }, []);

    return (
        <div className="bookshelf">
            <BookDisplay books={books} />
        </div>
    );
};

export default Bookshelf;
