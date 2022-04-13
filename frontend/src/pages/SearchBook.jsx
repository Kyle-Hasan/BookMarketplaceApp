import React from 'react'
import axios from 'axios'
import {useEffect,useState} from 'react'
import {useParams} from 'react-router-dom'
import Navbar from '../components/Navbar'
import BookList from '../components/BookList'
function SearchBook() {
    const {text} = useParams()
    const [books,setBooks] = useState([])
    useEffect(()=>{
        let isMounted = true
        const fetchData = async()=>{
            const bookData = await axios.get("http://localhost:8000/book/",{
                params:{
                    Title:text
                }
            })
            if(isMounted){
                setBooks(bookData.data)
            }

        }
        fetchData()


        return ()=>{return isMounted= false}


    },[])
  return (
    <div><Navbar/><BookList books={books} setBooks={setBooks}/></div>
  )
}

export default SearchBook