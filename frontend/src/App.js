import logo from './logo.svg';
import './App.css';
import Home from './pages/Home';
import Login from './pages/Login';
import Signup from './pages/Signup';
import BookEntry from './pages/BookEntry';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

import BookForm from './pages/BookForm';
import AuthorForm from './pages/AuthorForm';
import PublisherForm from './pages/PublisherForm';
import WritesForm from './pages/WritesForm';
import Checkout from './pages/Checkout';
import PaymentPage from './pages/PaymentPage';
import AllBooks from './pages/AllBooks';
import About from './pages/About';
import EditUserForm from './components/EditUserForm';
import EditBookForm from "./pages/EditBookForm"
import ConfirmBook from './pages/ConfirmBook';
function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path = '/' element = {<Home/>} />
          <Route path = "/login" element = {<Login/>}/>
          <Route path = "/signup" element = {<Signup/>}/>
          <Route path = "/book/:id" element = {<BookEntry></BookEntry>}/>
          <Route path = "/addPayment" element = {<PaymentPage/>}/>
          <Route path = "/addBook" element = {<BookForm/>}/>
          <Route path = "/addAuthor" element = {<AuthorForm/>}/>
          <Route path = "/writes" element = {<WritesForm/>}/>
          <Route path = "/checkout" element = {<Checkout/>}/>
          <Route path= "/addPublisher" element = {<PublisherForm/>}/>
          <Route path= "/books" element = {<AllBooks/>}/>
          <Route path= "/about" element = {<About/>}/>
          <Route path= "/editUser" element = {<EditUserForm/>}/>
          <Route path = "/editBook" element = {<EditBookForm/>}/>
          <Route path = "/confirmAddBook" element = {<ConfirmBook/>}/>
          
        </Routes>
   
      </Router>
    </div>
  );
}

export default App;
