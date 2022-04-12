import React from 'react'
import Navbar from '../components/Navbar'
import {useState} from 'react'

import axios from 'axios'
import { useNavigate } from 'react-router-dom'
function InsuranceProviderForm() {
 const [error,setError] = useState("")
 const [formInfo,setFormInfo] = useState({
     Name: "",
     Address: "",
     locationID:0

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
 const onSubmit =async (e)=>{
     e.preventDefault()
     try{
     await axios.post("http://localhost:8000/insuranceprovider/",{
       Location_ID:formInfo.locationID,
       Name:formInfo.Name
     })
     navigate("/confirmPublisher")
     }
     catch{
       setError("error occurred")
     }

 }
 if(localStorage.getItem("AdminFlag") !== "true"){
  return <><Navbar /><div>You can't view this</div></>
}
  return (
    <><Navbar />
      <div className = "container">
          <div class = "card mt-4">
          <div class="card-header">
          <h1 className = "mb-3">Add Insurance provider</h1>
          </div>
          <div class = "card-body">
      <form onSubmit={onSubmit} >
          <div className="mb-3">
              <label htmlFor="Name" className="form-label">Name</label>
              <div className = "d-flex justify-content-center ">
              <input onChange = {onChange} value ={formInfo.Name} type="text" className="w-50 form-control" id="Name" />
              </div>

          </div>
          <div className="mb-3">
              <label htmlFor="Address" className="form-label">Address</label>
              <div className = "d-flex justify-content-center ">
              <input onChange = {onChange} value ={formInfo.Address} type="text" className="w-50 form-control" id="Address" />
              </div>

          </div>
          <div className="mb-3">
              <label htmlFor="locationID" className="form-label">Location ID</label>
              <div className = "d-flex justify-content-center ">
              <input onChange = {onChange} value ={formInfo.locationID} type="number" className="w-50 form-control" id="locationID" />
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

export default InsuranceProviderForm