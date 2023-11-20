import axios from 'axios'
import Cookies from 'js-cookie'
import {
    LOAD_USER_PROFILE_SUCCESS,
    LOAD_USER_PROFILE_FAIL,
    UPDATE_USER_PROFILE_SUCCESS,
    UPDATE_USER_PROFILE_FAIL
} from './types'


export const load_user = () => async dispatch => {
    const config = {
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'X-CSRFToken': Cookies.get('csrftoken')
        }
    } 

    try {
        const res = await axios.get(`${process.env.REACT_APP_API_URL}/profile/user`, config)

        // if (res.data.profile && res.data.username) {
        //     dispatch({
        //         type: LOAD_USER_PROFILE_SUCCESS,
        //     })
        // } else {
        //     dispatch({
        //         type: LOAD_USER_PROFILE_FAIL,
        //     })
        // }
        if (res.data.error) {
            dispatch({
                type: LOAD_USER_PROFILE_FAIL
            })
        } else {
            dispatch({
                type: LOAD_USER_PROFILE_SUCCESS,
                payload: res.data
            })
        }

    } catch (err) {
        dispatch({
            type: LOAD_USER_PROFILE_FAIL
        })
    }
}

export const updateUserProfile = ({first_name, last_name, phone, city}) => async dispatch => {
    const config = {
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'X-CSRFToken': Cookies.get('csrftoken')
        }
    } 
    const body = JSON.stringify({'withCredentials': true, first_name, last_name, phone, city})

    try {
        const res = await axios.put(`${process.env.REACT_APP_API_URL}/profile/update`, body, config)
        if(res.data.success && res.data.profile){
            dispatch({
                type: UPDATE_USER_PROFILE_SUCCESS,
                payload: res.data
            })
        } else {
            dispatch({type: UPDATE_USER_PROFILE_FAIL})
        }
    } catch (err) {}
}