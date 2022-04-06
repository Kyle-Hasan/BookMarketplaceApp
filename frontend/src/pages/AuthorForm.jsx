import React from 'react'
import Navbar from '../components/Navbar'
import {useState} from 'react'
import Axios from 'axios'
function AuthorForm() {
 const [error,setError] = useState("")
 const [formInfo,setFormInfo] = useState({
     NumBooks :0,
     Fname:"",
     Lname: "",
     DateDied:"",

 })
 const onChange= (e) => {
 
    setFormInfo((oldState) => {
      return {
        ...oldState,
        [e.target.id]: e.target.value,
      }
    })
  
  }
 const onSubmit = (e)=>{
     e.preventDefault()
    

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
        
          <div className="mb-3 ">
              <label htmlFor="NumBooks" className="form-label">Number of books</label>
              <div className = "d-flex justify-content-center ">
              <input onChange = {onChange} value = {formInfo.NumBooks} type="text" className=" w-50 form-control" id="NumBooks" />
              </div>
          </div>

          <div className="mb-3 ">
              <label htmlFor="DateDied" className="form-label">Year died(if applicable)</label>
              <div className = "d-flex justify-content-center ">
              <input onChange = {onChange} value = {formInfo.DateDied} min= "0" type="number" className=" w-50 form-control" id="DateDied" />
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