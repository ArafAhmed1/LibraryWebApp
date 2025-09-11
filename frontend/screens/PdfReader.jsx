import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import axios from "axios";
import "../src/styles/PdfReader.css";
import { getCurrentUserId } from "../globalUser";

const PdfReader = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [book, setBook] = useState(null);
  const [pdfLoading, setPdfLoading] = useState(true);
  const iframeRef = useRef(null);
  const API_URL = import.meta.env.VITE_API_URL;

  useEffect(() => {
    const fetchBook = async () => {
      try {
        const response = await axios.get(`${API_URL}/api/bookshelf/${id}`);
        setBook(response.data);
      } catch (error) {
        console.error("Error fetching book data:", error);
      }
    };

    fetchBook();
  }, [id]);


  const [iframeSize, setIframeSize] = useState({ width: 0, height: 0 });
  const adjustIframeSize = () => {
    const viewportWidth = window.innerWidth;
    const viewportHeight = window.innerHeight;

    const containerHeight = viewportHeight * 0.9; // 90% of viewport height
    const containerWidth = viewportWidth * 0.9;  // 90% of viewport width

    const aspectRatio = 8.5 / 11; // US Letter aspect ratio

    let width, height;
    if (containerWidth / containerHeight > aspectRatio) {
      height = containerHeight;
      width = containerHeight * aspectRatio;
    } else {
      width = containerWidth;
      height = containerWidth / aspectRatio;
    }
    setIframeSize({ width, height });
    if (iframeRef.current) {
      iframeRef.current.style.width = `${width}px`;
      iframeRef.current.style.height = `${height}px`;
    }
  };

  useEffect(() => {
    adjustIframeSize(); // Adjust size on component mount
    window.addEventListener("resize", adjustIframeSize); // Re-adjust on window resize

    return () => window.removeEventListener("resize", adjustIframeSize); // Clean up event listener
  }, []);

  const handleGoBack = () => {
    navigate(-1); // Go back to the previous page
  };

  const handleBookDetails = () => {
    navigate(`/book/${book._id}/details`);
  };


  async function handleFinishedReading() {
    try {
      const response = await axios.post(`${API_URL}/api/finished-reading`, {
        bookId: id,
        userId: getCurrentUserId(), // Fetch current user ID
      });
      alert(response.data.message || "Book marked as finished!");
    } catch (err) {
      console.error("Error marking book as finished:", err);
      alert("Failed to mark book as finished. Please try again.");
    }
  }

  if (!book) {
    return <div>Loading...</div>;
  }

  return (
    <div className="pdf-reader-container">
      {/* Book Title and Author */}
      <div className="book-info">
        <h2>{book.title}</h2>
        <h3>{book.author}</h3>
      </div>

      {/* PDF Viewer */}
      <div
        className="iframe-container"
        style={{
          position: 'relative',
          width: `${iframeSize.width}px`,
          height: `${iframeSize.height}px`,
          margin: '0 auto',
        }}
      >
        <iframe
          ref={iframeRef}
          src={book.pdfLink}
          title="PDF Viewer"
          onLoad={() => {
            adjustIframeSize();
            setPdfLoading(false);
          }}
          style={{ zIndex: 1, width: '100%', height: '100%', display: 'block' }}
        ></iframe>
        {pdfLoading && (
          <div
            className="pdf-loading-splash"
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: `${iframeSize.width}px`,
              height: `${iframeSize.height}px`,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              background: 'rgba(255,255,255,0.8)',
              zIndex: 2,
            }}
          >
            <span style={{ fontSize: '2rem', fontWeight: 'bold' }}>Loading PDF...</span>
          </div>
        )}
      </div>

      {/* Buttons Section */}
      <div className="buttons-section">
        <button onClick={handleGoBack} className="button">
          Go Back
        </button>
        <button onClick={handleBookDetails} className="button">
          Book Details
        </button>
        <button onClick={handleFinishedReading} className="button">
          Mark Finished Reading
        </button>
      </div>
    </div>
  );
};

export default PdfReader;
