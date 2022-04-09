import React from 'react'
import Navbar from '../components/Navbar'
import {useState} from 'react'
import Axios from 'axios'
function WritesForm() {
 const [error,setError] = useState("")
 const [books,setBooks] = useState([
     {
        BookId:1,
        Title: "book"
     },
     {
        BookId:31,
        Title: "beeook"
     },

 ])
 const [formInfo,setFormInfo] = useState({
     AuthorId:0,
     BookId:0,
     BookTitle:"",
     AuthorFname:"",
     AuthorLname:""


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
 if(localStorage.getItem("AdminFlag") !== "true"){
  return <><Navbar /><div>You can't view this</div></>
}
  return (
    <><Navbar />
      <div className = "container">
          <div class = "card mt-4">
          <div class="card-header">
          <h1 className = "mb-3">Add author to book</h1>
          </div>
          <div class = "card-body">
      <form onSubmit={onSubmit} >
          <div className="mb-3">
              
              <div className = "d-flex justify-content-center ">
              <label for="BookTitle" class="form-label">Book search</label>
            <input onChange={onChange} value = {formInfo.BookTitle} class="form-control" list="datalistOptions" id="BookTitle" placeholder="Type to search for books by title"/>
            <datalist id="datalistOptions">
         
            </datalist>
              </div>

          </div>
          <div className="mb-3">
              <label htmlFor="Address" className="form-label">Address</label>
              <div className = "d-flex justify-content-center ">
              <input onChange = {onChange} value ={formInfo.Address} type="text" className="w-50 form-control" id="Address" />
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

export default WritesForm