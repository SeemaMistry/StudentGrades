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
} from '../actions/types'

const initialState = {
    isAuthenticated: null,
    username: '',
    first_name: '',
    last_name: '',
    phone: '',
    city: ''
}

export default function(state = initialState, action) {
    const {type, payload} = action
    switch (type){
        case REGISTER_SUCCESS:
            return {
                ...state,
                isAuthenticated: false
            }
        case AUTHENTICATED_FAIL:
        case AUTHENTICATED_SUCCESS:
            return {
                ...state,
                isAuthenticated: payload
            }
        case LOGIN_SUCCESS:
            return {
                ...state,
                isAuthenticated: true,
                username: payload
            }
        case LOGOUT_SUCCESS:
            return {
                ...state,
                isAuthenticated: false
            }
        case UPDATE_USER_PROFILE_SUCCESS:
            return {
                ...state,
                first_name: payload.first_name,
                last_name: payload.last_name,
                phone: payload.phone,
                city: payload.city
            }
        
        case REGISTER_FAIL:
        case LOGIN_FAIL:
        case LOGOUT_FAIL:
            return state
        
        default:
            return state
    }
}