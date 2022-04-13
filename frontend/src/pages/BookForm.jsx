import React from 'react'
import Navbar from '../components/Navbar'
import {useState,useEffect} from 'react'
import Axios from 'axios'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import UseSearchDebounced from './UseSearchDebounced'
function BookForm() {
 const navigate = useNavigate()
 const [error,setError] = useState("")
 const [authors,setAuthors] = useState([
 ])
 const [genres,setGenres] = useState([
    
 ])
 const [searchAuthors,setSearchAuthors] = useState([
 ])
 const [addAuthor,setAddAuthor] = useState(false)
 const [authorText,setAuthorText] = useState("")
 const [genreText,setGenreText] = useState("")
 const [addGenre,setAddGenre] = useState(false)
 const [authorSearch,setAuthorSearch] = useState("888")
 const [authorID,setAuthorID] = useState(-1)
 const [allAuthors,setAllAuthors] = useState([])
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
 const authorApiSearch = async(text)=>{
    return await axios.get("http://localhost:8000/author/",{
        params:{
            Name:text
        }
    })
 }
 const searchADebounced = ()=> UseSearchDebounced(text=>authorApiSearch(text),200)
 const a= searchADebounced();
 const aText = a.input
 const setAText = a.setInput
 const aResults = a.results

 const publisherApiSearch = async(text)=>{
    return await axios.get("http://localhost:8000/publisher/",{
        params:{
            Name:text
        }
    })

 }
 const searchPDebounced = ()=> UseSearchDebounced(text=>publisherApiSearch(text),200)
 const p = searchPDebounced(text=>publisherApiSearch(text),200)
 const pText = p.input
 const setPText = p.setInput
 const pResults = p.results
 const onChangeAuthorText= async (e)=>{
     
     setAuthorText(e.target.value)
     setAText(e.target.value)
     console.log(aResults)
     
     
     let r = document.getElementById("datalist-input").value;
    try{
     let dd = document.querySelector("#datalistOptions option[value='"+r+"']").dataset.value
     setAuthorID(dd)
     
    }
    catch{

    }
    
    

 }
 const onChangePublisherText= async (e)=>{
     
    
    setPText(e.target.value)
    console.log(pResults)
   
   

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
 const onSubmit = async(e)=>{
     e.preventDefault()
     try{
        if(bookInfo.Title.length === 0 || pText.length === 0){
            setError("Cannot be blank")
            return 
        }
        else if(!pResults.result.data.find((p)=>{ return p.Name===pText})){
            setError("Invalid publisher")
            return
        }
        const data =  await axios.post("http://localhost:8000/book/", {
             ReleaseYear:bookInfo.ReleaseYear,
             PageCount:bookInfo.PageCount,
             RentPrice:bookInfo.RentPrice,
             Title:bookInfo.Title,
             SalePrice:bookInfo.SalePrice,
             Rating:bookInfo.Rating,
             Stock:bookInfo.Stock,
             Damage:bookInfo.Damage,
             LocationID:1,
             Publisher_Name : pText,
             Image:bookInfo.Image,
             Description:bookInfo.Description
         })
         
         for(let genre of genres){
             await axios.post(`http://localhost:8000/genre/book/`,{
                 BookID:data.data,
                 BookGenre: genre
             })
         }
         for(let author of authors){
             console.log("hello in author")
             await axios.post(`http://localhost:8000/writes/`,{
                 BookID:data.data,
                 AuthorID:author.AuthorID

             })
         }
         navigate('/confirmAddBook')
     }

     catch(error){
         console.log(error)
        setError("Error adding this book")
     }
    

 }
 const authorDelete = (e)=>{
     setAllAuthors((oldState)=>{
         return [...oldState,authors[+e.target.value]]
     })
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
    console.log(e.target)
    console.log("reached here")
    if( authorID !==-1){
    setAuthors((oldState)=>{return [...oldState,{FName:s[0],LName:s[1],AuthorID:authorID}]})
    console.log(authorID)
   
    setAllAuthors((oldState)=>{
        const f= oldState.filter((author)=>
       author.AuthorID !== +authorID
         )
         return f
     })
     setAuthorText("")
     setAuthorID(-1)
    }

 }
 const authorsChange = (e)=>{

    setAuthors((oldState)=>{return [...oldState,genreText]})
    setAuthorText("")
    
 }

 const saveGenre = (e)=>{
    if(genreText.length > 0){
    setGenres((oldState)=>{return [...oldState,genreText]})
  
    setGenreText("")
    }
     
}
const onAuthorSearchChange = (e)=>{
    setAuthorSearch(e.target.value)
}
useEffect(()=>{
    let isMounted = true
    if(!localStorage.getItem("username")){
        return
    }
    const fetchData = async()=>{
        try{
            const allA = await axios.get("http://localhost:8000/author/")
            if(isMounted){
            setAllAuthors(()=>{
               const f= allA.data.filter((author)=>
               !authors.includes(author)
                )
                return f
            })
            console.log(allA.data)
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
              <input onChange={onChangePublisherText} value={pText} className="w-50 form-control" list="datalistOptions2" id="PublisherName"placeholder="search publisher name" />
           <datalist id="datalistOptions2">
                            {pResults.result && pResults.result.data && (pResults.result.data.map((p)=>(
                                 <option key={p.Name} value={p.Name} />
                            )))}
                          </datalist>
              </div>
          </div>
          <div className="mb-3 ">
              <label htmlFor="PageCount" className="form-label">Page Count</label>
              <div className = "d-flex justify-content-center ">
              <input onChange = {onChange} value = {bookInfo.PageCount} min= "1" type="number" className=" w-50 form-control" id="PageCount" />
              </div>
          </div>
          <div className="mb-3 ">
              <label htmlFor="Stock" min="0" className="form-label">Stock</label>
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
              <label htmlFor="Rating"  className="form-label">Rating </label>
              <div className = "d-flex justify-content-center ">
              <input onChange = {onChange} value = {bookInfo.Rating} min= "0" max="10" type="number" className=" w-50 form-control" id="Rating" />
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
                     <li>{author.LName} , {author.FName} <button onClick = {authorDelete} value= {index} className='btn btn-primary'>Delete</button></li>

                ))}
             </ul>

            <button type="button" className='btn btn-primary my-2' onClick = {!addAuthor? authorClick: saveAuthor}>{!addAuthor ? "Add author": " Save Author"}</button>
           {addAuthor &&  <div className='d-flex justify-content-center'><input onChange={onChangeAuthorText} value={aText} class="form-control w-50" list="datalistOptions" id="datalist-input"placeholder="Type to search for author by last name and first name" />
           <datalist id="datalistOptions">
                            {aResults.result && aResults.result.data && (aResults.result.data.map((author)=>(
                                  !authors.find((a)=>a.AuthorID==author.AuthorID) && <option key={author.AuthorID} value={`${author.FName}, ${author.LName}`} data-value={author.AuthorID}/>
                            )))}
                          </datalist></div>}
                          <h6>Genres </h6>
                          <ul>
                 {genres.map((genre,index)=>(
                     <li className='my-2'> {genre} <button onClick = {genreDelete} value= {index} className='btn btn-primary'>Delete</button></li>

                ))}
             </ul>
            
            <button type="button" className='btn btn-primary my-2' onClick = {!addGenre ? genreButton : saveGenre}>{!addGenre ? "Add genre" : "Save genre"}</button>
            {addGenre && <div className='d-flex justify-content-center mb-1'><label htmlFor="Genre" className="form-label me-1">Genre: </label>
            <input  onChange={onChangeGenreText} value={genreText} type="text" className="justify-content-center mx-1 w-50 form-control" id="Genre" placeholder='add genre' /></div> }
            <div>
          <button type="submit" className="btn btn-secondary">Submit</button>
          </div>
      </form>
     {error.length !== 0 && <p className='mt-1 text-danger'>{error}</p>}
     
     </div>
     </div>
      </div>
      </>
  )
}

export default BookForm