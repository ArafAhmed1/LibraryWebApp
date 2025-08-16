import React, { useEffect, useState } from "react";
import axios from "axios";
import '../../src/styles/AdminReturnRequests.css';

const AdminReturnRequests = () => {
  const [returnRequests, setReturnRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchReturnRequests = async () => {
      try {
        const { data } = await axios.get("/api/return-requests");
        setReturnRequests(data);
        setLoading(false);
      } catch (err) {
        setError("Failed to load return requests.");
        setLoading(false);
      }
    };

    fetchReturnRequests();
  }, []);

  const handleApproveReturn = async (id) => {
    try {
      // Approve the return by making the API call
      const response = await axios.put(`/api/return-requests/${id}/approve`);
      
      if (response.status === 200) {
        alert("Return request approved!");

        // Remove the request from the UI
        setReturnRequests((prev) => prev.filter((request) => request._id !== id));
      } else {
        alert("Failed to approve return request.");
      }
    } catch (err) {
      console.error('Error details:', err.response ? err.response.data : err.message);
      alert("Failed to approve return request.");
    }
  };

  const handleRejectReturn = async (id) => {
    try {
      const response = await axios.delete(`/api/return-requests/${id}/reject`);
      
      if (response.status === 200) {
        alert("Return request rejected!");
        setReturnRequests((prev) => prev.filter((request) => request._id !== id));
      }
    } catch (err) {
      alert("Failed to reject return request.");
      console.error(err); // Log error for debugging
    }
  };

  if (loading) return <p>Loading return requests...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="admin-return-requests">
      <h2>Return Requests</h2>
      <ul>
        {returnRequests.map(({ _id, userId, bookId }) => (
          <li key={_id}>
            <img src={bookId.coverImageLink} alt={bookId.title} width={50} />
            <p>
              <strong>{bookId.title}</strong> by {bookId.author}
            </p>
            <p>Requested by: {userId?.name || "Unknown User"}</p>

            <button onClick={() => handleApproveReturn(_id)}>Approve</button>
            <button onClick={() => handleRejectReturn(_id)}>Reject</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AdminReturnRequests;
