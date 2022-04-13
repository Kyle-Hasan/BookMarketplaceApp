import React from 'react'
import axios from 'axios'
import {useEffect,useState} from 'react'
import {useParams} from 'react-router-dom'
import Navbar from '../components/Navbar'
import AuthorList from '../components/AuthorList'
function SearchAuthor() {
    const {text} = useParams()
    const [authors,setAuthors] = useState([])
    useEffect(()=>{
        let isMounted = true
        const fetchData = async()=>{
            const bookData = await axios.get("http://localhost:8000/author/",{
                params:{
                    Name:text
                }
            })
            if(isMounted){
                setAuthors(bookData.data)
            }

        }
        fetchData()


        return ()=>{return isMounted= false}


    },[])
  return (
    <div><Navbar/><AuthorList authors={authors}/></div>
  )
}

export default SearchAuthor