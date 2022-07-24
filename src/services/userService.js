import axios from "axios";
import authHeader from "./authHeader";
const URL = process.env.BASE_URL_PROD || process.env.BASE_URL_DEV;
const API_URL = URL
// const getPublicContent = () => {
//   return axios.get(API_URL + "all");
// };
const getUserBoard = () => {
  return axios.get(API_URL + "user", { headers: authHeader() });
};
// const getModeratorBoard = () => {
//   return axios.get(API_URL + "mod", { headers: authHeader() });
// };
// const getAdminBoard = () => {
//   return axios.get(API_URL + "admin", { headers: authHeader() });
// };
const UserService = {
  //   getPublicContent,
  getUserBoard,
  //   getModeratorBoard,
  //   getAdminBoard,
};
export default UserService;
