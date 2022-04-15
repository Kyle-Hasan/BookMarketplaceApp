import React from 'react'
import axios from 'axios'
import {useEffect,useState} from 'react'
import {useParams} from 'react-router-dom'
import Navbar from '../components/Navbar'

import PublisherList from '../components/PublisherList'
function SearchPublisher() {
    const {text} = useParams()
    const [publishers,setPublishers] = useState([])
    useEffect(()=>{
        let isMounted = true
        const fetchData = async()=>{
            const d = await axios.get("http://localhost:8000/publisher/",{
                params:{
                    Name:text
                }
            })
            if(isMounted){
                setPublishers(d.data)
            }

        }
        fetchData()


        return ()=>{return isMounted= false}


    },[])
  return (
    <div><Navbar/><h1 className='mt-1'>Search for: {text}</h1><PublisherList publishers={publishers}/></div>
  )
}

export default SearchPublisher