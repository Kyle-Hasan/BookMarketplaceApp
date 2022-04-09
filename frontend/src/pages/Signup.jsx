import React from "react";
import Navbar from "../components/Navbar";
import { useState } from "react";
import { useNavigate,Link } from "react-router-dom";
import axios from "axios";

function Signup() {
  const navigate = useNavigate();
  const [registerInfo, setRegisterInfo] = useState({
    fname: "",
    lname: "",
    email: "",
    password: "",
    retype: "",
    AdminFlag:"0"
    
  });
  const [error, setError] = useState("");
  const onSubmit = async (e) => {
    e.preventDefault();
    //probably needs something to validate the details first

    const regex = new RegExp(/[\w]@[^w].*\..*/);
    if (
      registerInfo.email.length === 0 ||
      registerInfo.password.length === 0 || registerInfo.fname.length === 0 || registerInfo.lname.length === 0
    ) {
      setError("email,password or name cannot be null");
    } else if (registerInfo.password !== registerInfo.retype) {
      setError("retyped password does not match password");
      console.log(registerInfo.password + " other " + registerInfo.retype)
    } 
    else if(  regex.test(registerInfo.email) === false) {
          setError("Invalid email")
      }
    else {
      //add user to database, set state for user as if they logged in
      try{
        await axios.post('http://127.0.0.1:8000/signup/',
        {
            Email: registerInfo.email,
            FName: registerInfo.fname,
            LName: registerInfo.lname,         
            Password: registerInfo.password,
            AdminFlag:registerInfo.AdminFlag})
          //log in 
         

        localStorage.setItem("username",registerInfo.email)
        localStorage.setItem("AdminFlag",registerInfo.AdminFlag)
        navigate("/")
        navigate("/")

      }
      catch(error){
        setError("error occurred during sign up")
      }
    }
  };
  const setInput = (e) => {
    setRegisterInfo((oldState) => {
      return {
        ...oldState,
        [e.target.id]: e.target.value,
      };
    });
  };
  return (
    <>
      <Navbar />
      <div className="container">
          <div className="card">
              <div className="card-header">
        <h1 className="mb-3">Sign up</h1>
        </div>
        <div className="card-content">
        <form onSubmit={onSubmit}>
        <div className="mb-3 ">
            <label htmlFor="fname" className="form-label">
              First name
            </label>
            <div className="d-flex justify-content-center ">
              <input
                onChange={setInput}
                value={registerInfo.fname}
                type="text"
                className=" w-50 form-control"
                id="fname"
              />
            </div>
          </div>
          <div className="mb-3 ">
            <label htmlFor="lname" className="form-label">
              Last name
            </label>
            <div className="d-flex justify-content-center ">
              <input
                onChange={setInput}
                value={registerInfo.lname}
                type="text"
                className=" w-50 form-control"
                id="lname"
              />
            </div>
          </div>
          <div className="mb-3">
            <label htmlFor="email" className="form-label">
              Email
            </label>
            <div className="d-flex justify-content-center ">
              <input
                onChange={setInput}
                value={registerInfo.email}
                type="email"
                className="w-50 form-control"
                id="email"
              />
            </div>
          </div>
          <div className="mb-3 ">
            <label htmlFor="password" className="form-label">
              Password
            </label>
            <div className="d-flex justify-content-center ">
              <input
                onChange={setInput}
                value={registerInfo.password}
                type="password"
                className=" w-50 form-control"
                id="password"
              />
            </div>
          </div>
          <div className="mb-3 ">
            <label htmlFor="retype" className="form-label">
              Retype password
            </label>
            <div className="d-flex justify-content-center ">
              <input
                onChange={setInput}
                value={registerInfo.retype}
                type="password"
                className=" w-50 form-control"
                id="retype"
              />
            </div>
          </div>
          <div className="mb-3 ">
              <label htmlFor="AdminFlag" className="form-label">Admin</label>
              <div className = "d-flex justify-content-center ">
              <select onChange = {setInput} value = {registerInfo.AdminFlag} type="date" className=" w-50 form-control" id="AdminFlag">
                  <option value = "0">Not an admin</option>
                  <option value = "1">Admin</option>
              </select>
              </div>
          </div>
          
          <button type="submit" className="btn btn-secondary">
            Sign up
          </button>
        </form>

        {error.length !== 0 && <p className="mt-1 text-danger">{error}</p>}
        <div className="my-2">
        <Link  to = "/login">Login instead</Link>
        </div>
        </div>
        </div>
      </div>
    </>
  );
}

export default Signup;