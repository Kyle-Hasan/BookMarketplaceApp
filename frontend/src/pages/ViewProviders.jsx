import React from 'react'

import Navbar from '../components/Navbar'
import {useState,useEffect} from 'react'
import axios from 'axios'
import ProviderList from '../components/ProviderList'
function Viewproviders() {
  const[providers,setProviders] = useState([])
  useEffect(()=>{
      let isMounted = true
      const fetchData = async()=>{
          const a = await axios.get("http://localhost:8000/insuranceprovider/")
          if(isMounted){
          setProviders(a.data)
          }
      }
      fetchData()
      return ()=>{isMounted=false}

  },[])
  return (
    <div><Navbar/><ProviderList providers={providers}/></div>
  )
}

export default Viewproviders