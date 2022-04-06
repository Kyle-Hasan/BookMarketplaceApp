import React from 'react'
import Navbar from '../components/Navbar'
import {useState} from 'react'
import Axios from 'axios'
function BookForm() {
 const [error,setError] = useState("")
 const [authors,setAuthors] = useState([
     {
         Fname: "micheal",
         Lname: "jonson"
     }
 ])
 const [addAuthor,setAddAuthor] = useState(false)
 const [authorText,setAuthorText] = useState("")
 const [authorSearch,setAuthorSearch] = useState("")
 const [bookInfo,setBookInfo] = useState({
     ReleaseYear:0,
     PageCount:1,
     Description:"",
     RentPrice:0,
     Title:"",
     Rating:0,
     Stock:1,
     Damage:"",
     locationID:0,
     SalePrice:0,
     Image:"",
 })
 const onChangeAuthorText= (e)=>{
     setAuthorText(e.target.value)
 }
 const onChange= (e) => {
 
    setBookInfo((oldState) => {
      return {
        ...oldState,
        [e.target.id]: e.target.value,
      }
    })
  
  }
 const onSubmit = (e)=>{
     e.preventDefault()
    

 }
 const authorDelete = (e)=>{
     let copy = authors.filter((author,index)=>{
        return index !== +e.target.value
     })
     setAuthors(copy)
 }
 const authorClick = (e)=>{
     setAddAuthor(true)
 
 }
 const authorsChange = (e)=>{
    
 }
  return (
    <><Navbar />
      <div className = "container">
          <div class = "card mt-4">
          <div class="card-header">
          <h1 className = "mb-3">Add Book</h1>
          </div>
          <div class = "card-body">
      <form onSubmit={onSubmit} >
          <div className="mb-3">
              <label htmlFor="Title" className="form-label">Title</label>
              <div className = "d-flex justify-content-center ">
              <input onChange = {onChange} value ={bookInfo.Title} type="text" className="w-50 form-control" id="Title" />
              </div>

          </div>
          <div className="mb-3">
              <label htmlFor="Image" className="form-label">Link to image</label>
              <div className = "d-flex justify-content-center ">
              <input onChange = {onChange} value ={bookInfo.Image} type="text" className="w-50 form-control" id="Image" />
              </div>

          </div>
          <div className="mb-3 ">
              <label htmlFor="Description" className="form-label">Description</label>
              <div className = "d-flex justify-content-center ">
              <textarea onChange = {onChange} value = {bookInfo.Description} type="text" className=" w-50 form-control" id="Description" />
              </div>
          </div>
          <div className="mb-3 ">
              <label htmlFor="Damage" className="form-label">Damage</label>
              <div className = "d-flex justify-content-center ">
              <input onChange = {onChange} value = {bookInfo.Damage} type="text" className=" w-50 form-control" id="Damage" />
              </div>
          </div>
          <div className="mb-3 ">
              <label htmlFor="PageCount" className="form-label">Page Count</label>
              <div className = "d-flex justify-content-center ">
              <input onChange = {onChange} value = {bookInfo.PageCount} min= "1" type="number" className=" w-50 form-control" id="PageCount" />
              </div>
          </div>
          <div className="mb-3 ">
              <label htmlFor="Stock" className="form-label">Stock</label>
              <div className = "d-flex justify-content-center ">
              <input onChange = {onChange} value = {bookInfo.Stock} min= "1" type="number" className=" w-50 form-control" id="Stock" />
              </div>
          </div>
          <div className="mb-3 ">
              <label htmlFor="RentPrice" className="form-label">Rent Price($)</label>
              <div className = "d-flex justify-content-center ">
              <input onChange = {onChange} value = {bookInfo.RentPrice} min= "0" type="number" className=" w-50 form-control" id="RentPrice" />
              </div>
          </div>
          <div className="mb-3 ">
              <label htmlFor="SalePrice" className="form-label">Sale Price($)</label>
              <div className = "d-flex justify-content-center ">
              <input onChange = {onChange} value = {bookInfo.SalePrice} min= "0" type="number" className=" w-50 form-control" id="SalePrice" />
              </div>
          </div>
          <div className="mb-3 ">
              <label htmlFor="Rating" className="form-label">Rating </label>
              <div className = "d-flex justify-content-center ">
              <input onChange = {onChange} value = {bookInfo.Rating} min= "0" type="number" className=" w-50 form-control" id="Rating" />
              </div>
          </div>
          <div className="mb-3 ">
              <label htmlFor="locationID" className="form-label">Location ID </label>
              <div className = "d-flex justify-content-center ">
              <input onChange = {onChange} value = {bookInfo.locationID} min= "0" type="number" className=" w-50 form-control" id="locationID" />
              </div>
              
          </div>
          <div className="mb-3 ">
              <label htmlFor="ReleaseYear" className="form-label">Release Year</label>
              <div className = "d-flex justify-content-center ">
              <input onChange = {onChange} value = {bookInfo.ReleaseYear} min= "0" type="number" className=" w-50 form-control" id="ReleaseYear" />
              </div>
              </div>
              <h6>Authors </h6>
             <ul>
                 {authors.map((author,index)=>(
                     <li>{author.Lname} , {author.Fname} <button onClick = {authorDelete} value= {index} className='btn btn-primary'>Delete</button></li>

                ))}
             </ul>
            <button className='btn btn-primary' onClick = {authorClick}>Add author</button>
           {addAuthor &&  <><input onChange={onChangeAuthorText} value={authorText} class="form-control" list="datalistOptions" id="BookTitle" placeholder="Type to search for author by last name and first name" /><datalist id="datalistOptions">

                          </datalist></>}
          <button type="submit" className="btn btn-secondary">Submit</button>
      </form>
     {error.length !== 0 && <p className='mt-1 text-danger'>{error}</p>}
     
     </div>
     </div>
      </div>
      </>
  )
}

export default BookForm