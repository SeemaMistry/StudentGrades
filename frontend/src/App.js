import React from 'react'
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom'
import Layout from './hocs/Layout'
import Home from './containers/Home'
import Register from './containers/Register'
import Login from './containers/Login'
import Dashboard from './containers/Dashboard'


const App = () => {
    return (
        <Router>
            <Layout>
                <Routes>
                    <Route exact path='/' Component={Home}></Route>
                    <Route exact path='/register' Component={Register}></Route>
                    <Route exact path='/login' Component={Login}></Route>
                    <Route exact path='/dashboard' Component={Dashboard}></Route>
                </Routes>
            </Layout>
        </Router>
    )
}

export default App;