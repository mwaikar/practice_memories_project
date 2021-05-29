import { actions } from '../constants/actionTypes';
const reducer = (posts = [], action) => { // here posts is the state
    switch (action.type) {
        case actions.FETCH_ALL:
            return action.payload;
        case actions.CREATE:
            return [...posts, action.payload];
        case actions.LIKE:
        case actions.UPDATE:
            return posts.map(post => post._id === action.payload._id ? action.payload : post);
        case actions.DELETE:
            return posts.filter(post => post._id !== action.payload);
        default:
            return posts;
    }
}

export default reducer;