import * as api from '../api';
import { actions, START_LOADING, END_LOADING } from '../constants/actionTypes';

// Action creators = functions that return actions

export const getPost = (id) => async (dispatch) => {
    try {
        dispatch({type: START_LOADING});
        const { data } = await api.fetchPost(id);
        dispatch({ type: actions.FETCH_POST, payload: data });
        dispatch({type: END_LOADING});
    } catch (err) {
        console.log(err);
    }
}

export const getPosts = (page) => async (dispatch) => {
    try {
        dispatch({type: START_LOADING});
        const { data } = await api.fetchPosts(page);
        dispatch({ type: actions.FETCH_ALL, payload: data });
        dispatch({type: END_LOADING});
    } catch (err) {
        console.log(err);
    }
}

export const getPostsBySearch = (searchQuery) => async (dispatch) => {
    try {
        dispatch({type: START_LOADING});
        const { data: {data} } = await api.fetchPostsBySearch(searchQuery);
        dispatch({type: actions.FETCH_BY_SEARCH, payload: data});
        dispatch({type: END_LOADING});
    } catch (err) {
        console.log('Error ', err);
    }
}

export const createPost = (post, history) => async (dispatch) => {
    try {
        dispatch({type: START_LOADING});
        const { data } = await api.createPost(post);
        history.push(`/posts/${data._id}`);

        dispatch({ type: actions.CREATE, payload: data });
        dispatch({type: END_LOADING});
    } catch (err) {
        console.log(err);
    }

}

export const updatePost = (id, post) => async (dispatch) => {
    try {
        const { data } = await api.updatePost(id, post);
        dispatch({ type: actions.UPDATE, payload: data });
    } catch (error) {
        console.log(error);
    }
}

export const deletePost = (id) => async (dispatch) => {
    try {
        await api.deletepost(id);
        dispatch({ type: actions.DELETE, payload: id });
    } catch (error) {
        console.log(error);
    }
}

export const likePost = (id) => async (dispatch) => {
    try {
        const { data } = await api.likePost(id);
        dispatch({ type: actions.UPDATE, payload: data });
    } catch (error) {
        console.log('Error while liking post', error);
    }
}

export const commentPost = (value, id) => async (dispatch) => {
    try {
        const { data } = await api.comment(value, id);
        
        dispatch({type: actions.COMMENT, payload: data});
        return data.comments;
    } catch (error) {
        console.log('Error while updating comment', error);
    }
}