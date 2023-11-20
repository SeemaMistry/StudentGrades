import {
    UPDATE_USER_PROFILE_SUCCESS,
    UPDATE_USER_PROFILE_FAIL,
    LOAD_USER_PROFILE_FAIL,
    LOAD_USER_PROFILE_SUCCESS
} from '../actions/types'

const initialState = {
    username: '',
    first_name: '',
    last_name: '',
    phone: '',
    city: ''
}

export default function(state = initialState, action) {
    const {type, payload} = action
    switch (type){
        case LOAD_USER_PROFILE_SUCCESS:
            return {
                ...state,
                username: payload.username,
                first_name: payload.first_name,
                last_name: payload.last_name,
                phone: payload.phone,
                city: payload.city
            }
        case UPDATE_USER_PROFILE_SUCCESS:
            return {
                ...state,
                first_name: payload.first_name,
                last_name: payload.last_name,
                phone: payload.phone,
                city: payload.city
            }
        case LOAD_USER_PROFILE_FAIL:
            return {
                ...state,
                username: '',
                first_name: '',
                last_name: '',
                phone: '',
                city: ''
            }
        
        default:
            return state
    }
}