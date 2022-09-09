
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
      const res = await api.createPost(newPost);
      dispatch({ type: 'CREATE', payload: res.data });
    } catch (error) {
      console.log(error);
    }
  };
}

// export function getUserMessageResponceFromServer() {
//   return async (dispatch) => {
//     try {
//       const { data } = await api.getUserMessageFromServer();
//       dispatch({ type: 'FETCH_USER_MESSAGE', payload: data });
//     } catch (error) {
//       console.log(error.message);
//     }
//   };
// }

// export function updatePost(id, updatedPost) {
//   return async (dispatch) => {
//     try {
//       const res = await api.updatePost(id, updatedPost);
//       dispatch({ type: 'UPDATE', payload: res.data });
//     } catch (error) {
//       console.log(error);
//     }
//   };
// }

// export function deletePost(id) {
//   return async (dispatch) => {
//     try {
//       await api.deletePost(id);
//       dispatch({ type: 'DELETE', payload: id });
//     } catch (error) {
//       console.log(error);
//     }
//   }
// }

// // get post by its user id
// export function getPostByUserId(id) {
//   return async (dispatch) => {
//     try {
//       const { data } = await api.fetchPostByUserId(id);
//       dispatch({ type: 'FETCH_BY_USER_ID', payload: data });
//     } catch (error) {
//       console.log(error.message);
//     }
//   }
// }



