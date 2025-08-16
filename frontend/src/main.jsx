import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import App from './App.jsx';
import store from '../store.js';
import './styles/App.css';
import './styles/Bookshelf.css';
import './styles/BookCard.css';
import './styles/Header.css';
import './styles/Footer.css';
import './styles/SearchBar.css';
import './styles/PdfReader.css';
import './styles/BookDetails.css';
import './styles/AllBooks.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </StrictMode>
);
