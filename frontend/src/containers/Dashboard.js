import React from 'react'
import { connect } from 'react-redux';
import { updateUserProfile } from '../actions/auth';

const Dashboard = ({isAuthenticated, updateUserProfile}) => {
  return (
    <div>Dashboard</div>
  )
}

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated
})

export default connect(mapStateToProps, {updateUserProfile})(Dashboard);