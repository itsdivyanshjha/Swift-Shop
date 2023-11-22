import axios from "axios";
export const BASE_URL = "http://localhost:9090";
export const PRODUCT_IMAGE_BASE_URL = "http://localhost:9090/pms/images/serveimage/";
export const myaxios = axios.create({ baseURL: BASE_URL });
export const CustomDateFormatterFunc = (date) => {
  const d = new Date(date);
  return `${d.getDate()}-${
    d.getMonth() + 1
  }-${d.getFullYear()} ${d.getHours()}:${d.getMinutes()}`;
};
export const isLoggedIn = () => {
  return localStorage.getItem("loggedinuser");
};
export const SaveLoggedInUserDetails = (data) => {
  localStorage.setItem("loggedinuser", JSON.stringify(data));
};
export const DeleteLoggedInUserDetails = () => {
  if (isLoggedIn()) localStorage.removeItem("loggedinuser");
};
export const GetLoggedInUserDetails = () => {
  if (isLoggedIn()) 
    return JSON.parse(localStorage.getItem("loggedinuser"));
  else
    return null;
};
