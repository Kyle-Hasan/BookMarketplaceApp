import React from 'react'
import PublisherList from '../components/PublisherList'
import Navbar from '../components/Navbar'
import {useState,useEffect} from 'react'
import axios from 'axios'
function ViewPublishers() {
  const[publishers,setPublishers] = useState([])
  useEffect(()=>{
      let isMounted = true
      const fetchData = async()=>{
          const a = await axios.get("http://localhost:8000/publisher/")
          if(isMounted){
          setPublishers(a.data)
          }
      }
      fetchData()
      return ()=>{isMounted=false}

  },[])
  return (
    <div><Navbar/><PublisherList publishers={publishers}/></div>
  )
}

export default ViewPublishers