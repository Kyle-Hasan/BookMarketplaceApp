import axios from 'axios'
import React from 'react'
import {useState,useEffect} from 'react'
import Navbar from '../components/Navbar'
import Wishlist from '../components/Wishlist'
function ViewWishlist() {
  const [books,setBooks] = useState([])
  useEffect((
  )=>{
    let isMounted = true
    const fetchData = async()=>{
        let bookData = await axios.get("http://localhost:8000/wishlist/user/",{
            params:{
                User_Email:localStorage.getItem("username")
            }
        })
        if(isMounted){
            setBooks(bookData.data)
        }
    }
    if(localStorage.getItem("username")){
    fetchData()
    }

    return ()=>{isMounted=false}
  },[])
  if(!localStorage.getItem("username")){
      <div><Navbar/> you can't view this</div>
  }
  return (
    <div><Navbar/><h1 className='my-1'>Your wishlist</h1><Wishlist books={books} setBooks={setBooks}/></div>
  )
}

export default ViewWishlist