import axios from "axios";

export default axios.create({
  baseURL: "http://localhost:4000",
});

axios.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    Promise.reject(error);
  }
);

const postsUrl = "http://localhost:4000/api/post/";
// const usersUrl = "http://localhost:4000/api/auth/users";
 //const USER_Url = "http://localhost:4000/api/auth";


export const fetchPosts = () => {
  const token = localStorage.getItem("token");
  
  return axios.get(postsUrl, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const createPost = (newPost) =>
axios.post(postsUrl, newPost, {
  headers: {
    Authorization: `Bearer ${localStorage.getItem("token")}`,
  },
});

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

export const likePost = async (id, updatedPost) => {
  const token = localStorage.getItem("token");

  return await axios.post(`${postsUrl}${id}/like`, updatedPost, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
}

// export const fetchUser = async () => {
//   const res = await axios.get(`${USER_Url}`, {
//     headers: {
//       Authorization: `Bearer ${localStorage.getItem("token")}`,
//     },
//   });   
//   console.log(res.data.pseudo);
//  };


