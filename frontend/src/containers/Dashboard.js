import React, {useState} from 'react'
import { connect } from 'react-redux';
import { updateUserProfile } from '../actions/profile';
import { Navigate } from 'react-router-dom';
import CSRFToken from '../components/CSRFToken';

const Dashboard = ({
  updateUserProfile,
  first_name_global,
  last_name_global,
  phone_global,
  city_global
}) => {

  const [formData, setFormData] = useState({
    first_name: '',
    last_name: '',
    phone: '',
    city: ''
  })

  const {first_name, last_name, phone, city} = formData

  const onSubmit = e => {
    e.preventDefault()
    updateUserProfile(first_name, last_name, phone, city)
  }

  const onChange = e => {
    setFormData({...formData, [e.target.name]: e.target.value})
  }

  return (
    <div className='container mt-5'>
      <h1>Welcome</h1>
      <p>Update your user profile below.</p>
      <form onSubmit={onSubmit}>
        <CSRFToken />
        <div className='form-group'>
          <label className='form-label mt-3' htmlFor='first_name'>First Name: </label>
          <input
            className='form-control'
            type='text'
            placeholder={`${first_name_global}`}
            onChange={onChange}
            value={first_name}
            name='first_name'
          />
        </div>
        <div className='form-group'>
          <label className='form-label mt-3'>Last Name: </label>
          <input
            className='form-control'
            type='text'
            placeholder={`${last_name_global}`}
            onChange={onChange}
            value={last_name}
            name='last_name'
          />
        </div>
        <div className='form-group'>
          <label className='form-label mt-3'>Phone Number: </label>
          <input
            className='form-control'
            type='tel'
            placeholder={`${phone_global}`}
            onChange={onChange}
            value={phone}
            name='phone'
          />
        </div>
        <div className='form-group'>
          <label className='form-label mt-3'>City: </label>
          <input
            className='form-control'
            type='text'
            placeholder={`${city_global}`}
            onChange={onChange}
            value={city}
            name='city'
          />
        </div>
        <button className='btn btn-primary mt-3' type='submit'>Sign In</button>
      </form>
    </div>
  )
}

const mapStateToProps = state => ({
  first_name_global: state.profile.first_name,
    last_name_global: state.profile.last_name,
    phone_global: state.profile.phone,
    city_global: state.profile.city
})

export default connect(mapStateToProps, {updateUserProfile})(Dashboard);