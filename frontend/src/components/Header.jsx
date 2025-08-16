import React, { useState, useEffect, useRef } from 'react';
import {
  Navbar,
  Nav,
  Container,
  NavDropdown,
  Badge,
} from 'react-bootstrap';
import {
  FaBook,
  FaSignInAlt,
  FaUser,
  FaFileAlt,
  FaInfoCircle,
  FaList,
  FaBell,
} from 'react-icons/fa';
import { useNavigate, Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { useLogoutMutation } from '../slices/usersApiSlice';
import { logout } from '../slices/authSlice';
import { clearCurrentUserId, getCurrentUserId } from '../../globalUser';

const Header = () => {
  const [overdueBooks, setOverdueBooks] = useState([]);
  const [showNotification, setShowNotification] = useState(false);
  const [isNavOpen, setIsNavOpen] = useState(false); // State to control navbar collapse
  const [isUserDropdownOpen, setIsUserDropdownOpen] = useState(false); // State to control user dropdown
  const [isAdminDropdownOpen, setIsAdminDropdownOpen] = useState(false); // State to control admin dropdown

  const { userInfo } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [logoutApiCall] = useLogoutMutation();

  const notificationRef = useRef(null);
  const navbarRef = useRef(null); // Reference for the entire navbar

  // Logout handler
  const logoutHandler = async () => {
    try {
      await logoutApiCall().unwrap();
      dispatch(logout());
      clearCurrentUserId();
      setOverdueBooks([]); // Clear overdue books on logout
      navigate('/');
      console.log('User logged out.');
    } catch (err) {
      console.error(err);
    }
  };

  // Fetch overdue books
  useEffect(() => {
    const fetchOverdueBooks = async () => {
      if (userInfo) {
        const userId = getCurrentUserId();
        if (!userId) return;

        try {
          const response = await fetch(`/api/users/overdueBooks/${userId}`);
          const data = await response.json();
          setOverdueBooks(data.overdueBooks || []);
        } catch (error) {
          console.error('Error fetching overdue books:', error);
        }
      } else {
        setOverdueBooks([]);
      }
    };

    fetchOverdueBooks();
  }, [userInfo]);

  // Handle outside click for notifications and navbar collapse
  useEffect(() => {
    const handleOutsideClick = (event) => {
      // Check if the click is outside the navbar
      if (navbarRef.current && !navbarRef.current.contains(event.target)) {
        setIsNavOpen(false); // Collapse navbar when clicking outside
        setIsUserDropdownOpen(false); // Close user dropdown
        setIsAdminDropdownOpen(false); // Close admin dropdown
      }
    };

    if (isNavOpen) {
      document.addEventListener('click', handleOutsideClick);
    } else {
      document.removeEventListener('click', handleOutsideClick);
    }

    return () => {
      document.removeEventListener('click', handleOutsideClick);
    };
  }, [isNavOpen]);

  const handleNotificationClick = () => {
    setShowNotification((prev) => !prev);
  };

  const handleReturnBookClick = () => {
    setShowNotification(false);
    navigate('/returnBook');
  };

  const handleNavLinkClick = () => {
    setIsNavOpen(false); // Close the navbar when any link is clicked
  };

  const handleDropdownClick = (dropdown) => {
    if (dropdown === 'user') {
      setIsUserDropdownOpen((prev) => !prev);
      setIsAdminDropdownOpen(false); // Close the admin dropdown if open
    } else if (dropdown === 'admin') {
      setIsAdminDropdownOpen((prev) => !prev);
      setIsUserDropdownOpen(false); // Close the user dropdown if open
    }
  };

  return (
    <header>
      <Navbar expand="lg" bg="dark" variant="dark" collapseOnSelect ref={navbarRef}>
        <Container>
          <Link to="/" className="navbar-brand">
            🕮 LibGen
          </Link>
          <Navbar.Toggle
            aria-controls="navbarNav"
            onClick={() => setIsNavOpen(!isNavOpen)} // Toggle the collapse manually
          />
          <Navbar.Collapse id="navbarNav" in={isNavOpen}> {/* Use "in" prop to control collapse state */}
            <Nav className="ms-auto">
              <li className="nav-item">
                <Link
                  to="/allbooks"
                  className="nav-link"
                  onClick={handleNavLinkClick}
                >
                  <FaBook /> Bookshelf
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  to="/filterBooks"
                  className="nav-link"
                  onClick={handleNavLinkClick}
                >
                  <FaList /> Filter Books
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  to="/contract"
                  className="nav-link"
                  onClick={handleNavLinkClick}
                >
                  <FaFileAlt /> Contract
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  to="/about"
                  className="nav-link"
                  onClick={handleNavLinkClick}
                >
                  <FaInfoCircle /> About
                </Link>
              </li>

              {userInfo ? (
                <>
                  <NavDropdown
                    title={userInfo.name}
                    id="username"
                    show={isUserDropdownOpen}
                    onClick={() => handleDropdownClick('user')}
                  >
                    <NavDropdown.Item as={Link} to="/profile">
                      <FaUser /> Profile
                    </NavDropdown.Item>
                    <NavDropdown.Item as={Link} to="/history">
                      Borrow History
                    </NavDropdown.Item>
                    <NavDropdown.Item as={Link} to="/returnBook">
                      Return Book
                    </NavDropdown.Item>
                    <NavDropdown.Item as={Link} to="/wishlist-finishRead">
                      Your Books
                    </NavDropdown.Item>
                    <NavDropdown.Item onClick={logoutHandler}>
                      <FaSignInAlt /> Logout
                    </NavDropdown.Item>
                  </NavDropdown>
                </>
              ) : (
                <Nav.Link as={Link} to="/login">
                  <FaUser /> Sign In
                </Nav.Link>
              )}
              {userInfo && userInfo.isAdmin && (
                <NavDropdown
                  title="Admin"
                  id="adminmenu"
                  show={isAdminDropdownOpen}
                  onClick={() => handleDropdownClick('admin')}
                >
                  <NavDropdown.Item as={Link} to="/admin/bookList">
                    Book List
                  </NavDropdown.Item>
                  <NavDropdown.Item as={Link} to="/admin/borrowRequest">
                    Borrow Request
                  </NavDropdown.Item>
                  <NavDropdown.Item as={Link} to="/admin/borrowList">
                    Borrow List
                  </NavDropdown.Item>
                  <NavDropdown.Item as={Link} to="/admin/approveReturn">
                    Approve Book Return
                  </NavDropdown.Item>
                  <NavDropdown.Item as={Link} to="/admin/userList">
                    User List
                  </NavDropdown.Item>
                </NavDropdown>
              )}
              {overdueBooks.length > 0 && (
                <li className="nav-link position-relative" ref={notificationRef}>
                  <FaBell
                    style={{ color: 'red', cursor: 'pointer' }}
                    onClick={handleNotificationClick}
                  />
                  <Badge
                    pill
                    bg="danger"
                    className="position-absolute top-10 start-100 translate-middle"
                  >
                    {overdueBooks.length}
                  </Badge>
                  {showNotification && (
                    <div
                      className="dropdown-menu show p-2"
                      style={{
                        position: 'absolute',
                        right: 0,
                        zIndex: 1050,
                      }}
                    >
                      <p>
                        You have overdue books. Please return them.
                        <button
                          className="btn btn-danger btn-sm mt-2"
                          onClick={handleReturnBookClick}
                        >
                          Return Books
                        </button>
                      </p>
                    </div>
                  )}
                </li>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  );
};

export default Header;
