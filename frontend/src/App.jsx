import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Bookshelf from './components/BookShelf.jsx';
import Footer from './components/Footer.jsx';
import Header from './components/Header.jsx';
import AllBooks from "../screens/AllBooks.jsx";
// import SearchBar from './components/SearchBar.jsx';
import HomePage from "../screens/HomePage.jsx";
import PdfReader from '../screens/PdfReader.jsx';
import BookDetails from "../screens/BookDetails.jsx";
import RegisterScreen from "../screens/RegisterScreen.jsx";
// import Book from "../../backend/models/Book.js";
import LoginScreen from "../screens/LoginScreen.jsx";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { logout } from "./slices/authSlice.js";


const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const expirationTime = localStorage.getItem('expirationTime');
    if (expirationTime) {
      const currentTime = new Date().getTime();

      if (currentTime > expirationTime) {
        dispatch(logout());
      }
    }
  }, [dispatch]);


  return (
    <Router>
      <div className="App">
        <Header />
        {/* <SearchBar /> */}

        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/book/:id" element={<PdfReader />} />
          <Route path="/allbooks" element={<AllBooks />} />
          <Route path="/book/:id/details" element={<BookDetails />} />
          <Route path="/login" element={<LoginScreen/>} />
          <Route path='/register' element={<RegisterScreen />} />
        </Routes>

        <Footer />
      </div>
    </Router>
  );
};

export default App;
