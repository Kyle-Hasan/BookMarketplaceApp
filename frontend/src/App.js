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
import Confirm from './pages/Confirm';
import InsurancePlanForm from './pages/InsurancePlanForm'
import InsuranceProviderForm from './pages/InsuranceProviderForm'
import LocationForm from './pages/LocationForm'
import ShowOrders from './pages/ShowOrders';
import ViewAuthors from './pages/ViewAuthors';
import ViewPublishers from './pages/ViewPublishers';
import BooksByAuthor from './pages/BooksByAuthor';
import BooksByPublisher from './pages/BooksByPublisher';
import ViewWishlist from './pages/ViewWishlist';
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
          <Route path = "/editBook/:id" element = {<EditBookForm/>}/>
          <Route path = "/confirmAddBook" element = {<Confirm text={"Book added successfully"}/>}/>
          <Route path = "/addInsurancePlan" element = {<InsurancePlanForm/>}/>
          <Route path = "/addInsuranceProvider" element = {<InsuranceProviderForm/>}/>
          <Route path = "/addLocation" element = {<LocationForm/>}/>
          <Route path = "/orders" element = {<ShowOrders/>}/>
          <Route path = "/viewAuthors" element = {<ViewAuthors/>}/>
          <Route path = "/viewPublishers" element= {<ViewPublishers/>}/>
          <Route path = "/author/:id/:FName+:LName" element = {<BooksByAuthor/>}/>
          <Route path = "/publisher/:name" element = {<BooksByPublisher/>}/>
          <Route path = "/confirmOrder"  element = {<Confirm text={"Order placed successfuly"}/>}/>
          <Route path = "/confirmAuthor"  element = {<Confirm text={"Author input successfully"}/>}/>
          <Route path = "/confirmPublisher"  element = {<Confirm text={"Publisher input successfully"}/>}/>
          <Route path = "/confirmProvider"  element = {<Confirm text={"Insurance provider input sucessfully"}/>}/>
          <Route path = "/confirmPlan"  element = {<Confirm text={"Insurance plan input successfully"}/>}/>
          <Route path = "/confirmPayment"  element = {<Confirm text={"Payment input successfully"}/>}/>
          <Route path = "/confirmLocation"  element = {<Confirm text={"Location input successfully"}/>}/>
          <Route path = "/wishlist" element = {<ViewWishlist/>}/>
        </Routes>
   
      </Router>
    </div>
  );
}

export default App;
