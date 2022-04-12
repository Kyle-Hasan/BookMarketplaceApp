import React from 'react'
import Navbar from '../components/Navbar'

function Confirm({text}) {
  return (
    <div><Navbar></Navbar>
   <p className='mt-1'> {text} </p>
    </div>
  )
}

export default Confirm