import axios from "axios";

export default axios.create({
  baseURL: "http://localhost:4000",
});

const postsUrl = "http://localhost:4000/api/post/";

const userUrl = "http://localhost:4000/api/auth/";

export const getUserMessageFromServer = async () => {
  const response = await axios.get(userUrl);
  return response.data;
}


export const createPost = (newPost) =>
axios.post(postsUrl, newPost, {
  headers: {
    Authorization: `Bearer ${localStorage.getItem("token")}`,
  },
});

export const fetchPosts = () => {
  const token = localStorage.getItem("token");

  return axios.get(postsUrl, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const updatePost = (id, updatedPost) => {
  const token = localStorage.getItem("token");

  return axios.put(`${postsUrl}${id}`, updatedPost, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
}

export const deletePost = (id) => {
  const token = localStorage.getItem("token");

  return axios.delete(`${postsUrl}${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
}
  
export const likePost = (id ) => {
  const token = localStorage.getItem("token");

  return axios.patch(`${postsUrl}${id}/like`, null, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
}

