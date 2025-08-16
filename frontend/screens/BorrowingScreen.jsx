import React from "react";
import BorrowingHistory from "../src/components/BorrowHistory.jsx";
import OverdueNotifications from "../src/components/OverdueNotifications.jsx";
import "../src/styles/BorrowingScreen.css"; // Uncomment if needed

const BorrowingScreen = () => {
  return (
    <div className="borrowing-screen-container">
      <div className="borrowing-screen">
        <h1>My Borrowing Details</h1>
        <div className="borrowing-sections">
          {/* Overdue Notifications Section */}
          <section className="overdue-section">
            {/* <h2>Overdue Notifications</h2> */}
            <OverdueNotifications />
          </section>

          {/* Borrowing History Section */}
          <section className="history-section">
            {/* <h2>Borrowing History</h2> */}
            <BorrowingHistory />
          </section>
        </div>
      </div>
    </div>
  );
};

export default BorrowingScreen;
