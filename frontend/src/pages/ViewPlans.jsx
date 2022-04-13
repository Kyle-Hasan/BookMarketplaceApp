import React from 'react'
import AuthorList from '../components/AuthorList'
import Navbar from '../components/Navbar'
import {useState,useEffect} from 'react'
import axios from 'axios'
import PlanList from '../components/PlanList'
function ViewPlans() {
  const[plans,setPlans] = useState([])
  useEffect(()=>{
      let isMounted = true
      const fetchData = async()=>{
          const a = await axios.get("http://localhost:8000/insuranceplan/")
          if(isMounted){
          setPlans(a.data)
          }
      }
      fetchData()
      return ()=>{isMounted=false}

  },[])
  return (
    <div><Navbar/><PlanList plans={plans}/></div>
  )
}

export default ViewPlans