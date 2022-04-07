import React from 'react'
import Navbar from './Navbar'
import {useState, useEffect} from 'react'
import Axios from 'axios'
function EditUserForm() {
 const [error,setError] = useState("")
 const [formInfo,setFormInfo] = useState({
     DOB:"",
     Address:"",
     FName: "",
     LName:"",
     AdminFlag:0
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
    if(formInfo.cvv.length === 0 || formInfo.address.length === 0 || formInfo.cardNo.length === 0 || formInfo.name.length === 0){
        setError("No field can be blank")
        return
    }
    

 }
 if(!localStorage.getItem("username")){
    return <><Navbar /><div>You arent logged in</div></>
  }
  return (
    <>
    <Navbar></Navbar>
      <div className = "container">
          <div class = "card mt-4">
          <div class="card-header">
          <h1 className = "mb-3">Edit User</h1>
          </div>
          <div class = "card-body">
      <form onSubmit={onSubmit} >
          <div className="mb-3">
              <label htmlFor="FName" className="form-label">First name</label>
              <div className = "d-flex justify-content-center ">
              <input onChange = {onChange} value ={formInfo.FName} type="text" className="w-50 form-control" id="FName" />
              </div>

          </div>
          <div className="mb-3 ">
              <label htmlFor="LName" className="form-label">Last name</label>
              <div className = "d-flex justify-content-center ">
              <input onChange = {onChange} value = {formInfo.LName} type="text" className=" w-50 form-control" id="LName" />
              </div>
          </div>
          <div className="mb-3 ">
              <label htmlFor="Address" className="form-label">Admin flag</label>
              <div className = "d-flex justify-content-center ">
              <input onChange = {onChange} value = {formInfo.Address} type="number" className=" w-50 form-control" id="Address" />
              </div>
          </div>
          <div className="mb-3 ">
              <label htmlFor="DOB" className="form-label">DOB</label>
              <div className = "d-flex justify-content-center ">
              <input onChange = {onChange} value = {formInfo.DOB} type="date" className=" w-50 form-control" id="DOB" />
              </div>
          </div>
          <div className="mb-3 ">
              <label htmlFor="AdminFlag" className="form-label">Admin</label>
              <div className = "d-flex justify-content-center ">
              <select onChange = {onChange} value = {formInfo.AdminFlag} type="date" className=" w-50 form-control" id="AdminFlag">
                  <option value = "0">Not an admin</option>
                  <option value = "1">Admin</option>
              </select>
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

export default EditUserForm