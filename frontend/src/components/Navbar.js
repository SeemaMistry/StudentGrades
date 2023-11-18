import React from 'react'
import { connect } from 'react-redux';
import { Link, NavLink } from 'react-router-dom';
import auth from '../reducers/auth';
import { logout } from '../actions/auth';

const Navbar = ({logout, isAuthenticated}) => {
    const guestLinks = (
        <>
            <li className="nav-item">
                <NavLink className="nav-link" to="/login">Login</NavLink>
            </li>
            <li className="nav-item">
                <NavLink className="nav-link" to="/register">Register</NavLink>
            </li>
        </>  
    )

    const authLinks = (
        <>
            <li className="nav-item">
                <NavLink className="nav-link" to="/dashboard">Dashboard</NavLink>
            </li>
            <li className="nav-item">
                <a className="nav-link" href='#!' onClick={logout}>Logout</a>
            </li>
        </>  
    )

  return (
    <>
    <nav className="navbar navbar-expand-lg bg-body-tertiary">
        <div className="container-fluid">
            <Link className="navbar-brand" to="/">StudentGrades</Link>
            <button 
                className="navbar-toggler" 
                type="button" 
                data-bs-toggle="collapse" 
                data-bs-target="#navbarNav" 
                aria-controls="navbarNav" 
                aria-expanded="false" 
                aria-label="Toggle navigation"
            >
                <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav">
                <li className="nav-item">
                    <NavLink className="nav-link" extact to="/">Home</NavLink>
                </li>
                { isAuthenticated ? authLinks : guestLinks }
            </ul>
            </div>
        </div>
    </nav>
    </>
  )
}

const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated
})

export default connect(mapStateToProps, {logout})(Navbar);
