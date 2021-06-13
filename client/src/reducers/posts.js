import { actions, START_LOADING, END_LOADING } from '../constants/actionTypes';
const reducer = (state = {isLoading: true, posts: []}, action) => {
    switch (action.type) {
        case START_LOADING:
            return {...state, isLoading: true};
        case END_LOADING:
            return {...state, isLoading: false};
        case actions.FETCH_ALL:
            return {
                ...state,
                posts: action.payload.data,
                currentPage: action.payload.currentPage,
                numberOfPages: action.payload.numberOfPages
            };
        case actions.FETCH_BY_SEARCH:
            return {
                ...state,
                posts: action.payload
            };
        case actions.FETCH_POST:
            return {
                ...state,
                post: action.payload
            };
        case actions.CREATE:
            return {...state, posts: [...state.posts, action.payload]};
        case actions.LIKE:
        case actions.UPDATE:
            return {...state, posts: state.posts.map(post => post._id === action.payload._id ? action.payload : post)};
        case actions.DELETE:
            return {...state, posts: state.posts.filter(post => post._id !== action.payload)};
        default:
            return state;
    }
}

export default reducer;