import React, { useState } from 'react'
import './auth.css'
import { Link, useNavigate } from 'react-router-dom'
import { UserData } from '../../context/UserContext'
import { CourseData } from '../../context/CourseContext'

const Login = () => {
  const navigate = useNavigate()
  const {btnLoading,loginUser}=UserData()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const {fetchMyCourse} = CourseData()

  const SubmitHandler=async(e)=>{
    e.preventDefault()
    await loginUser(email,password,navigate,fetchMyCourse)
  }
  return (
    <div className="auth-page">
      <div className="auth-form">
        <h2>Login</h2>
        <form onSubmit={SubmitHandler}>
          <label htmlFor="email">Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <label htmlFor="password">Password</label>
          <input
           type="password" required
           value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <button disabled={btnLoading} type='submit' className='common-btn'>
            {btnLoading? 'Please wait...':'Login '}
          </button>

          <p>Don't have an account? <Link to={'/register'}>Register</Link> </p>
        </form>
      </div>
    </div>
  )
}

export default Login
