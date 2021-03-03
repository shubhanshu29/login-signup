import { VERIFY, LOGIN, REGISTER, UPDATE_PROFILE , GET_TWEETS } from './actions/types';

const initialState = {
    loginid: 'Asdf@asdf.com',
    name: '',
    userId: '3',
    tweets: [],
    comments: [],
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case VERIFY:
            return {
                ...state,
                loginid: action.payload.loginid,
                name: action.payload.name
            }
        case LOGIN:
            return {
                ...state,
                userId: action.payload.userId
            }
        case REGISTER:
            return {
                ...state,
                name: action.payload.name,
                loginid: action.payload.loginid
            }
        case UPDATE_PROFILE:
            return {
                ...state,
                name: action.payload.name
            }
        case GET_TWEETS:
            return {
                ...state,
                tweets: action.payload.tweets
            }
        default:
            return state;
    }
}

export default reducer;