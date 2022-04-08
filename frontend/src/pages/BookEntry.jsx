import React from "react";
import Navbar from "../components/Navbar";
import { useNavigate, useParams, Link, Navigate } from "react-router-dom";
import { useEffect, useState } from "react";
import ReviewForm from "../components/ReviewForm";
import axios from "axios";

function BookEntry() {
  let { id } = useParams()
  const [quantity, setQuanity] = useState(1);
  const navigate = useNavigate()
  const [checkoutOption, setCheckoutOption] = useState("Buy");
  const [edited,setEdited] = useState(null)
  const [bookInfo, setBookInfo] = useState({
    BookID:23,
    Title: "Title of book ",
    releaseYear: 0,
    pageCount: 0,
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
    rentPrice: 8,
    salePrice: 9,
    rating: 9,
    
    location: "example location",
    picture: "",
    
    publisher: "example publisher",
    image:"https://cdn.donmai.us/original/75/9c/__akame_akame_ga_kill_drawn_by_taturouxs__759c426ac9e6c4b899939435d051b704.jpg",
    stock: 4,
    damage: "new",
    Image:""
  });
  const [authors,setAuthors] = useState([])
  const [genres,setGenres] = useState([])
  const [reviews,setReviews] = useState([{
    username: "username",
    rating:10,
    review:"dkdkdkdk",
    date:"8/3/2001",
    ID:3
  }])

  const [editText,setEditText] = useState("")
  const [writeReview,setWriteReview] = useState(false)
  const [totalPrice, setTotalPrice] = useState(0);
  const changeQuanity = (e) => {
    setQuanity(e.target.value);
    console.log("hi");
    if (checkoutOption) {
      setTotalPrice(e.target.value * bookInfo.SalePrice);
    } else {
      setTotalPrice(e.target.value * bookInfo.RentPrice);
    }
  };
  
  const onSubmit = () => {
    if (quantity > 0) {
      //deal with placing order
      sessionStorage.setItem("orderInfo", JSON.stringify({
        Title: bookInfo.Title,
        BookID: bookInfo.BookID,
        Stock:quantity,
        Option:checkoutOption,
        Image:bookInfo.image,
        Price:totalPrice


      }))
      navigate("/checkout")
    }
  }
  const deleteReview = (e)=>{
    setEdited(null)
    const deleted = +e.target.value
      setReviews((oldState)=>{
        return oldState.filter((r)=>{
          return r.ID != deleted
        })
      })


  }

  const changeOption = (e)=> {
    setCheckoutOption(e.target.value)
    if(e.target.value === "Buy"){
      setTotalPrice(quantity*bookInfo.SalePrice)
    }
    else {
      setTotalPrice(quantity*bookInfo.RentPrice)
    }
  }

  const saveEdit = (e)=>{
    setEdited(null)
    let copy = []
    for(let i = 0 ; i < reviews.length;i++){
    
      copy.push(reviews[i])
      if(i === +e.target.value){
        copy[i].review = editText
      }
    }
    setReviews(copy)
    setEditText("")
  }

  const enableEdit = (e)=>{
      setEdited(+e.target.value)
      setEditText(reviews[+e.target.value].review)
  }
  const changeEditText = (e)=>{
    setEditText(e.target.value)
  }

  let authorsList = [];
  for (let i = 0; i < authors.length; i++) {
    if (i !== authors.length - 1) {
      console.log("author");
      authorsList.push(
        <Link
          key={authors[i].id}
          to={`/authors/${authors[i].id}`}
          style={{ textDecoration: "none" }}
        >
          {" "}
          {bookInfo.authors[i].name},{" "}
        </Link>
      );
    } else {
      authorsList.push(
        <Link
          key={authors[i].id}
          to={`/authors/${authors[i].id}`}
          style={{ textDecoration: "none" }}
        >
          {" "}
          {authors[i].name}{" "}
        </Link>
      );
    }
  }
  console.log(authorsList.length);
  const reviewButtonClick = (e)=>{
    setWriteReview(oldState=>!oldState)
  }
  useEffect(()=>{
    let isMounted = true
    const fetchData = async()=>{
      const data = await axios.get('http://localhost:8000/book/',{
        params: {
          BookID:id
        }
      })
      const data2 = await axios.get('http://localhost:8000/genre/book/',{
        params: {
          BookID:id
        }
      })
      if(isMounted){
      console.log(data.data)
      setBookInfo(data.data)
      setGenres(data2.data)
      setTotalPrice(data.data.SalePrice)
      }

    }
    fetchData()
    return (()=> {isMounted = false})

  },[])
  return (
    <>
      <Navbar></Navbar>
      <div className="container">
        <div className="row mt-3">
          <div className="row mt-1 ">
            <div className="col-md-3  border-dark">
              <img
                src={bookInfo.Image}
                className="img-fluid border border-dark mb-2"
              />
              <h5>Book information</h5>
             <table class="table">

              <tbody>
                <tr>
                  <th>Official Title: </th>
                  <td>{bookInfo.Title}</td>
                </tr>
                <tr>
                  <th>Publisher: </th>
                  <td>{bookInfo.Publisher_Name}</td>
                </tr>
                <tr>
                  <th>Genres: </th>
                  <td>{genres.join(", ")}</td>
                </tr>
                <tr>
                  <th>Page Count: </th>
                  <td>{bookInfo.PageCount}</td>
                </tr>
                <tr>
                  <th>Release Year: </th>
                  <td>{bookInfo.ReleaseYear}</td>
                </tr>
                <tr>
                  <th>Location: </th>
                  <td>{bookInfo.LocationID}</td>
                </tr>
                <tr>
                  <th>Damage: </th>
                  <td>{bookInfo.Damage}</td>
                </tr>
              </tbody>
              </table>
            </div>
            <div className="col-md-5">
              <h1 className="text-center "> {bookInfo.Title} </h1>
              <span><b>By:</b> </span>
              {authorsList}
              <div class><b>Rating :</b> {bookInfo.Rating}</div>
              <div><b>In stock: </b>{bookInfo.Stock}</div>
            { localStorage.getItem("username") &&  <div className="d-flex justify-content-center mt-2">
                <input
                  type="radio"
                  className="btn-check mx-1"
                  name="options"
                  id="buy"
                  autocomplete="off"
                  onChange = {changeOption}
                  checked = {checkoutOption === "Buy"}
                  value = "Buy"
                />
                <label class="btn btn-primary mx-1" for="buy">
                  Buy price: {bookInfo.SalePrice}$
                </label>

                <input
                  type="radio"
                  className="btn-check mx-1"
                  name="options"
                  id="rent"
                  autocomplete="off"
                  onChange = {changeOption}
                  checked = {checkoutOption === "Rent"}
                  value = "Rent"
                />
                <label class="btn btn-primary mx-1" for="rent">
                 Rent price: {bookInfo.RentPrice}$
                </label>

              
              </div>}
              <p className="mt-3">
                <h6>Synopsis</h6>
                {bookInfo.Description}
              </p>
            </div> 
            <div className="col-md-3 ms-1">
              <div className="card">
                <div className="card-header">Currently Selected</div>
                <div className="card-body">
                  <form onSubmit={onSubmit}>
                    <div className="text-start">
                      Option: {checkoutOption}
                    </div>
                    <div className="my-1 d-flex">
                      <label htmlFor="quanity" className="form-label me-1">
                        Quanity:{" "}
                      </label>
                      <input
                        value={quantity}
                        onChange={changeQuanity}
                        type="number"
                        id="quanity"
                        className="w-25 ms-1 form-control"
                        min="1"
                        max={bookInfo.stock}
                      />
                    </div>
                    <div class="text-start mb-1">
                      Total price: {totalPrice}$
                    </div>
                    <button type="submit" className="btn btn-dark mt-1">
                      Add to order
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </div>
          <div className="row mt-1 justify-content-center">
            <h6>Reviews </h6>
            {writeReview ?  <><button onClick={reviewButtonClick} className="btn btn-primary review-button">Cancel</button><ReviewForm setReviews = {setReviews} setWriteReview = {setWriteReview}></ReviewForm></>: <button onClick = {reviewButtonClick}className="btn btn-primary review-button">Add a review</button>}
            <ul className = "list-group mt-2" >
             
              
             {reviews.map((review,index)=>(
               <li className="card list-group-item">
               <div className="card-body">

                <img className = 
                "img-responsive comment-img me-2"  src = "https://64.media.tumblr.com/8b920a4af835ef5f38deaae90ef2c95c/2e9ae72b084d1dd9-b3/s1280x1920/b8f570cd0c43b41c1c9e42f97518e2953bb060f6.png"/>
                <a href = "#" className="card-title">{review.username}</a>
                 <div>
                 <span className="card-subtitle mb-2 text-muted pe-4">{review.date}</span>
                 <span className = "card-subtitle mb-2 text-muted">Rating: {review.rating}</span>
               </div>
                {localStorage.getItem("username") === review.username && edited===index 
                ?<input onChange={changeEditText} value = {editText} className="card-text"/> :<p className="card-text">{review.review}</p>}
                {localStorage.getItem("username") === review.username &&
                <div className = "d-flex justify-content-center"><button value= {review.ID} onClick={deleteReview} className="btn btn-primary mx-2">Delete</button> 
                <button value = {index} onClick= {edited ? saveEdit : enableEdit} className="btn btn-primary">{edited ? "Save"  : "Edit"}</button>
                </div> 
                  }
               </div>
               </li>
             ))}
                
                

            </ul>
          </div>
        </div>
        
      </div>
    </>
  );
}

export default BookEntry;
