import React from 'react'
import Navbar from '../components/Navbar'
import {useState} from 'react'

import axios from 'axios'
import { useNavigate } from 'react-router-dom'
function LocationForm({setWriteReview,setReviews}) {
 const [error,setError] = useState("")
 const [formInfo,setFormInfo] = useState({
     City:"",
     Country:"",
     StreetNum:0,
     PostalCode:""
     
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
    if(formInfo.City.length === 0 || formInfo.Country.length === 0 || formInfo.PostalCode.length === 0){
        setError("No field can be blank")
        return
    }
    try{
        await axios.post("http://localhost:8000/location/",{
            Country:formInfo.Country,
            City:formInfo.City,
            StreetNum:formInfo.StreetNum,
            PostalCode:formInfo.PostalCode
        })
        navigate("/confirmLocation")
    }
    catch{
        setError("error occurred")

    }
 }
 if(localStorage.getItem("AdminFlag") !== "true"){
    return <><Navbar /><div>You can't view this</div></>
  }
  return (
    <>
    <Navbar/>
      <div className = "container">
          <div class = "card mt-4">
          <div class="card-header">
          <h1 className = "mb-3">Add location</h1>
          </div>
          <div class = "card-body">
      <form onSubmit={onSubmit} >
          <div className="mb-3">
              <label htmlFor="City" className="form-label">City</label>
              <div className = "d-flex justify-content-center ">
              <input onChange = {onChange} value ={formInfo.City} type="text" className="w-50 form-control" id="City" />
              </div>

          </div>
          <div className="mb-3 ">
              <label htmlFor="Country" className="form-label">Country</label>
              <div className = "d-flex justify-content-center ">
              <input onChange = {onChange} value = {formInfo.Country} type = "text" className=" w-50 form-control" id="Country" />
              </div>
          </div>
          <div className="mb-3 ">
              <label htmlFor="PostalCode" className="form-label">Postal Code</label>
              <div className = "d-flex justify-content-center ">
              <input onChange = {onChange} value = {formInfo.PostalCode} type = "text" className=" w-50 form-control" id="PostalCode" />
              </div>
          </div>
          <div className="mb-3 ">
              <label htmlFor="StreetNum" className="form-label">Street Number</label>
              <div className = "d-flex justify-content-center ">
              <input onChange = {onChange} value = {formInfo.StreetNum}min= "0" type = "number" className=" w-50 form-control" id="StreetNum" />
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

export default LocationForm