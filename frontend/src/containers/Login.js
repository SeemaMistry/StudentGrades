import React, {useState} from 'react'
import { connect } from 'react-redux';
import { login } from '../actions/auth';
import { Navigate, Link } from 'react-router-dom';
import CSRFToken from '../components/CSRFToken';

const Login = ({login, isAuthenticated}) => {
  const [formData, setFormData] = useState({
    username: '',
    password: ''
  })
  const {username, password} = formData

  const onChange = e => setFormData({...formData, [e.target.name]: e.target.value})

  const onSubmit = (e) => {
    e.preventDefault()
    login(username, password)
  }

  return (
    <div className='container mt-5'>
      {isAuthenticated ? <Navigate to='/dashboard' replace/> : <Navigate to='/login' replace/>}
      <h1>Sign In</h1>
      <p>Sign in to your Student Grades application</p>
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
        <button className='btn btn-primary mt-3' type='submit'>Sign In</button>
      </form>
      <p className='mt-3'>
        Don't have an account? <Link to={'/login'}>Register</Link>
      </p>
    </div>
  )
}

const mapStateToProps = (state) => (
    {
      isAuthenticated: state.auth.isAuthenticated
    }
)

export default connect(mapStateToProps, {login})(Login);