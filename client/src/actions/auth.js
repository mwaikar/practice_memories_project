import * as api from '../api';
import { authActions } from '../constants/actionTypes';

export const signin = (formData, history) => async (dispatch) => {
    try {
        // login the user
        const { data } = await api.signin(formData);
        dispatch({type: authActions.AUTH, payload: data});

        history.push('/');
    } catch (error) {
        console.log('Error while signing in. ', error);
    }
}

export const signup = (formData, history) => async (dispatch) => {
    try {
        // signup the user
        const { data } = await api.signup(formData);
        dispatch({type: authActions.AUTH, payload: data});

        history.push('/');
    } catch (error) {
        console.log('Error while signing up. ', error);
    }
}