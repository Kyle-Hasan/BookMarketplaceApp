import React from 'react'
import Navbar from '../components/Navbar'
import { useState } from 'react'
import { useNavigate,Link } from 'react-router-dom'
function Login() {
    const navigate = useNavigate()
    const [loginInfo, setLoginInfo] = useState({
        email : '',
        password : '',
    })
    const [error,setError] = useState(false)
    const onSubmit = async(e) =>{
        e.preventDefault()
        //probably needs something to validate the login first
        if(loginInfo.email === "ai" && loginInfo.password === "hayasaka"){
            //probably needs to set the state in the context
            navigate('/')
        }
        else {
            setError(true)
        }
    }
    const setInput = (e) => {
        setLoginInfo((oldState) => {
            return  {
                ...oldState,
                [e.target.id] : e.target.value
            }
        }
        )
    }
  return (
      <><Navbar />
      <div className = "container">
          <div class = "card mt-4">
          <div class="card-header">
          <h1 className = "mb-3">Log in</h1>
          </div>
          <div class = "card-body">
      <form onSubmit={onSubmit} >
          <div className="mb-3">
              <label htmlFor="email" className="form-label">Email</label>
              <div className = "d-flex justify-content-center ">
              <input onChange = {setInput} value = {loginInfo.email} type="text" className="w-50 form-control" id="email" />
              </div>

          </div>
          <div className="mb-3 ">
              <label htmlFor="password" className="form-label">Password</label>
              <div className = "d-flex justify-content-center ">
              <input onChange = {setInput} value = {loginInfo.password} type="password" className=" w-50 form-control" id="password" />
              </div>
          </div>
          <button type="submit" className="btn btn-secondary">Login</button>
      </form>
     {error && <p className='mt-1 text-danger'>Invalid email or password</p>}
     <div>
     <Link className = "mt-1" to = "/signup">Sign up here</Link>
     </div>
     <div>
     <Link className="mt-1" to = "/forgot">Forgot password?</Link>
     </div>
     </div>
     </div>
      </div>
      </>
  )
}

export default Login