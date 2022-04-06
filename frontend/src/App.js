import logo from './logo.svg';
import './App.css';
import Home from './pages/Home';
import Login from './pages/Login';
import Signup from './pages/Signup';
import BookEntry from './pages/BookEntry';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import PaymentForm from './pages/PaymentForm';
import BookForm from './pages/BookForm';
import AuthorForm from './pages/AuthorForm';
import PublisherForm from './pages/PublisherForm';
import WritesForm from './pages/WritesForm';
import Checkout from './pages/Checkout';
function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path = '/' element = {<Home/>} />
          <Route path = "/login" element = {<Login/>}/>
          <Route path = "/signup" element = {<Signup/>}/>
          <Route path = "/book/:id" element = {<BookEntry></BookEntry>}/>
          <Route path = "/addPayment" element = {<PaymentForm/>}/>
          <Route path = "/addBook" element = {<BookForm/>}/>
          <Route path = "/addAuthor" element = {<AuthorForm/>}/>
          <Route path = "/writes" element = {<WritesForm/>}/>
          <Route path = "/checkout" element = {<Checkout/>}/>
        </Routes>
   
      </Router>
    </div>
  );
}

export default App;
