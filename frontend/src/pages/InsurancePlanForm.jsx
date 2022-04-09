import React from 'react'
import Navbar from '../components/Navbar'
import {useState} from 'react'
import Axios from 'axios'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
function InsurancePlanForm() {
 const [error,setError] = useState("")
 const [formInfo,setFormInfo] = useState({
     policy_no:0,
     price:0,
     CoverageDuration:1,
     Details: "",
     InsuranceProviderName:""


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
       await axios.post("http://localhost:8000/insuranceplan/",{
         PolicyNo:formInfo.policy_no,
         InsuranceProvider_name:formInfo.InsuranceProviderName,
         Price:formInfo.price,
         CoverageDuration:formInfo.CoverageDuration,
         Details:formInfo.Details
       })
       navigate("/")

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
          <h1 className = "mb-3">Add Insurance plan</h1>
          </div>
          <div class = "card-body">
      <form onSubmit={onSubmit} >
          <div className="mb-3">
              <label htmlFor="policy_no" className="form-label">Policy number</label>
              <div className = "d-flex justify-content-center ">
              <input onChange = {onChange} min="0" value ={formInfo.policy_no} type="number" className="w-50 form-control" id="policy_no" />
              </div>

          </div>
          <div className="mb-3">
              <label htmlFor="CoverageDuration" className="form-label">Coverage Duration(days)</label>
              <div className = "d-flex justify-content-center ">
              <input onChange = {onChange} min = "1" value ={formInfo.CoverageDuration} type="number" className="w-50 form-control" id="CoverageDuration" />
              </div>

          </div>
          <div className="mb-3">
              <label htmlFor="CoverageDuration" className="form-label">Details</label>
              <div className = "d-flex justify-content-center ">
              <textarea onChange = {onChange}  value ={formInfo.Details} type="text" className="w-50 form-control" id="Details" />
              </div>

          </div>
          <div className="mb-3">
              <label htmlFor="price" className="form-label">Price($)</label>
              <div className = "d-flex justify-content-center ">
              <input onChange = {onChange} min = "1" value ={formInfo.price} type="number" className="w-50 form-control" id="price" />
              </div>

          </div>
          <div className="mb-3">
              <label htmlFor="InsuranceProviderName" className="form-label">Provider name</label>
              <div className = "d-flex justify-content-center ">
              <input onChange = {onChange} value ={formInfo.InsuranceProviderName} type="text" className="w-50 form-control" id="InsuranceProviderName" />
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

export default InsurancePlanForm