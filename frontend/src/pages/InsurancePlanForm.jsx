import React from 'react'
import Navbar from '../components/Navbar'
import {useState} from 'react'
import Axios from 'axios'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import UseSearchDebounced from './UseSearchDebounced'
function InsurancePlanForm() {
 const [error,setError] = useState("")
 const providerApiSearch = async(text)=>{
  return await axios.get("http://localhost:8000/insuranceprovider/",{
      params:{
          Search:text
      }
  })
}
const searchADebounced = ()=> UseSearchDebounced(text=>providerApiSearch(text),200,"")
const a= searchADebounced();
const pText = a.input
const setPText = a.setInput
const pResults = a.results
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
     if(!pResults.result.data.find((p)=>{ return p.Name===pText})){
        setError("Invalid provider")
        return
    }
       await axios.post("http://localhost:8000/insuranceplan/",{
         PolicyNo:formInfo.policy_no,
         InsuranceProvider_name:pText,
         Price:formInfo.price,
         CoverageDuration:formInfo.CoverageDuration,
         Details:formInfo.Details
       })
       navigate("/confirmPlan")

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
              <input onChange = {onChange} min = "1" step=".01" value ={formInfo.price} type="number" className="w-50 form-control" id="price" />
              </div>

          </div>
          <div className="mb-3 d-flex justify-content-center">
          <input onChange={(e)=>{setPText(e.target.value)}} value={pText} className="w-50 form-control" list="datalistOptions2" id="PublisherName"placeholder="search publisher name" />
           <datalist id="datalistOptions2">
                            {pResults.result && pResults.result.data && (pResults.result.data.map((p)=>(
                                 <option key={p.Name} value={p.Name} />
                            )))}
                          </datalist>
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