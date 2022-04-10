import React from 'react'
import { Link } from 'react-router-dom'

function OrderList({purchases,rentals}) {
  return (
    <><table class="table table-dark mt-1">
        
          <thead>
          <caption> Purchases</caption>
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
              {purchases.map((order) => (
                  <tr>
                      <td>{order.OrderID}</td>
                      <td>{order.OrderDate}</td>
                      <td>{order.Quantity}</td>
                      <td><Link to={`/Book/${order.BookID}`}>{order.BookID}</Link></td>
                      <td>{order.Policy_no}</td>
                      <td>{order.InsuranceProvider_Name}</td>

                      <td>{order.PurchaseAmt}</td>
                  </tr>
              ))}
          </tbody>
      </table><table class="table table-dark mt-1">
              
              <thead>
              <caption> Rentals</caption>
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
                  {rentals.map((order) => (
                      <tr>
                          <td>{order.OrderID}</td>
                          <td>{order.OrderDate}</td>
                          <td>{order.Quantity}</td>
                          <td><Link to={`/Book/${order.BookID}`}>{order.BookID}</Link></td>
                          <td>{order.Policy_no}</td>
                          <td>{order.InsuranceProvider_Name}</td>

                          <td>{order.RentAmt}</td>
                          <td>{order.StartDate}</td>
                          <td>{order.EndDate}</td>
                      </tr>
                  ))}
              </tbody>
          </table></>
  )
}

export default OrderList