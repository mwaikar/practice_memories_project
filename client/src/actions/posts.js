import * as api from '../api';
import { actions } from '../constants/actionTypes';

// Action creators = functions that return actions

export const getPosts = () => async (dispatch) => {
    try {
        const { data } = await api.fetchPosts();
        dispatch({ type: actions.FETCH_ALL, payload: data });
    } catch (err) {
        console.log(err);
    }
}

export const createPost = (post) => async (dispatch) => {
    try {
        const { data } = await api.createPost(post);
        dispatch({ type: actions.CREATE, payload: data });
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