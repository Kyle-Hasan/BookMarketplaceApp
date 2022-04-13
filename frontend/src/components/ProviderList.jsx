import React from 'react'
import {Link} from 'react-router-dom'
function ProviderList({providers}) {
  return (
    <div className='container'><table class="table table-dark mt-1">
         <caption>Insurance providers</caption>
        <thead>
           
            <tr>
                <th>Name</th>
                
            </tr>
        </thead>
        <tbody>
        {providers.map((provider)=>(
            <tr key = {provider.Name}>
                <td><Link to = {`/provider/${provider.Name}`}>{provider.Name}</Link></td>
                
            </tr>))}
        </tbody>
        </table>
    </div>
  )
}

export default ProviderList