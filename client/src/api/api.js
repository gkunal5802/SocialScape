import axios from "axios";

const API = axios.create({ baseURL: "https://socialscape-xpo5.onrender.com" });

export const setAuthorizationHeader = (token) => {
  API.defaults.headers.common["Authorization"] = `Bearer ${token}`;
};
export const removeAuthorizationHeader = () => {
  delete API.defaults.headers.common["Authorization"];
};

export const signup = (formData) => API.post("/auth/register", formData);
export const login = (values) => API.post("/auth/login", values);
export const getUserData = (id) => API.get(`/users/${id}`);
export const fetchFriends = (id) => API.get(`/users/${id}/friends`);
export const uploadPost = (formData) => API.post(`/posts`, formData);
export const fetchPosts = () => API.get("/posts");
export const fetchUserPosts = (id) => API.get(`/posts/${id}/posts`);
export const updateLike = (id, values) =>
  API.patch(`/posts/${id}/like`, values);
export const updateFriends = (id, friendId) =>
  API.patch(`/users/${id}/${friendId}`);
