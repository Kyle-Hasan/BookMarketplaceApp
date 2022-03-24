import React from "react";
import { useState } from "react";
import { Link,useNavigate} from "react-router-dom";
function Navbar() {
  let user = false;
  const navigate = useNavigate()
  let logout = () => {};
  let [searchText,setSearchText]= useState("")
  let [searchOption,setSearchOption] = useState("All")

  let searchChange = (e)=>{
    setSearchText(e.target.value)
  }

  let selectChange = (e)=>{
    setSearchOption(e.target.value)
  }

  let searchSubmit = ()=>{
    if(searchText.length === 0){
      return
    }
    else {
      navigate('/')
    }
  }
  return (
    <div className="container">
      <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
        <div className="container">
          <Link className="navbar-brand" to="/">
            Book marketplace
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navContent"
            aria-controls="navContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navContent">
            <ul className="navbar-nav me-auto pb-1 ">
              <li className="nav-item">
                <Link className="nav-link active" aria-current="page" to="/">
                  Home
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/books">
                  Books
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/about">
                  About
                </Link>
              </li>
            </ul>
            <ul className="navbar-nav mx-1">
              
              {!user ? (
                <>
                  <li className="nav-item">
                    <Link className="nav-link" to="/signup">
                      Register
                    </Link>
                  </li>

                  <li className="nav-item">
                    <Link className="nav-link" to="/login">
                      Log in
                    </Link>
                  </li>
                </>
              ):(
                <li className="nav-item">
                  <div className="dropdown">
                    <a
                      className="nav-link dropdown-toggle"
                      type="button"
                      id="triggerId"
                      data-bs-toggle="dropdown"
                      aria-haspopup="true"
                      aria-expanded="false"
                    >
                      Username
                    </a>
                    <div className="dropdown-menu" aria-labelledby="triggerId">
                      <Link className="dropdown-item" to="/">
                        Reviews
                      </Link>
                      <Link className="dropdown-item" to="/">
                        Orders
                      </Link>
                      <Link className="dropdown-item" to="/">
                        Profile Settings
                      </Link>
                      <Link onClick={logout} className="dropdown-item" to="/">
                        Logout
                      </Link>
                    </div>
                  </div>
                </li>
              ) }
            </ul>
            <form className="d-flex mx-1" onSubmit = {searchSubmit}>
              <select className="mx-2" onChange = {selectChange} value = {searchOption}>
                <option value="All">All</option>
                <option value="Books">Books</option>
                <option value="Authors">Authors</option>
                <option value="Publishers">Publishers</option>
              </select>
              <input
                className="form-control me-1"
                type="search"
                placeholder="Search"
                aria-label="Search"
                onChange = {searchChange}
                value = {searchText}
              />
              <button className="btn btn-outline-dark" type="submit">
                Search
              </button>
            </form>
          </div>
        </div>
      </nav>
    </div>
  );
}

export default Navbar;