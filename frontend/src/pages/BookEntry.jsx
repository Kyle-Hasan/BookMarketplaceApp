import React from "react";
import Navbar from "../components/Navbar";
import { useNavigate, useSearchParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";

function BookEntry() {
  const [searchParams] = useSearchParams();
  const [quantity, setQuanity] = useState(1);
  
  const [checkoutOption, setCheckoutOption] = useState("Buy");
  
  const [bookInfo, setBookInfo] = useState({
    title: "Title of book ",
    releaseYear: 0,
    pageCount: 0,
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
    rentPrice: 8,
    salePrice: 9,
    rating: 9,
    genres: ["genre1","genre2"],
    location: "example location",
    picture: "",
    authors: [
      { id: 1, name: "firstname lastname" },
      { id: 2, name: "author name" },
    ],
    publisher: "example publisher",
    
    stock: 4,
    damage: "new"
  });
  const [totalPrice, setTotalPrice] = useState(1*bookInfo.salePrice);
  const changeQuanity = (e) => {
    setQuanity(e.target.value);
    console.log("hi");
    if (checkoutOption) {
      setTotalPrice(e.target.value * bookInfo.salePrice);
    } else {
      setTotalPrice(e.target.value * bookInfo.rentPrice);
    }
  };
  const onSubmit = () => {
    if (quantity > 0) {
      //deal with placing order
    }
  };

  const changeOption = (e)=> {
    setCheckoutOption(e.target.value)
    if(e.target.value === "Buy"){
      setTotalPrice(quantity*bookInfo.salePrice)
    }
    else {
      setTotalPrice(quantity*bookInfo.rentPrice)
    }
  }

  let authorsList = [];
  for (let i = 0; i < bookInfo.authors.length; i++) {
    if (i !== bookInfo.authors.length - 1) {
      console.log("author");
      authorsList.push(
        <Link
          key={bookInfo.authors[i].id}
          to={`/authors/${bookInfo.authors[i].id}`}
          style={{ textDecoration: "none" }}
        >
          {" "}
          {bookInfo.authors[i].name},{" "}
        </Link>
      );
    } else {
      authorsList.push(
        <Link
          key={bookInfo.authors[i].id}
          to={`/authors/${bookInfo.authors[i].id}`}
          style={{ textDecoration: "none" }}
        >
          {" "}
          {bookInfo.authors[i].name}{" "}
        </Link>
      );
    }
  }
  console.log(authorsList.length);
  return (
    <>
      <Navbar></Navbar>
      <div className="container">
        <div className="row mt-3">
          <div className="row mt-1 ">
            <div className="col-md-3  border-dark">
              <img
                src="https://cdn.myanimelist.net/images/characters/3/430804.jpg"
                className="img-fluid border border-dark mb-2"
              />
              <h5>Book information</h5>
             <table class="table">

              <tbody>
                <tr>
                  <th>Official Title: </th>
                  <td>{bookInfo.title}</td>
                </tr>
                <tr>
                  <th>Publisher: </th>
                  <td>{bookInfo.publisher}</td>
                </tr>
                <tr>
                  <th>Genres: </th>
                  <td>{bookInfo.genres.join(", ")}</td>
                </tr>
                <tr>
                  <th>Page Count: </th>
                  <td>{bookInfo.pageCount}</td>
                </tr>
                <tr>
                  <th>Release Year: </th>
                  <td>{bookInfo.releaseYear}</td>
                </tr>
                <tr>
                  <th>Location: </th>
                  <td>{bookInfo.location}</td>
                </tr>
                <tr>
                  <th>Damage: </th>
                  <td>{bookInfo.damage}</td>
                </tr>
              </tbody>
              </table>
            </div>
            <div className="col-md-5">
              <h1 className="text-center "> {bookInfo.title} </h1>
              <span><b>By:</b> </span>
              {authorsList}
              <div class><b>Rating :</b> {bookInfo.rating}</div>
              <div><b>In stock: </b>{bookInfo.stock}</div>
              <div className="d-flex justify-content-center mt-2">
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
                  Buy price: {bookInfo.salePrice}$
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
                 Rent price: {bookInfo.rentPrice}$
                </label>

              
              </div>
              <p className="mt-3">
                <h6>Synopsis</h6>
                {bookInfo.description}
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
        </div>
        
      </div>
    </>
  );
}

export default BookEntry;
