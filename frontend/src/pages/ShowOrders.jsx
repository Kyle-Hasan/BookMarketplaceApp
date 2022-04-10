import React from 'react'
import Navbar from '../components/Navbar'
import OrderList from "../components/OrderList"
import {useEffect,useState} from 'react'
import axios from 'axios'
function ShowOrders() {
    const [rentals,setRentals] = useState([])
    const [purchases,setPurchases] = useState([])
    useEffect(()=>{
      
      let isMounted = false
      const fetchData = async()=>{
        try{
          const rentalData = await axios.get("http://localhost:8000/rentaldetail/",{
            params:{
              User_Email:localStorage.getItem("username")
            }
    
          })
          const purchaseData = await axios.get("http://localhost:8000/purchasedetail/",{
            params:{
              User_Email:localStorage.getItem("username")
            }
    
          })
          setRentals(rentalData.data)
        
          setPurchases(purchaseData.data)
          console.log(rentalData.data)
          console.log(purchaseData.data)
        }
        catch(e){
          console.log(e)
        }
      }
      fetchData()
      return ()=>{isMounted=false}
    }
    ,[]
      
      )
  return (
    <div><Navbar/><OrderList purchases = {purchases} rentals=  {rentals}/></div>
  )
}

export default ShowOrders