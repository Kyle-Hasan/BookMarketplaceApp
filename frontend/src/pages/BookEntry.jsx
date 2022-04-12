import React from "react";
import Navbar from "../components/Navbar";
import { useNavigate, useParams, Link, Navigate } from "react-router-dom";
import { useEffect, useState } from "react";
import ReviewForm from "../components/ReviewForm";
import axios from "axios";

function BookEntry() {
  let { id } = useParams();
  const [quantity, setQuanity] = useState(0);
  const navigate = useNavigate();
  const [checkoutOption, setCheckoutOption] = useState("Buy");
  const [edited, setEdited] = useState(null);
  const [wishlist,setWishlist] = useState(false)
  const [bookInfo, setBookInfo] = useState({
    BookID: 23,
    Title: "Title of book ",
    releaseYear: 0,
    pageCount: 0,
    Description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
    rentPrice: 8,
    salePrice: 9,
    rating: 9,

    location: "example location",
    picture: "",

    publisher: "example publisher",
    image:
      "https://cdn.donmai.us/original/75/9c/__akame_akame_ga_kill_drawn_by_taturouxs__759c426ac9e6c4b899939435d051b704.jpg",
    stock: 4,
    damage: "new",
    Image: "",
  });
  const [authors, setAuthors] = useState([]);
  const [genres, setGenres] = useState([]);
  const [reviews, setReviews] = useState([]);

  const [editedReview, setEditReview] = useState({
    Comment:"",
    Rating:0
  });
  const [writeReview, setWriteReview] = useState(false);
  const [totalPrice, setTotalPrice] = useState(0);
  const changeQuanity = (e) => {
    setQuanity(e.target.value);
    console.log("hi");
    if (checkoutOption === "Buy") {
      setTotalPrice(e.target.value * bookInfo.SalePrice);
    } else {
      setTotalPrice(e.target.value * bookInfo.RentPrice);
    }
  };

  const onSubmit = () => {
    if (quantity && bookInfo.Stock > 0) {
      //deal with placing order
      sessionStorage.setItem(
        "orderInfo",
        JSON.stringify({
          Title: bookInfo.Title,
          BookID: bookInfo.BookID,
          Stock: quantity,
          Option: checkoutOption,
          Image: bookInfo.Image,
          Price: totalPrice,
        })
      );
      navigate("/checkout");
    }
  };
  const deleteReview = async (e) => {
    setEdited(null);
    try {
      const deleted = +e.target.value;
      console.log(deleted);
      setReviews((oldState) => {
        return oldState.filter((r, index) => {
          return index != deleted;
        });
      });
      await axios.delete("http://localhost:8000/review/book/", {
        params: {
          BookID: id,
          User_Email: localStorage.getItem("username"),
        },
      });
      setEdited(null)
      setEditReview({
        Rating:0,
        Comment:""
      })
    } catch (e) {
      console.log(e);
    }
  };

  const changeOption = (e) => {
    setCheckoutOption(e.target.value);
    if (e.target.value === "Buy") {
      setTotalPrice(quantity * bookInfo.SalePrice);
    } else {
      setTotalPrice(quantity * bookInfo.RentPrice);
    }
  };

  const saveEdit = async(e) => {
    await axios.patch("http://localhost:8000/review/book/",{
      BookID:id,
      User_Email:localStorage.getItem("username"),
      Comment:editedReview.Comment,
      Rating:editedReview.Rating
    })
    let copy = [];
    for (let i = 0; i < reviews.length; i++) {
      copy.push(reviews[i]);
      if (i === +e.target.value) {
        copy[i].Comment= editedReview.Comment;
        copy[i].Rating = editedReview.Rating;
      }
    }
    setReviews(copy);
    setEditReview({
      Rating:"",
      Comment:0
    });
    setEdited(null);
  };

  const enableEdit = (e) => {
    setEdited(+e.target.value);
    console.log(+e.target.value)
    setEditReview({
      Rating:reviews[+e.target.value].Rating,
      Comment:reviews[+e.target.value].Comment

    })
  };
  const changeReviewEdit = (e) => {
    console.log(typeof editedReview.Rating)
    console.log(typeof e.target.value)
    console.log(editedReview)
    setEditReview((oldState)=>{
      return{
        
      ...oldState,
     [e.target.id]:e.target.value
        
    }})
  };

  const reviewButtonClick = (e) => {
    setWriteReview((oldState) => !oldState);
  };

  const wishlistAdd = async(e)=>{
    try{
    await axios.post("http://localhost:8000/wishlist/user/",{
      
      User_Email:localStorage.getItem("username"),
      BookID:id
    })
    setWishlist(true)
  }
  catch(e){
    console.log(e)
  }
  }
  const wishlistDelete = async(e)=>{
    try{
    await axios.delete("http://localhost:8000/wishlist/user/",
    {data:{
      User_Email:localStorage.getItem("username"),
      BookID:id
    }})
    setWishlist(false)
  }
  catch(e){
    console.log(e)
  }

  }
  useEffect(() => {
    let isMounted = true;
    const fetchData = async () => {
      try{
      const bookData = await axios.get("http://localhost:8000/book/", {
        params: {
          BookID: id,
        },
      });
      const genreData= await axios.get("http://localhost:8000/genre/book/", {
        params: {
          BookID: id,
        },
      });
      const reviewData = await axios.get("http://localhost:8000/review/book/", {
        params: {
          BookID: id,
        },
      });

      const writeData = await axios.get("http://localhost:8000/writes/", {
        params: {
          BookID: id,
        },
      });
      const wishlistData = await axios.get("http://localhost:8000/wishlist/user/",{
        params:{
          User_Email:localStorage.getItem("username"),
          BookID:id,
          
        }
      })
      if (isMounted) {
        console.log(bookData.data);
        
        setGenres(genreData.data);
        //setTotalPrice(data.data.SalePrice)
        
        setReviews(reviewData.data);
        console.log(writeData.data);
        let authorsList = [];
        for (let i = 0; i < writeData.data.length; i++) {
          if (i !== writeData.data.length - 1) {
            console.log("author");
            authorsList.push(
              <Link
                key={authors[i].AuthorID}
                to={`/author/${writeData.data[i].AuthorID}/${writeData.data[i].FName}+${writeData.data[i].LName}`}
                style={{ textDecoration: "none" }}
              >
                {" "}
                {`${writeData.data[i].FName} ${writeData.data[i].LName} ,`}
              </Link>
            );
          } else {
            authorsList.push(
              <Link
                key={writeData.data[i].AuthorID}
                to={`/author/${writeData.data[i].AuthorID}/${writeData.data[i].FName}+${writeData.data[i].LName}`}
                style={{ textDecoration: "none" }}
              >
                {" "}
                {`${writeData.data[i].FName} ${writeData.data[i].LName}`}
              </Link>
            );
          }
        }
        console.log(authorsList);
        setAuthors(authorsList);
        console.log(wishlist.data)
        if(wishlist.data === "found"){
          setWishlist(true)
        }
      }
    }
    catch(e){
      console.log(e)
    }
    };
    fetchData();
    return () => {
      isMounted = false;
    };
  }, []);
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
              <span>
                <b>By:</b>{" "}
              </span>
              {authors}
              <div class>
                <b>Rating :</b> {bookInfo.Rating}
              </div>
              <div>
                <b>In stock: </b>
                {bookInfo.Stock}
              </div>
              {localStorage.getItem("username") && (
                <div className="d-flex justify-content-center mt-2">
                  <input
                    type="radio"
                    className="btn-check mx-1"
                    name="options"
                    id="buy"
                    autocomplete="off"
                    onChange={changeOption}
                    checked={checkoutOption === "Buy"}
                    value="Buy"
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
                    onChange={changeOption}
                    checked={checkoutOption === "Rent"}
                    value="Rent"
                  />
                  <label class="btn btn-primary mx-1" for="rent">
                    Rent price: {bookInfo.RentPrice}$
                  </label>
                </div>
              )}
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
                    <div className="text-start">Option: {checkoutOption}</div>
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
                        min="0"
                        max={bookInfo.Stock}
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
                <button type = "button" onClick={wishlist ? wishlistDelete : wishlistAdd} className="btn btn-dark mt-1">{wishlist ? "Remove from wishlist" : "Add to wishlist"} </button>
              </div> 
            </div>
          </div>
          <div className="row mt-1 justify-content-center">
            <h6>Reviews </h6>
         {localStorage.getItem("username")&& <>{writeReview ? (
              <>
                <button
                  onClick={reviewButtonClick}
                  className="btn btn-primary review-button"
                >
                  Cancel
                </button>
                <ReviewForm
                  id={id}
                  setReviews={setReviews}
                  setWriteReview={setWriteReview}
                ></ReviewForm>
              </>
            ) : (
              <button
                onClick={reviewButtonClick}
                className="btn btn-primary review-button"
              >
                Add a review
              </button>
            )}</>  }
            <ul className="list-group mt-2">
              {reviews.map((review, index) => (
                <li className="card list-group-item">
                  <div className="card-body">
                    <img
                      className="img-responsive comment-img me-2"
                      src="https://64.media.tumblr.com/8b920a4af835ef5f38deaae90ef2c95c/2e9ae72b084d1dd9-b3/s1280x1920/b8f570cd0c43b41c1c9e42f97518e2953bb060f6.png"
                    />
                    <a href="#" className="card-title">
                      {review.User_Email}
                    </a>
                    <div>
                      <span className="card-subtitle mb-2 text-muted pe-4">
                        {review.date}
                      </span>
                    {localStorage.getItem("username") === review.User_Email && edited === index ?
                  <div className="d-flex justify-content-center mb-1">
                    <label htmlFor="Rating" className=" mx-1">Rating: </label>
                    <input onChange = {changeReviewEdit} className="form-control" style= {{width:"10%"}} type = "number" min="1" max="10" id="Rating" value = {editedReview.Rating}/>
                    </div>
                    :
                    <> <span className="card-subtitle mb-2 text-muted">
                        Rating: {review.Rating}
                      </span> </> }
                    </div>
                    {localStorage.getItem("username") === review.User_Email &&
                    edited === index ? (
                      <><label htmlFor="Comment" className="mx-1">Comment </label><textarea
                          onChange={changeReviewEdit}
                          value={editedReview.Comment}
                          type="text"
                          className="card-text mb-1"
                          id="Comment" /></>
                    ) : (
                      <p className="card-text">{review.Comment}</p>
                    )}
                   {localStorage.getItem("username") === review.User_Email && (
                      <div className="d-flex justify-content-center">
                        <button
                          value={review.Review_ID}
                          onClick={deleteReview}
                          className="btn btn-primary mx-2"
                        >
                          Delete
                        </button>
                        <button
                          value={index}
                          onClick={edited !== null ? saveEdit : enableEdit}
                          className="btn btn-primary"
                        >
                          {edited !==null ? "Save" : "Edit"}
                        </button>
                      </div>
                    )}
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
