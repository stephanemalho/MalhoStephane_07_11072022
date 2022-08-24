import axios from "axios";

export default axios.create({
  baseURL: "http://localhost:4000",
});

const postsUrl = "http://localhost:4000/api/post/";

export const fetchPosts = () => {

  const token = localStorage.getItem("token");
     
          return axios.get( postsUrl, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
          });
          
  
}
export const createPost = (newPost) => axios.post(postsUrl, newPost, {
  headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
  },
} );