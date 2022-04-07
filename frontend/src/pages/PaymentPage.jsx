import React from 'react'
import Navbar from '../components/Navbar'

function PaymentPage() {
  if(!localStorage.getItem("username")){
    return <><Navbar /><div>You arent logged in</div></>
  }
  return (
    <div><Navbar/><PaymentPage/></div>
  )
}

export default PaymentPage