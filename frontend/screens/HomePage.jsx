import React, { useState, useEffect } from 'react';
import BookDisplay from '../src/components/BookDisplay.jsx';
import SearchBar from '../src/components/SearchBar.jsx';
import '../src/styles/HomePage.css';

const HomePage = () => {
    const [books, setBooks] = useState([]); // State to hold books from backend

    useEffect(() => {
    // Fetch books from backend when the component mounts
        const fetchBooks = async () => {
        try {
            const res = await fetch('/api');
            const data = await res.json();
            setBooks(data); // Set books to the state
        } catch (error) {
            console.error('Error fetching books:', error);
        }
        };

        fetchBooks(); // Call the function to fetch books
    }, []);

    return (
        <>
        <h1 class="home-welcome">Ready to dive into a new adventure? Find your next favorite book today!</h1>
        {/* <SearchBar /> */}
        <div className="bookshelf">
        <h1 className="bookshelf-title">Our Newest Arrivals!</h1>
            <BookDisplay books={books} />
        </div>
        </>
    );
};

export default HomePage;
