import React from 'react'
import Navbar from '../components/Navbar'
import {useState} from 'react'
function PaymentForm() {
 const [error,setError] = useState(false)
 const onSubmit = ()=>{}
  return (
    <><Navbar />
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
              <input onChange = "" value ="" type="text" className="w-50 form-control" id="cardNo" />
              </div>

          </div>
          <div className="mb-3 ">
              <label htmlFor="cvv" className="form-label">CVV</label>
              <div className = "d-flex justify-content-center ">
              <input onChange = "" value = "" type="text" className=" w-50 form-control" id="cvv" />
              </div>
          </div>
          <div className="mb-3 ">
              <label htmlFor="name" className="form-label">Name on card</label>
              <div className = "d-flex justify-content-center ">
              <input onChange = "" value = "" type="text" className=" w-50 form-control" id="name" />
              </div>
          </div>
          <div className="mb-3 ">
              <label htmlFor="address" className="form-label">Billing address</label>
              <div className = "d-flex justify-content-center ">
              <input onChange = "" value = "" type="text" className=" w-50 form-control" id="address" />
              </div>
          </div>
          <button type="submit" className="btn btn-secondary">Submit</button>
      </form>
     {error && <p className='mt-1 text-danger'>Failed</p>}
     
     </div>
     </div>
      </div>
      </>
  )
}

export default PaymentForm