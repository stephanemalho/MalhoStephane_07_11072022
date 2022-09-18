import { FETCH_ALL, CREATE, UPDATE, DELETE, LIKE} from '../constants/actionTypes';
import * as api from "../api/axios";

export function getPosts() {
  return async (dispatch) => {
    try {
      const { data } = await api.fetchPosts();
      dispatch({ type: FETCH_ALL , payload: data });
    } catch (error) {
      console.log(error.message);
    }
  };
}


export function createPost(newPost) {
  return async (dispatch) => {
    try {
      const res = await api.createPost(newPost);
      dispatch({ type: CREATE, payload: res.data });
    } catch (error) {
      console.log(error);
    }
  };
}


export function updatePost(id, post) {
  return async (dispatch) => {
    try {
      const res = await api.updatePost(id, post);
      dispatch({ type: UPDATE, payload: res.data });
    } catch (error) {
      console.log(error);
    }
  };
}

export function deletePost(id) {
  return async (dispatch) => {
    try {
      await api.deletePost(id);
      dispatch({ type: DELETE, payload: id });
    } catch (error) {
      console.log(error);
    }
  }
}

export function likePost(id, post) {
  return (dispatch) => {
    try {
      const res = api.likePost(id, post);
      dispatch({ type: LIKE, payload: res.data });
    } catch (error) {
      console.log(error);
    }
  }
}




