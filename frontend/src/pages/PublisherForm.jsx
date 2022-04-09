import React from 'react'
import Navbar from '../components/Navbar'
import {useState} from 'react'
import Axios from 'axios'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
function PublisherForm() {
 const [error,setError] = useState("")
 const [formInfo,setFormInfo] = useState({
     Name: ""

 })
 const navigate = useNavigate("/")
 const onChange= (e) => {
 
    setFormInfo((oldState) => {
      return {
        ...oldState,
        [e.target.id]: e.target.value,
      }
    })
  
  }
 const onSubmit = async (e)=>{
     e.preventDefault()
    try{
      await axios.post("http://localhost:8000/publisher/",{
        Name:formInfo.Name
      })
      navigate("/")
    }
    catch(erro){
      setError("error")
      console.log(erro)
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
          <h1 className = "mb-3">Add Publisher</h1>
          </div>
          <div class = "card-body">
      <form onSubmit={onSubmit} >
          <div className="mb-3">
              <label htmlFor="Name" className="form-label">Name</label>
              <div className = "d-flex justify-content-center ">
              <input onChange = {onChange} value ={formInfo.Name} type="text" className="w-50 form-control" id="Name" />
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

export default PublisherForm