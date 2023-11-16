import React, { useState } from 'react'
import { Navigate } from 'react-router-dom'
import { connect } from 'react-redux'
import { register} from '../actions/auth'

const Register = ({register}) => {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    re_password: ''
  })
  const [accountCreated, setAccountCreated] = useState(false)

  // destructure formData for easy use
  const { username, password, re_password } = formData

  const onChange = e => setFormData({...formData, [e.target.name]: e.target.value})

  const onSubmit = e => {
    e.preventDefault()

    // validate user-inputs for registration
    if (password === re_password) {
      register(username, password, re_password)
      setAccountCreated(true)
    } 

    if (accountCreated) {
      <Navigate  to={'/'} />
    }

  }

  return (
    <div className='container mt-5'>
      <h1>Register for an Account</h1>
      <p>Create an account with our Student Grades application</p>
      <form onSubmit={onSubmit}>
        <div className='form-group'>
          <label className='form-label'>Username: </label>
          <input
            className='form-control'
            type='text'
            placeholder='username'
            onChange={onChange}
            value={username}
            required
          />
        </div>
        <div className='form-group'>
          <label className='form-label'>Password: </label>
          <input
            className='form-control'
            type='password'
            placeholder='password'
            onChange={onChange}
            value={password}
            minLength='6'
            required
          />
        </div>
        <div className='form-group'>
          <label className='form-label'>Retype Password: </label>
          <input
            className='form-control'
            type='password'
            placeholder='password'
            onChange={onChange}
            value={re_password}
            minLength='6'
            required
          />
        </div>
        <button className='btn btn-primary' type='submit'>Register</button>
      </form>
    </div>
  )
}

export default connect(null,{register})(Register);