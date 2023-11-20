import React, {useEffect} from 'react'
import Navbar from '../components/Navbar';
import { connect } from 'react-redux';
import { checkAuthenticated } from '../actions/auth';
import { load_user } from '../actions/profile';

const Layout = ({children, checkAuthenticated, load_user}) => {
  useEffect (() => {
    checkAuthenticated()
    load_user()
  }, [])

  return (
    <>
        <Navbar />
        {children}
    </>
  )
}

export default connect(null, {checkAuthenticated, load_user})(Layout);