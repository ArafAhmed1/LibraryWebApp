import React, { useEffect, useState } from "react";
import axios from "axios";
import { Button, Table, Container } from "react-bootstrap";
import { toast, ToastContainer } from "react-toastify";
import { FaEye, FaTrash, FaUser, FaUserShield, FaBan } from "react-icons/fa";
import "react-toastify/dist/ReactToastify.css";
import "../../src/styles/UserList.css"; // Import your custom styles
//. User list. front: screen/admin/UserList. back: user Routes -> user controller

const UserList = () => {
  const [users, setUsers] = useState([]);
  const [selectedUserId, setSelectedUserId] = useState(null);

  const fetchUsers = async () => {
    try {
      const { data } = await axios.get("/api/users");
      setUsers(data);
    } catch (err) {
      toast.error("Failed to load users");
    }
  };

  const showToast = (action, userName) => {
    toast.success(`User "${userName}" has been ${action} successfully!`);
  };

  const showErrorToast = (action, userName) => {
    toast.error(`Failed to ${action} user "${userName}"`);
  };

  const deleteUser = async (id, name) => {
    try {
      await axios.delete(`/api/users/${id}`);
      showToast("deleted", name);
      fetchUsers();
    } catch (err) {
      showErrorToast("delete", name);
    }
  };

  const updateUser = async (id, updates, name, actionDescription) => {
    try {
      await axios.put(`/api/users/${id}`, updates);
      showToast(actionDescription, name);
      fetchUsers();
    } catch (err) {
      showErrorToast(actionDescription, name);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <div className="user-list-page">
      <header className="hero-header">
        <h1>User Management Dashboard</h1>
        <p>Manage users efficiently with ease and precision.</p>
      </header>

      <Container className="mt-4">
        <ToastContainer position="top-right" />
        <Table responsive bordered hover className="user-table">
          <thead>
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>Email</th>
              <th>Admin</th>
              <th>Banned</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, index) => (
              <React.Fragment key={user._id}>
                <tr className="user-row">
                  <td>{index + 1}</td>
                  <td>{user.name}</td>
                  <td>{user.email}</td>
                  <td>{user.isAdmin ? "Yes" : "No"}</td>
                  <td>{user.isBanned ? "Yes" : "No"}</td>
                  <td className="actions-column">
                    <Button
                      variant="info"
                      size="sm"
                      onClick={() =>
                        setSelectedUserId(
                          selectedUserId === user._id ? null : user._id
                        )
                      }
                    >
                      <FaEye />{" "}
                      {selectedUserId === user._id ? "Hide Details" : "View Details"}
                    </Button>{" "}
                    {!user.isGodAdmin && (
                      <>
                        <Button
                          variant="warning"
                          size="sm"
                          onClick={() =>
                            updateUser(
                              user._id,
                              { isBanned: !user.isBanned },
                              user.name,
                              user.isBanned ? "unbanned" : "banned"
                            )
                          }
                        >
                          <FaBan /> {user.isBanned ? "Unban" : "Ban"}
                        </Button>{" "}
                        <Button
                          variant={user.isAdmin ? "secondary" : "success"}
                          size="sm"
                          onClick={() =>
                            updateUser(
                              user._id,
                              { isAdmin: !user.isAdmin },
                              user.name,
                              user.isAdmin
                                ? "revoked admin rights"
                                : "made an admin"
                            )
                          }
                        >
                          <FaUserShield />{" "}
                          {user.isAdmin ? "Revoke Admin" : "Make Admin"}
                        </Button>{" "}
                        <Button
                          variant="danger"
                          size="sm"
                          onClick={() => deleteUser(user._id, user.name)}
                        >
                          <FaTrash /> Delete
                        </Button>
                      </>
                    )}
                    {user.isGodAdmin && (
                      <span style={{ color: "red", fontWeight: "bold" }}>
                        Protected User
                      </span>
                    )}
                  </td>
                </tr>
                {selectedUserId === user._id && (
                  <tr>
                    <td colSpan="6">
                      <strong>Details:</strong>
                      <ul>
                        <li>ID: {user._id}</li>
                        <li>Name: {user.name}</li>
                        <li>Email: {user.email}</li>
                        <li>Admin: {user.isAdmin ? "Yes" : "No"}</li>
                        <li>Banned: {user.isBanned ? "Yes" : "No"}</li>
                        <li>
                          Created At: {new Date(user.createdAt).toLocaleString()}
                        </li>
                      </ul>
                    </td>
                  </tr>
                )}
              </React.Fragment>
            ))}
          </tbody>
        </Table>
      </Container>
    </div>
  );
};

export default UserList;
