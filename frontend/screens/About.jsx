import React from 'react';
import '../src/styles/About.css';

const AboutPage = () => {
  return (
    <div className="about-page">
      <header className="about-header">
        <h1>About the Library Website</h1>
        <p>Learn how our website helps you connect with books and resources.</p>
      </header>

      <section className="about-section">
        <div className="about-image">
          <img src="https://pics.craiyon.com/2023-11-07/331bc7aee1b84bff94c978a5dda6391b.webp" alt="Library Website" />
        </div>
        <div className="about-info">
          <br></br>
          <br></br>
          <br></br>
          <h2>About the Library WebApp</h2>
          <p>
            The Library WebApp is your digital gateway to our collection. You can browse available books, view details, borrow and return books, track your reading history, and receive notifications for overdue items. The website is designed to be user-friendly, secure, and accessible from any device.
          </p>
          <ul>
            <li>Browse and search books by title, author, or genre</li>
            <li>Borrow and return books online</li>
            <li>Track your reading progress and history</li>
            <li>Receive notifications for overdue books</li>
            <li>Access digital resources and PDF readers</li>
          </ul>
        </div>
      </section>

      <footer className="about-footer">
        <p>&copy; 2025 Library WebApp. All Rights Reserved.</p>
      </footer>
    </div>
  );
};

export default AboutPage;
