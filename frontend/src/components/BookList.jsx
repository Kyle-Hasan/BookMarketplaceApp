import axios from 'axios'
import React from 'react'
import {Link} from 'react-router-dom'
import {useState} from 'react'
import Navbar from './Navbar'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
function BookList({books,setBooks}) {

    const [sortRating,setSortRating] = useState(false)
    const [sortSalePrice,setSalePrice] = useState(false)
    const [sortRentPrice,setRentPrice] = useState(false)
    const [sortStock,setSortStock] = useState(false)
    const [sortTitle,setSortTitle] =  useState(false)
    console.log(books) 
    const deleteBook = async(e)=>{
        try{
        const toBeDeleted = +e.target.value

        let copy = books.filter((book)=>{
           return book.BookID != toBeDeleted
        })
        setBooks(copy)
        books =copy
        await axios.delete("http://localhost:8000/book/",{
            params:{
                BookID:toBeDeleted}
        })
    }
    catch(error){
        console.log(error)
    }
    }
  if(books.length === 0){
   return(   <div>
          
          There are no books
      </div>)
  }
  const onRating = ()=>{
      if(sortRating){
        books.sort((book1,book2)=>{
            return book2.Rating - book1.Rating
        })
        console.log(books)
          setSortRating(false)

      }
      else{
        books.sort((book1,book2)=>{
            return book1.Rating - book2.Rating
        })
        


        setSortRating(true)

      }

  }

  const onSalePrice = ()=>{
    if(sortSalePrice){
        books.sort((book1,book2)=>{
            return book2.SalePrice- book1.SalePrice
        })
        console.log(books)
          setSalePrice(false)

      }
      else{
        books.sort((book1,book2)=>{
            return book1.SalePrice - book2.SalePrice
        })
        


        setSalePrice(true)

      }

  }

  const onRentPrice = ()=>{
    if(sortRentPrice){
        books.sort((book1,book2)=>{
            return book2.RentPrice - book1.RentPrice
        })
        console.log(books)
          setRentPrice(false)

      }
      else{
        books.sort((book1,book2)=>{
            return book1.RentPrice - book2.RentPrice
        })
        


        setRentPrice(true)

      }

  }
  const onStock = ()=>{
    if(sortStock){
        books.sort((book1,book2)=>{
            return book2.Stock - book1.Stock
        })
        console.log(books)
          setSortStock(false)

      }
      else{
        books.sort((book1,book2)=>{
            return book1.Stock - book2.Stock
        })
        


        setSortStock(true)

      }

  }
  const onTitle = ()=>{
    if(sortTitle){
        books.sort((book1,book2)=>{
            return book1.Title.localeCompare(book2.Title)
        })
        console.log(books)
          setSortTitle(false)

      }
      else{
        books.sort((book1,book2)=>{
            return book2.Title.localeCompare(book1.Title)
        })
        


        setSortTitle(true)

      }

  }
  return (
    <table className='table table-dark mt-2 container'>
        <thead>
        <caption>Books</caption>
            <tr>
            
            <th>Image</th>
            <th>Title{sortTitle ? <i onClick={onTitle} className="fas fa-arrow-up mx-1"></i>:<i onClick={onTitle} className="fas fa-arrow-down mx-1"></i>}</th>
            <th>Book ID</th>
            <th>Rent Price{sortRentPrice ? <i onClick={onRentPrice} className="fas fa-arrow-up mx-1"></i>:<i onClick={onRentPrice} className="fas fa-arrow-down mx-1"></i>}</th>
            <th>Sale Price{sortSalePrice? <i onClick={onSalePrice} className="fas fa-arrow-up mx-1"></i>:<i onClick={onSalePrice} className="fas fa-arrow-down mx-1"></i>}</th>
            <th>Stock{sortStock? <i onClick={onStock} className="fas fa-arrow-up mx-1"></i>:<i onClick={onStock} className="fas fa-arrow-down mx-1"></i>}</th>
            <th>Rating{sortRating ? <i onClick={onRating} className="fas fa-arrow-up mx-1"></i>:<i onClick={onRating} className="fas fa-arrow-down mx-1"></i>}</th>
            
            </tr>
        </thead>
        <tbody>
            {
                books.map((book)=>(
                    <tr>
                        <td><img className = "comment-img" src={book.Image}/></td>
                        <td><Link to = {`/book/${book.BookID}`}> {book.Title}</Link></td>
                        <td>{book.BookID}</td>
                        <td>{book.RentPrice}</td>
                        <td>{book.SalePrice}</td>
                        <td>{book.Stock}</td>
                        <td>{book.Rating}</td>
                        {JSON.parse(localStorage.getItem('AdminFlag')) && <>
                        <td><button onClick = {deleteBook} value = {book.BookID} className='btn btn-primary'>Delete</button></td>
                        <td><Link to= {`/editBook/${book.BookID}`}>Edit</Link></td>
                        </>}
                    </tr>
                ))
            }

        </tbody>

        </table>
  )
}

export default BookList