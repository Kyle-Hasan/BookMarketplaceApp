import React from 'react'
import Navbar from './Navbar'
import {useState} from 'react'
import axios from 'axios'
function ReviewForm({setWriteReview,setReviews,id}) {
 const [error,setError] = useState("")
 const [formInfo,setFormInfo] = useState({
     rating:0,
     comment:"",
     
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
    if(formInfo.comment.length === 0){
        setError("No field can be blank")
        return
    }
  await axios.post("http://localhost:8000/review/book/",{
        Rating:formInfo.rating,
        Comment:formInfo.comment,
        BookID:id,
        User_Email:localStorage.getItem("username")
  })
   try{setWriteReview(false)
   setReviews((oldState)=>{
       let copy = oldState.slice()
       copy.push({
           review: formInfo.comment,
           rating: formInfo.rating,
           date:new Date().toLocaleDateString(),
           username: localStorage.getItem("username"),
           BookID:7
       })
       return copy
   })
  }
  catch(e){
    console.log(e)
    setError("error or you already reviewed this book")
  }

 }
  return (
    <>
      <div className = "container">
          <div class = "card mt-4">
          <div class="card-header">
          <h1 className = "mb-3">Add review</h1>
          </div>
          <div class = "card-body">
      <form onSubmit={onSubmit} >
          <div className="mb-3">
              <label htmlFor="rating" className="form-label">Rating</label>
              <div className = "d-flex justify-content-center ">
              <input onChange = {onChange} min = "1" max = "10" value ={formInfo.rating} type="number" className="w-50 form-control" id="rating" />
              </div>

          </div>
          <div className="mb-3 ">
              <label htmlFor="comment" className="form-label">Comment</label>
              <div className = "d-flex justify-content-center ">
              <textarea onChange = {onChange} value = {formInfo.comment} className=" w-50 form-control" id="comment" />
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

export default ReviewForm