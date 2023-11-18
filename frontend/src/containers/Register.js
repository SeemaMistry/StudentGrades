import React, { useState } from 'react'
import { Navigate, Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { register} from '../actions/auth'
import CSRFToken from '../components/CSRFToken'

const Register = ({register, isAuthenticated}) => {
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

  }

  return (
    <div className='container mt-5'>
      {accountCreated && <Navigate to='/login' replace/>}
      <h1>Register for an Account</h1>
      <p>Create an account with our Student Grades application</p>
      <form onSubmit={onSubmit}>
        <CSRFToken />
        <div className='form-group'>
          <label className='form-label mt-3'>Username: </label>
          <input
            className='form-control'
            type='text'
            placeholder='username'
            onChange={onChange}
            value={username}
            name='username'
            required
          />
        </div>
        <div className='form-group'>
          <label className='form-label mt-3'>Password: </label>
          <input
            className='form-control'
            type='password'
            placeholder='password'
            onChange={onChange}
            value={password}
            name='password'
            minLength='6'
            required
          />
        </div>
        <div className='form-group'>
          <label className='form-label mt-3'>Retype Password: </label>
          <input
            className='form-control'
            type='password'
            placeholder='confirm password'
            onChange={onChange}
            value={re_password}
            name='re_password'
            minLength='6'
            required
          />
        </div>
        <button className='btn btn-primary mt-3' type='submit'>Register</button>
      </form>
      <p className='mt-3'>
        Already have an account? <Link to={'/login'}>Sign In</Link>
      </p>
    </div>
  )
}

const mapStateToProps = state => (
  {
    isAuthenticated: state.auth.isAuthenticated
  }
)

export default connect(mapStateToProps,{register})(Register);