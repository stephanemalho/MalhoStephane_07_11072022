import axios from "axios";

export default axios.create({
  baseURL: "http://localhost:4000",
});

const postsUrl = "http://localhost:4000/api/post/";

export const fetchPosts = () => {
  return axios.get(postsUrl);
}
export const createPost = (newPost) => axios.post(postsUrl, newPost);