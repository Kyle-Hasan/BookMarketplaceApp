import React from 'react'
import {Link} from 'react-router-dom'
function PublisherList({publishers}) {
  return (
    <div className='container'><table class="table table-dark mt-1">
        <caption>Publishers</caption>
        <thead>
            
            <tr>
                <th>Name</th>
                
            </tr>
        </thead>
        <tbody>
        {publishers.map((publisher)=>(
            <tr key = {publisher.Name}>
                <td><Link to = {`/publisher/${publisher.Name}`}>{publisher.Name}</Link></td>
                
            </tr>))}
        </tbody>
        </table>
    </div>
  )
}

export default PublisherList