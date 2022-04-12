import React from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
function Wishlist({books,setBooks}) {
  const deleteBook = async(e)=>{
    try{
    const toBeDeleted = +e.target.value

    
    await axios.delete("http://localhost:8000/wishlist/user/",{
        data:{
            BookID:toBeDeleted,
            User_Email:localStorage.getItem("username")
          }
    })
    let copy = books.filter((book)=>{
      return book.BookID != toBeDeleted
   })
   setBooks(copy)
   books =copy
}
catch(error){
    console.log(error)
}
}

  return (
    
      <table className='table table-dark mt-2 container'>
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
                          {localStorage.getItem("username") && <>
                          <td><button onClick = {deleteBook} value = {book.BookID} className='btn btn-primary'>Delete</button></td>
                          
                          </>}
                      </tr>
                  ))
              }
  
          </tbody>
  
          </table>
    )
  
}

export default Wishlist