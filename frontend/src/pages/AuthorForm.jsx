import React from 'react'
import Navbar from '../components/Navbar'
import {useState} from 'react'

import axios from 'axios'
import { useNavigate } from 'react-router-dom'
function AuthorForm() {
 const [error,setError] = useState("")
 const [formInfo,setFormInfo] = useState({
     NumBooks :0,
     Fname:"",
     Lname: "",
     

 })
 const navigate = useNavigate()
 const onChange= (e) => {
 
    setFormInfo((oldState) => {
      return {
        ...oldState,
        [e.target.id]: e.target.value,
      }
    })
  
  }
 const onSubmit = async(e)=>{
     e.preventDefault()
     try{
     await axios.post("http://localhost:8000/author/",{
      
            FName:formInfo.Fname,
            LName:formInfo.Lname,
            NumBooks:formInfo.NumBooks
        
     })
     navigate("/confirmAuthor")
    }
    catch(err){
        console.log(err)
        setError("something went wrong")

    }
    

 }
  return (
    <><Navbar />
      <div className = "container">
          <div class = "card mt-4">
          <div class="card-header">
          <h1 className = "mb-3">Add Author</h1>
          </div>
          <div class = "card-body">
      <form onSubmit={onSubmit} >
          <div className="mb-3">
              <label htmlFor="Fname" className="form-label">First name</label>
              <div className = "d-flex justify-content-center ">
              <input onChange = {onChange} value ={formInfo.Fname} type="text" className="w-50 form-control" id="Fname" />
              </div>

          </div>
          <div className="mb-3">
              <label htmlFor="Lname" className="form-label">Last name</label>
              <div className = "d-flex justify-content-center ">
              <input onChange = {onChange} value ={formInfo.Lname} type="text" className="w-50 form-control" id="Lname" />
              </div>

          </div>
        
          

          
          <button type="submit" className="btn btn-secondary">Submit</button>
      </form>
     {error.length !== 0 && <p className='mt-1 text-danger'>{error}</p>}
     
     </div>
     </div>
      </div>
      </>
  )
}

export default AuthorForm