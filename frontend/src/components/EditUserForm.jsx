import React from 'react'
import Navbar from './Navbar'
import {useState, useEffect} from 'react'

import axios from 'axios'
function EditUserForm() {
 const [error,setError] = useState("")
 const [formInfo,setFormInfo] = useState({
     DOB:null,
     Address:"",
     FName: "",
     LName:"",
     AdminFlag:"False"
 })
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
    
    if(formInfo.FName.length === 0 || formInfo.Address.length === 0 || formInfo.LName.length === 0 || !formInfo.DOB){
        setError("No field can be blank")
        return
    }
    try{
    
       
    
    const userData = await axios.patch("http://localhost:8000/user/",{
        DOB:formInfo.DOB,
        FName:formInfo.FName,
        LName:formInfo.LName,
        Address:formInfo.Address,
        AdminFlag:(formInfo.AdminFlag === "true"),
        Email:localStorage.getItem("username")
    })
    console.log(userData.data)
    setFormInfo(userData.data)
    localStorage.setItem("AdminFlag", userData.data.AdminFlag ? true : false)
    setError("Updated")
    window.location.reload()
    }
    catch(e){
        console.log(e)
        setError("error")
    }

 }
 useEffect(()=>{
     let isMounted = true
    let fetchData = async()=>{
    if(!localStorage.getItem("username")){
        return 
      }
      try{
    const userData = await axios.get("http://localhost:8000/user/",{
        params:{
           User_Email: localStorage.getItem("username")
        }
    })
    console.log(userData.data)
    localStorage.setItem("AdminFlag",userData.data.AdminFlag)
    if(isMounted){
    setFormInfo(userData.data)
    }

}
catch(e){
    console.log(e)
}
    }
    fetchData()
    return ()=>{isMounted=false}

 },[])
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
              <label htmlFor="Address" className="form-label">Address</label>
              <div className = "d-flex justify-content-center ">
              <input onChange = {onChange} value = {formInfo.Address} type="text" className=" w-50 form-control" id="Address" />
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
                  <option value = {false}>Not an admin</option>
                  <option value = {true}>Admin</option>
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