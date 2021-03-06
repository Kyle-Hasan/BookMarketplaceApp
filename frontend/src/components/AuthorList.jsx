import React from 'react'
import {Link} from 'react-router-dom'
function AuthorList({authors}) {
  return (
    <div className='container'><table class="table table-dark mt-1">
           <caption>Authors</caption>
        <thead>
         
            <tr>
                <th>Author ID</th>
                <th>First name</th>
                <th>Last name</th>
            </tr>
        </thead>
        <tbody>
        {authors.map((author)=>(
            <tr key = {author.AuthorID}>
                <td><Link to = {`/author/${author.AuthorID}/${author.FName}+${author.LName}`}>{author.AuthorID}</Link></td>
                <td>{author.FName}</td>
                <td>{author.LName}</td>
            </tr>))}
        </tbody>
        </table>
    </div>
  )
}

export default AuthorList