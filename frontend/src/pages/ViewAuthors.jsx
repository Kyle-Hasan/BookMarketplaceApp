import React from 'react'
import AuthorList from '../components/AuthorList'
import Navbar from '../components/Navbar'
import {useState,useEffect} from 'react'
import axios from 'axios'
function ViewAuthors() {
  const[authors,setAuthors] = useState([])
  useEffect(()=>{
      let isMounted = true
      const fetchData = async()=>{
          const a = await axios.get("http://localhost:8000/author/")
          if(isMounted){
          setAuthors(a.data)
          }
      }
      fetchData()
      return ()=>{isMounted=false}

  },[])
  return (
    <div><Navbar/><AuthorList authors={authors}/></div>
  )
}

export default ViewAuthors