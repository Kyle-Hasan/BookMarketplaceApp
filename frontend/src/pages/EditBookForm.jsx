import React from 'react'
import Navbar from '../components/Navbar'
import {useState} from 'react'
import Axios from 'axios'
import {useNavigate,useParams} from 'react-router-dom'
import { useEffect } from 'react'
import axios from 'axios'
function EditBookForm() {
let { id } = useParams()
const navigate=  useNavigate()
 const [error,setError] = useState("")
 const [authors,setAuthors] = useState([
    
 ])
 const [genres,setGenres] = useState([
 ])
 const [originalGenres,setOrginalGenres] = useState([

 ])
 const [originalAuthors,setOriginalAuthors] = useState([])
 const [searchAuthors,setSearchAuthors] = useState([
])
 const [addAuthor,setAddAuthor] = useState(false)
 const [authorText,setAuthorText] = useState("")
 const [genreText,setGenreText] = useState("")
 const [addGenre,setAddGenre] = useState(false)
 const [authorSearch,setAuthorSearch] = useState("")
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
     
 })
 const onChangeAuthorText= (e)=>{
     
    setAuthorText(e.target.value)
    let r = document.getElementById("datalist-input").value;
    
    let dd = document.querySelector("#datalistOptions option[value='"+r+"']").dataset.value
    setAuthorID(dd)
   

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
        console.log("ENTERED SUBMIT FUNCTION")
        console.log(e)
        const data = await axios.patch(`http://localhost:8000/book/?BookID=${id}`,bookInfo)

        setBookInfo(data.data)

        let genresToDelete = []
        for(let genre of originalGenres){
           const found = genres.find(element => element===genre)
           if(!found){
               genresToDelete.push(genre)
           }
        }

        for(let genre of genresToDelete){
            await axios.delete("http://localhost:8000/genre/book/",{
                params:{
                    BookID:id,
                    BookGenre:genre

                }
            })

        }

        for(let genre of genres){
            if(!originalGenres.find(element=>element===genre)){
                await axios.post('http://localhost:8000/genre/book/',{
                   
                        BookID:id,
                        BookGenre:genre
                
                })
            }
        }

        let authorsToDelete = []
        for(let author of originalAuthors){
           const found = authors.find(element => element===author)
           if(!found){
               authorsToDelete.push(author)
           }
        }

        for(let author of authorsToDelete){
            await axios.delete("http://localhost:8000/writes/",{
                params:{
                    BookID:id,
                    AuthorID:author.AuthorID

                }
            })

        }

        for(let author of authors){
            console.log(author)
            if(!originalAuthors.find(element=>element.AuthorID===author.AuthorID)){
                console.log(author.AuthorID + " in the post ")
                console.log("hello in author")
             await axios.post(`http://localhost:8000/writes/`,{
                 BookID:id,
                 AuthorID:+author.AuthorID

             })
            }
        }


        navigate("/")

    }
    catch(e){
        console.log(e)
        setError("Error")
    }

 }
 const saveGenre = (e)=>{
    if(genreText.length > 0){
        setGenres((oldState)=>{return [...oldState,genreText]})
      
        setGenreText("")
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
 

 useEffect(()=>{
     let isMounted = true
     let fetchData = async()=>{
         if(localStorage.getItem("AdminFlag") !== "true"){
             return
         }
         try{
            const data = await axios.get('http://localhost:8000/book/',{
                params: {
                  BookID:id
                }
              })
         const g = await axios.get("http://localhost:8000/genre/book/",{
             params:{
                 BookID:id
             }
         })
         const allA = await axios.get("http://localhost:8000/author/")
         const wr = await axios.get("http://localhost:8000/writes/",{
             params:{
                 BookID:id
             }
         })
         if(isMounted){
         console.log(data.data)
         setBookInfo(data.data)
         setGenres(g.data)
         setOrginalGenres(g.data)
         setOriginalAuthors(wr.data)
         setAuthors(wr.data)
         setAllAuthors(oldState=>{
            const f= allA.data.filter((author)=>
            !authors.includes(author)
             )
             return f
         })
         }
        }
        catch(err){
            console.log(error)
        }
     }
     fetchData()
     return ()=>{isMounted=false}
 },[])
 if(localStorage.getItem("AdminFlag") !== "true"){
    return <><Navbar /><div>You can't view this</div></>
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
                     <li>{author.LName} , {author.FName} <button onClick = {authorDelete} value= {index} className='btn btn-primary'>Delete</button></li>

                ))}
             </ul>

            <button type="button" className='btn btn-primary my-2' onClick = {!addAuthor? authorClick: saveAuthor}>{!addAuthor ? "Add author": " Save Author"}</button>
           {addAuthor &&  <><input onChange={onChangeAuthorText} value={authorText} class="form-control" list="datalistOptions" id="datalist-input"placeholder="Type to search for author by last name and first name" />
           <datalist id="datalistOptions">
                            {allAuthors.map((author)=>(
                                    <option value={`${author.FName}, ${author.LName}`} data-value={author.AuthorID}/>
                            ))}
                          </datalist></>}
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

export default EditBookForm