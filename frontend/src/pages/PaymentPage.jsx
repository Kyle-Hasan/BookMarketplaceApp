import React from 'react'
import Navbar from '../components/Navbar'
import PaymentForm from '../components/PaymentForm'

function PaymentPage() {
  if(!localStorage.getItem("username")){
    return <><Navbar /><div>You arent logged in</div></>
  }
  return (
    <div><Navbar/><PaymentForm/></div>
  )
}

export default PaymentPage