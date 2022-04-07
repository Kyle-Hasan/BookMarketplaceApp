import React from 'react'
import { Link } from 'react-router-dom'

function OrderList({purchases,rentals}) {
  return (
    <><table class="table table-dark mt-1">
          <caption> Purchases</caption>
          <thead>
              <tr>
                  <th>Order ID</th>
                  <th>Order Date</th>
                  <th>Quanity</th>
                  <th>Book ID</th>
                  <th>Policy Number</th>
                  <th>Insurance Provider</th>
                  <th>Cost($)</th>
              </tr>
          </thead>
          <tbody>
              {purchases.map((order) => {
                  <tr>
                      <td>{order.OrderID}</td>
                      <td>{order.OrderDate}</td>
                      <td>{order.Stock}</td>
                      <td><Link to={`/Book/${order.BookID}`}>{order.BookID}</Link></td>
                      <td>{order.Policy_No}</td>
                      <td>{order.ProviderName}</td>

                      <td>{order.PurchaseAmt}</td>
                  </tr>
              })}
          </tbody>
      </table><table class="table table-dark mt-1">
              <caption> Rentals</caption>
              <thead>
                  <tr>
                      <th>Order ID</th>
                      <th>Order Date</th>
                      <th>Quanity</th>
                      <th>Book ID</th>
                      <th>Policy Number</th>
                      <th>Insurance Provider</th>
                      <th>Cost($)</th>
                      <th>Start Date</th>
                      <th>End Date</th>
                  </tr>
              </thead>
              <tbody>
                  {rentals.map((order) => {
                      <tr>
                          <td>{order.OrderID}</td>
                          <td>{order.OrderDate}</td>
                          <td>{order.Stock}</td>
                          <td><Link to={`/Book/${order.BookID}`}>{order.BookID}</Link></td>
                          <td>{order.Policy_No}</td>
                          <td>{order.ProviderName}</td>

                          <td>{order.PurchaseAmt}</td>
                          <td>{order.StartDate}</td>
                          <td>{order.EndDate}</td>
                      </tr>
                  })}
              </tbody>
          </table></>
  )
}

export default OrderList