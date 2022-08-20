import * as api from "../api/axios";

export function getPosts() {
  return async (dispatch) => {

    try {
      const { data } = await api.fetchPosts();
      dispatch({ type: 'FETCH_ALL', payload: data });
    } catch (error) {
      console.log(error.message);
    }
  };
}


export function createPost(newPost) {
  return async (dispatch) => {
    try {
      const { data } = await api.createPost(newPost);
      dispatch({ type: 'CREATE_POST', payload: data });
    } catch (error) {
      console.log(error.message);
    }
  };
}



