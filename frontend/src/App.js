import logo from './logo.svg';
import './App.css';
import Home from './pages/Home';
import Login from './pages/Login';
import Signup from './pages/Signup';
import BookEntry from './pages/BookEntry';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path = '/' element = {<Home/>} />
          <Route path = "/login" element = {<Login/>}/>
          <Route path = "/signup" element = {<Signup/>}/>
          <Route path = "/book/:id" element = {<BookEntry></BookEntry>}/>
        </Routes>
   
      </Router>
    </div>
  );
}

export default App;
