import { useState, useEffect } from "react";
import axios from "axios";
import '../../src/styles/AdminBorrowRequest.css';

//-> screen/BookDetails ->/admin/`AdminBorrowRequest`
//back: user->server.js, admin->routes/borrowRequestRoutes
const AdminBorrowRequests = () => {
  const [requests, setRequests] = useState([]);
  const [message, setMessage] = useState("");

  useEffect(() => {
    const fetchRequests = async () => {
      try {
        const response = await axios.get("/api/borrowRequests");
        setRequests(response.data);
      } catch (error) {
        console.error("Error fetching borrow requests:", error);
      }
    };
    fetchRequests();
  }, []);

  const handleAction = async (requestId, action) => {
    try {
      await axios.post(`/api/borrowRequests/${requestId}/${action}`);
      setMessage(`Request ${action} successfully!`);
      setRequests(requests.filter((req) => req._id !== requestId));
    } catch (error) {
      console.error(`Error processing request: ${action}`, error);
      setMessage("Failed to process request.");
    }
  };

  if (requests.length === 0) {
    return <div className="no-requests">No pending borrow requests.</div>;
  }

  return (
    <div className="admin-borrow-requests">
      <h1>Borrow Requests</h1>
      {message && <p className="message">{message}</p>}
      <ul className="request-list">
        {requests.map((request) => (
          <li key={request._id} className="request-item">
            <div className="request-details">
              <p>
                <strong>User:</strong>{" "}
                {request.userId
                  ? `${request.userId.name} (${request.userId.email})`
                  : "Unknown User"}
              </p>
              <p>
                <strong>Book Title:</strong> {request.bookId?.title || "Unknown"}
              </p>
              <p>
                <strong>Book Author:</strong> {request.bookId?.author || "Unknown"}
              </p>
              <p>
                <strong>Request Date:</strong>{" "}
                {new Date(request.requestDate).toLocaleDateString()}
              </p>
              <p>
                <strong>Status:</strong>{" "}
                {request.approved ? "Approved" : "Pending"}
              </p>
            </div>
            <div className="action-buttons">
              <button
                className="btn approve-btn"
                onClick={() => handleAction(request._id, "approve")}
              >
                Approve
              </button>
              <button
                className="btn reject-btn"
                onClick={() => handleAction(request._id, "reject")}
              >
                Reject
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AdminBorrowRequests;
