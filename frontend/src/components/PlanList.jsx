import React from 'react'
import { Link } from 'react-router-dom'

function PlanList({plans}) {
  return (
    <><table class="table table-dark mt-1 container">
        
          <thead>
          <caption> Insurance Plans</caption>
              <tr>
                  <th>Policy No</th>
                  <th>Price($)</th>
                  <th>Coverage duration(days)</th>
                  <th>Details</th>
                  <th>Provider name</th>
                  
              </tr>
          </thead>
          <tbody>
              {plans.map((plan) => (
                  <tr>
                      <td>{plan.PolicyNo}</td>
                      <td>{plan.Price}</td>
                      <td>{plan.CoverageDuration}</td>
                      
                      <td>{plan.Details}</td>
                      <td>{plan.InsuranceProvider_Name}</td>

                     
                  </tr>
              ))}
          </tbody>
      </table></>
  )
}

export default PlanList