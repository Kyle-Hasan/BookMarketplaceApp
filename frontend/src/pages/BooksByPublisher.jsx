import React from 'react'
import Navbar from '../components/Navbar'
import BookList from '../components/BookList'
import axios from 'axios'
import {useParams} from 'react-router-dom'
import {useState,useEffect} from 'react'
function BooksByPublisher() {
    let { name } = useParams()

    const [books,setBooks] = useState([])

    useEffect(()=>{
        let isMounted = true
        const fetchData = async ()=>{
            try{
                const bookData = await axios.get("http://localhost:8000/books/publisher/",{
                    params:{
                        Publisher_Name:name
                    }
                })
                if(isMounted){
                    setBooks(bookData.data)
                }
            }
            catch(e){
                console.log(e)
            }
        }
        fetchData()
        return  ()=>{isMounted= false}
    },[])


  return (
    <div><Navbar/><h3 className='mt-1'>Books from {name}</h3><BookList books = {books} /></div>
  )
}

export default BooksByPublisher