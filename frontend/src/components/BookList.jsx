import React from 'react'
import {Link} from 'react-router-dom'
import Navbar from './Navbar'
function BookList({books,setBooks}) {
    console.log(books)
    const deleteBook = (e)=>{
        const toBeDeleted = +e.target.value

        let copy = books.filter((book)=>{
           return book.BookID != toBeDeleted
        })
        setBooks(copy)
        books =copy
    }
  if(books.length === 0){
   return(   <div>
          
          There are no books
      </div>)
  }
  return (
    <table className='table table-dark mt-2'>
        <thead>
            <tr>
            <th>Image</th>
            <th>Title</th>
            <th>Book ID</th>
            <th>Rent Price</th>
            <th>Sale Price</th>
            <th>Stock</th>
            <th>Rating</th>
            
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
                        {!localStorage.getItem("admin") && <>
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