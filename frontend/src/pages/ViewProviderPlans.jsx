import React from 'react'

import Navbar from '../components/Navbar'
import {useState,useEffect} from 'react'
import axios from 'axios'
import { useParams } from 'react-router-dom'
import PlanList from '../components/PlanList'
function ViewProviderPlans() {
let { name } = useParams()
  const[plans,setPlans] = useState([])
  useEffect(()=>{
      let isMounted = true
      const fetchData = async()=>{
          const a = await axios.get("http://localhost:8000/insuranceplan/",{
              params:{
                  ProviderName:name
              }
          })
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

export default ViewProviderPlans