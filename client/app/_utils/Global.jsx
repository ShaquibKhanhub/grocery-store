const { default: axios } = require("axios");

const axiosClient = axios.create({
  baseURL: "http://192.168.1.8:1337/api",
});

const getCategory = () => axiosClient.get("/categories?populate=*");

const getSlider = () =>
  axiosClient.get("/sliders?populate=*").then((res) => res.data.data);

const getCategoryList = () =>
  axiosClient.get("/categories?populate=*").then((res) => res.data.data);

const getAllProducts = () =>
  axiosClient.get("/products?populate=*").then((res) => res.data.data);

export default { getCategory, getSlider, getCategoryList, getAllProducts };
