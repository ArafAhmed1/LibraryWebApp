import React, { useState, useEffect } from 'react';
import BookCard from './BookCard.jsx';

const BookDisplay = ({ books }) => {
    const [viewMode, setViewMode] = useState('front'); // 'front' or 'side'

    // Function to get the dynamic book width based on the current view mode
    const getBookWidth = (mode) => (mode === 'front' ? 150 : 50);

    // Function to calculate the number of books per row based on view mode
    const calculateBooksPerRow = (mode) =>
        Math.max(1, Math.floor(window.innerWidth / getBookWidth(mode)));

    // State for books per row, initialized based on the initial view mode
    const [booksPerRow, setBooksPerRow] = useState(calculateBooksPerRow(viewMode));

    // Update booksPerRow when the view mode changes
    const handleViewModeChange = (mode) => {
        setViewMode(mode);
        setBooksPerRow(calculateBooksPerRow(mode)); // Recalculate for the new mode
    };

    // Update booksPerRow on window resize
    useEffect(() => {
        const handleResize = () => {
            setBooksPerRow(calculateBooksPerRow(viewMode));
        };

        window.addEventListener('resize', handleResize);
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, [viewMode]); // Dependency on viewMode ensures recalculation for the current mode

    // Organize books into rows based on booksPerRow
    const rows = [];
    for (let i = 0; i < books.length; i += booksPerRow) {
        rows.push(books.slice(i, i + booksPerRow));
    }

    return (
        <div className="book-display">
            <div className="view-toggle">
                <button
                    onClick={() => handleViewModeChange('front')}
                    className={viewMode === 'front' ? 'active' : ''}
                >
                    Front View
                </button>
                <button
                    onClick={() => handleViewModeChange('side')}
                    className={viewMode === 'side' ? 'active' : ''}
                >
                    Side View
                </button>
            </div>
            {rows.map((row, rowIndex) => (
                <div key={rowIndex} className="book-row">
                    {row.map((book, index) => (
                        <BookCard key={index} book={book} viewMode={viewMode} />
                    ))}
                    <div className="shelf-line"></div>
                </div>
            ))}
        </div>
    );
};

export default BookDisplay;
