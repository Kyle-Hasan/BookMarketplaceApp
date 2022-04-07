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
 const [genres,setGenres] = useState([
     "horror",
     "comedy"
 ])
 const [searchAuthors,setSearchAuthors] = useState([
    {
        Fname: "mD3icheal",
        Lname: "jons3SSon"
    }

 ])
 const [addAuthor,setAddAuthor] = useState(false)
 const [authorText,setAuthorText] = useState("")
 const [genreText,setGenreText] = useState("")
 const [addGenre,setAddGenre] = useState(false)
 const [authorSearch,setAuthorSearch] = useState("888")
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
     PublisherName:"",
     AuthorID:""
 })
 const onChangeAuthorText= (e)=>{
     console.log(authorText)
     setAuthorText(e.target.value)
 }
 const onChangeGenreText = (e)=>{
     setGenreText(e.target.value)
 }
 const genreButton = (e)=>{
     setAddGenre((oldState)=>{return !oldState})

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

 const genreDelete = (e)=>{
    let copy = genres.filter((author,index)=>{
        return index !== +e.target.value
     })
     setGenres(copy)

 }
 const authorClick = (e)=>{
     setAddAuthor(true)
 
 }
 const saveAuthor = (e)=>{
     console.log("hi  " + authorText)
     const s = authorText.split(',')
    for(let i = 0 ; i < authors.length;i++){
        if(authors[i].Fname === s[0] && authors[i].Lname === s[1]){
            return
        }
    }
    setAuthors((oldState)=>{return [...oldState,{Fname:s[0],Lname:s[1]}]})
    setAuthorText("")

 }
 const authorsChange = (e)=>{
    setAuthors((oldState)=>{return [...oldState,genreText]})
    setAuthorText("")
    
 }
<<<<<<< Updated upstream
 if(!localStorage.getItem("username")){
    return <><Navbar /><div>You arent logged in</div></>
  }
=======
 const saveGenre = (e)=>{

    setGenres((oldState)=>{return [...oldState,genreText]})
    setGenreText("")
     
}
const onAuthorSearchChange = (e)=>{
    setAuthorSearch(e.target.value)
}
>>>>>>> Stashed changes
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
              <label htmlFor="PublisherName" className="form-label">Publisher name</label>
              <div className = "d-flex justify-content-center ">
              <input onChange = {onChange} value = {bookInfo.PublisherName} type="text" className=" w-50 form-control" id="PublisherName" />
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

            <button className='btn btn-primary my-2' onClick = {!addAuthor? authorClick: saveAuthor}>{!addAuthor ? "Add author": " Save Author"}</button>
           {addAuthor &&  <><input onChange={onChangeAuthorText} value={authorText} class="form-control" list="datalistOptions" id="BookTitle" placeholder="Type to search for author by last name and first name" /><datalist id="datalistOptions">
                            {searchAuthors.map((author)=>(
                                    <option value={`${author.Fname}, ${author.Lname}`}/>
                            ))}
                          </datalist></>}
                          <h6>Genres </h6>
                          <ul>
                 {genres.map((genre,index)=>(
                     <li className='my-2'> {genre} <button onClick = {genreDelete} value= {index} className='btn btn-primary'>Delete</button></li>

                ))}
             </ul>
            
            <button className='btn btn-primary my-2' onClick = {!addGenre ? genreButton : saveGenre}>{!addGenre ? "Add genre" : "Save genre"}</button>
            {addGenre && <div className='d-flex justify-content-center mb-1'><label htmlFor="Genre" className="form-label me-1">Genre: </label><input  onChange={onChangeGenreText} value={genreText} type="text" className=" mx-1 w-50 form-control" id="Genre" placeholder='add genre' /></div> }
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