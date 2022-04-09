import React from 'react'
import Navbar from './Navbar'
import {useState} from 'react'
import Axios from 'axios'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
function PaymentForm({setCheckoutInfo,setShowPaymentForm}) {
 const [error,setError] = useState("")
 const [paymentInfo,setPaymentInfo] = useState({
     cvv:"",
     cardNo:"",
     name: "",
     address:""
 })
 const navigate = useNavigate()
 const onChange= (e) => {
 
    setPaymentInfo((oldState) => {
      return {
        ...oldState,
        [e.target.id]: e.target.value,
      }
    })

    
  
  }
 const onSubmit = async(e)=>{
     e.preventDefault()
    if(paymentInfo.cvv.length === 0 || paymentInfo.address.length === 0 || paymentInfo.cardNo.length === 0 || paymentInfo.name.length === 0){
        setError("No field can be blank")
        return
    }
    try{
    await axios.post("http://localhost:8000/payment/",{
        User_Email:localStorage.getItem("username"),
        CardNo:paymentInfo.cardNo,
        CVV:paymentInfo.cvv,
        BillingAddress:paymentInfo.address
    })
    console.log(setCheckoutInfo)
    if(setCheckoutInfo){
        setCheckoutInfo(paymentInfo)
        setShowPaymentForm(false)
    }
    else{
    navigate("/")
    }
}
    catch(e){
        console.log(e)
        setError("error occurred")
    }

 }
  return (
    <>
      <div className = "container">
          <div class = "card mt-4">
          <div class="card-header">
          <h1 className = "mb-3">Add payment</h1>
          </div>
          <div class = "card-body">
      <form onSubmit={onSubmit} >
          <div className="mb-3">
              <label htmlFor="cardNo" className="form-label">Card Number</label>
              <div className = "d-flex justify-content-center ">
              <input onChange = {onChange} value ={paymentInfo.cardNo} type="number" className="w-50 form-control" id="cardNo" />
              </div>

          </div>
          <div className="mb-3 ">
              <label htmlFor="cvv" className="form-label">CVV</label>
              <div className = "d-flex justify-content-center ">
              <input onChange = {onChange} value = {paymentInfo.cvv} type="number" className=" w-50 form-control" id="cvv" />
              </div>
          </div>
          <div className="mb-3 ">
              <label htmlFor="name" className="form-label">Name on card</label>
              <div className = "d-flex justify-content-center ">
              <input onChange = {onChange} value = {paymentInfo.name} type="text" className=" w-50 form-control" id="name" />
              </div>
          </div>
          <div className="mb-3 ">
              <label htmlFor="address" className="form-label">Billing address</label>
              <div className = "d-flex justify-content-center ">
              <input onChange = {onChange} value = {paymentInfo.address} type="text" className=" w-50 form-control" id="address" />
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

export default PaymentForm