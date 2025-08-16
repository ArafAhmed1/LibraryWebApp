import React, { useState, useEffect } from "react";
import { getCurrentUserId } from '../../globalUser.js';

const OverdueNotifications = () => {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchNotifications = async () => {
      const userId = getCurrentUserId();
      try {
        const response = await fetch(`/api/borrow/notifications/${userId}`);
        const data = await response.json();
        setNotifications(data.overdueNotifications);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching notifications:", error);
        setLoading(false);
      }
    };

    fetchNotifications();
  }, []);

  if (loading) return <p>Loading...</p>;

  if (notifications.length === 0) {
    return <p>No overdue books.</p>;
  }

  return (
    <div>
      <h2>Overdue Notifications</h2>
      <ul>
        {notifications.map((entry, index) => (
          <li key={index}>
            <strong>{entry.bookTitle}</strong>
            <br />
            Due Date: {new Date(entry.dueDate).toLocaleDateString()}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default OverdueNotifications;
