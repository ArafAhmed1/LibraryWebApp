import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../src/styles/UserDashboard.css';
import { getCurrentUserId } from '../globalUser'; // Import the method to fetch user ID

const UserDashboard = () => {
  const [user, setUser] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [showEditForm, setShowEditForm] = useState(false);
  const [showChangePasswordForm, setShowChangePasswordForm] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '' });
  const [passwordData, setPasswordData] = useState({ currentPassword: '', newPassword: '', confirmPassword: '' });

  // Dynamic greeting based on the time of day
  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good Morning';
    if (hour < 18) return 'Good Afternoon';
    return 'Good Evening';
  };

  // Fetch user profile
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const userId = getCurrentUserId(); // Get the current user's ID
        const { data } = await axios.get(`/api/users/profile/${userId}`);
        setUser(data);
        setFormData({ name: data.name, email: data.email });
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch user data');
        setLoading(false);
      }
    };
    fetchProfile();
  }, []);

  // Handle profile update
  const handleEditProfileSubmit = async (e) => {
    e.preventDefault();
    try {
      const userId = getCurrentUserId();
      const { data } = await axios.put(`/api/users/profile/${userId}`, formData);
      setUser(data);
      setShowEditForm(false);
      alert('Profile updated successfully');
    } catch (err) {
      alert('Failed to update profile');
    }
  };

  // Handle password change
  const handlePasswordChangeSubmit = async (e) => {
    e.preventDefault();
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      alert("New passwords don't match");
      return;
    }
    try {
      const userId = getCurrentUserId();
      await axios.put(`/api/users/change-password/${userId}`, passwordData);
      alert('Password changed successfully');
      setShowChangePasswordForm(false);
      setPasswordData({ currentPassword: '', newPassword: '', confirmPassword: '' });
    } catch (err) {
      alert('Failed to change password');
    }
  };

  // Handle input changes
  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handlePasswordChange = (e) => {
    const { name, value } = e.target;
    setPasswordData((prev) => ({ ...prev, [name]: value }));
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="dashboard-container">
      {/* Welcome Message */}
      <header className="dashboard-header">
        <h1>{getGreeting()}, {user.name}!</h1>
        <p>Welcome back to your dashboard. Here's everything you need at a glance.</p>
      </header>

      {/* Profile Section */}
      <div className="profile-info">
        <h2>Profile Information</h2>
        <p><strong>Name:</strong> {user.name}</p>
        <p><strong>Email:</strong> {user.email}</p>
        <p><strong>Admin Status:</strong> {user.isAdmin ? 'Yes' : 'No'}</p>
        <p><strong>Ban Status:</strong> {user.isBanned ? 'Banned' : 'Active'}</p>
        <p><strong>Account Created:</strong> {new Date(user.createdAt).toLocaleDateString()}</p>
      </div>

      {/* Activity Overview */}
      <div className="activity-overview">
        <h2>Activity Overview</h2>
        <p><strong>Borrowed Books:</strong> {user.borrowedBooks?.length || 0}</p>
        <p><strong>Wishlist Items:</strong> {user.wishlist?.length || 0}</p>
        <p><strong>Finished Reading:</strong> {user.finishedBooks?.length || 0}</p>
      </div>

      {/* Edit Profile and Change Password Buttons */}
      <div className="button-edit-changepass">
        <button onClick={() => setShowEditForm((prev) => !prev)}>
          {showEditForm ? 'Hide Edit Form' : 'Edit Profile'}
        </button>
        <button onClick={() => setShowChangePasswordForm((prev) => !prev)}>
          {showChangePasswordForm ? 'Cancel' : 'Change Password'}
        </button>
      </div>

      {/* Edit Profile Form */}
      {showEditForm && (
        <form className="profile-form" onSubmit={handleEditProfileSubmit}>
          <h2>Edit Profile</h2>
          <div>
            <label>Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleFormChange}
            />
          </div>
          <div>
            <label>Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleFormChange}
            />
          </div>
          <button type="submit">Save Changes</button>
          <button type="button" onClick={() => setShowEditForm(false)}>Cancel</button>
        </form>
      )}

      {/* Change Password Form */}
      {showChangePasswordForm && (
        <form className="password-form" onSubmit={handlePasswordChangeSubmit}>
          <h2>Change Password</h2>
          <div>
            <label>Current Password</label>
            <input
              type="password"
              name="currentPassword"
              value={passwordData.currentPassword}
              onChange={handlePasswordChange}
            />
          </div>
          <div>
            <label>New Password</label>
            <input
              type="password"
              name="newPassword"
              value={passwordData.newPassword}
              onChange={handlePasswordChange}
            />
          </div>
          <div>
            <label>Confirm New Password</label>
            <input
              type="password"
              name="confirmPassword"
              value={passwordData.confirmPassword}
              onChange={handlePasswordChange}
            />
          </div>
          <button type="submit">Change Password</button>
          <button type="button" onClick={() => setShowChangePasswordForm(false)}>Cancel</button>
        </form>
      )}

      {/* Quick Links at the bottom */}
      <div className="quick-navigation">
        <h2>Quick Links</h2>
        <button onClick={() => window.location.href = '/allbooks'}>Explore Books</button>
        <button onClick={() => window.location.href = '/history'}>Borrowing History</button>
        <button onClick={() => window.location.href = '/wishlist-finishRead'}>Wishlist</button>
        {user.isAdmin && (
          <>
            <button onClick={() => window.location.href = '/admin/bookList'}>Manage Books</button>
            <button onClick={() => window.location.href = '/admin/userList'}>User Management</button>
          </>
        )}
      </div>
    </div>
  );
};

export default UserDashboard;
