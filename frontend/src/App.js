import React from 'react'
import {BroswerRouter as Router, Route} from 'react-router-dom'
import Layout from './hocs/Layout'
import Home from './containers/Home'
import Register from './containers/Register'
import Login from './containers/Login'
import Dashboard from './containers/Dashboard'


const App = () => {
    return (
        <Router>
            <Layout>
                <Route exact path='/' Component={Home}></Route>
                <Route exact path='/register' Component={Register}></Route>
                <Route exact path='/login' Component={Login}></Route>
                <Route exact path='/dashboard' Component={Dashboard}></Route>
            </Layout>
        </Router>
    )
}

export default App;