import axios from 'axios'
import Cookies from 'js-cookie'
import {
    REGISTER_SUCCESS,
    REGISTER_FAIL,
    LOGIN_SUCCESS,
    LOGIN_FAIL, 
    LOGOUT_SUCCESS,
    LOGOUT_FAIL,
    AUTHENTICATED_SUCCESS,
    AUTHENTICATED_FAIL,
    UPDATE_USER_PROFILE_SUCCESS,
    UPDATE_USER_PROFILE_FAIL
} from './types'


export const register = (username, password, re_password) => async dispatch => {
    const config = {
        headers:{
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'X-CSRFToken': Cookies.get('csrftoken')
        }
    }
    const body = JSON.stringify({username, password, re_password})

    try{
        const res = await axios.post(`${process.env.REACT_APP_API_URL}/accounts/register`, body, config)

        if (res.data.error) {
            dispatch({
                type:REGISTER_FAIL
            })
        } else {
            dispatch({
                type:REGISTER_SUCCESS
            })
        }
    } catch (err) {

    }
    
}

export const checkAuthenticated = () => async dispatch => {
    const config = {
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }
    } 

    try {
        const res = await axios.get(`${process.env.REACT_APP_API_URL}/accounts/authenticated`, config)

        if (res.data.error || res.data.isAuthenticated === 'error'){
            dispatch({
                type: AUTHENTICATED_FAIL,
                payload: false
            })
        } else if (res.data.isAuthenticated === 'success') {
            dispatch({
                type: AUTHENTICATED_SUCCESS,
                payload: true
            })
        } 
    } catch (err) {
        dispatch({
            type: AUTHENTICATED_FAIL,
            payload: false
        })
    }
}

export const login = (username, password) => async dispatch => {
    const config = {
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'X-CSRFToken': Cookies.get('csrftoken')
        }
    } 
    const body = JSON.stringify({username, password})

    try {
        const res = await axios.post(`${process.env.REACT_APP_API_URL}/accounts/login`, body, config)

        if (res.data.error){
            dispatch({
                type:LOGIN_FAIL
            })
        } else {
            dispatch({
                type:LOGIN_SUCCESS
            })
        }
    } catch (err) {

    }
}

export const logout = () => async dispatch => {
    const config = {
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'X-CSRFToken': Cookies.get('csrftoken')
        }
    }

    const body = JSON.stringify({
        'withCredentials': true
    })

    try {
        const res = await axios.post(`${process.env.REACT_APP_API_URL}/accounts/logout`, body, config)

        if (res.data.success) {
            dispatch({
                type: LOGOUT_SUCCESS
            })
        } else {
            dispatch({
                type: LOGOUT_FAIL
            })
        }

    } catch (err) {

    }
    
}

