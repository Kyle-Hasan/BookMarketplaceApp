import axios from 'axios'
import React from 'react'
import { useState,useEffect } from 'react'
import BookList from '../components/BookList'
import Navbar from '../components/Navbar'

function AllBooks() {
  const [books,setBooks] = useState([
  ])
  useEffect(
 ()=>{ 
  let isMounted = true
  let fetchData = async ()=>{
    try{
    const data = await axios.get("http://localhost:8000/book/")
    if(isMounted){
    setBooks(data.data)
    }
  }
  catch(error){

  }
  }
     fetchData()
  
    return ()=>(isMounted= false)
  
   },[] )
  return (
    <><Navbar></Navbar><div className='container'>
      <BookList books={books} setBooks = {setBooks}/>
      </div></>
  )
}

export default AllBooks