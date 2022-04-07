import React from 'react'
import Navbar from '../components/Navbar'
import BookList from "../components/BookList"
import {useEffect,useState} from 'react'
function ShowOrders() {
    const [rentals,setRentals] = useState([])
    const [purchases,setPurchases] = useState([])
  return (
    <div><Navbar/><BookList purchases = {purchases} rentals=  {rentals}/></div>
  )
}

export default ShowOrders