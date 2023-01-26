import axios from "axios";
const URL = "https://wiretunz-production.up.railway.app/";

const API_URL = URL;
const register = (firstName, lastName, email, password) => {
  return axios.post(API_URL + "users/signup", {
    firstName,
    lastName,
    email,
    password,
  });
};
const login = async (email, password) => {
  console.log("login route hit");
  return axios
    .post(API_URL + "users/login", {
      email,
      password,
    })
    .then((response) => {
      if (response.data.token) {
        localStorage.setItem("user", JSON.stringify(response.data));
      }
      return response.data;
    });
};
const logout = () => {
  localStorage.removeItem("user");
};
const getCurrentUser = () => {
  return JSON.parse(localStorage.getItem("user"));
};

const AuthService = {
  register,
  login,
  logout,
  getCurrentUser,
};
export default AuthService;
