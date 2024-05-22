const { default: axios } = require("axios");

const axiosClient = axios.create({
  baseURL: "http://192.168.1.7:1337/api",
});

const getCategory = () => axiosClient.get("/categories?populate=*");

const getSlider = () =>
  axiosClient.get("/sliders?populate=*").then((res) => res.data.data);

const getCategoryList = () =>
  axiosClient.get("/categories?populate=*").then((res) => res.data.data);

const getAllProducts = () =>
  axiosClient.get("/products?populate=*").then((res) => res.data.data);

const getProductsByCategory = (category) =>
  axiosClient
    .get(`/products?filters[categories][name][$in]=${category}&populate=*`)
    .then((res) => res.data.data);

const registerUser = (username, email, password) =>
  axiosClient.post("/auth/local/register", {
    username,
    email,
    password,
  });

const signIn = (email, password) =>
  axiosClient.post("/auth/local", {
    identifier: email,
    password,
  });

const addToCart = (data, jwt) =>
  axiosClient.post("/user-carts", data, {
    headers: {
      Authorization: `Bearer ${jwt}`,
    },
  });

const getCartItem = (userId, jwt) =>
  axiosClient
    .get(
      `/user-carts?filters[userId][$eq]=${userId}&populate[products][populate]=images`
    )
    .then((res) => {
      const data = res.data.data;
      const cartItemList = data.map((item, ind) => ({
        name: item.attributes.products?.data[0].attributes.name,
        quantity: item.attributes.quantity,
        amount: item.attributes.amount,
        image:
          item.attributes.products?.data[0].attributes.images.data[0].attributes
            .url,
        actualPrice: item.attributes.products?.data[0].attributes.mrp,
        id: item.id,
      }));
      return cartItemList;
    });

const deleteCartItem = (id, jwt) =>
  axiosClient.delete(`/user-carts/${id}`, {
    headers: {
      Authorization: `Bearer ${jwt}`,
    },
  });

export default {
  getCategory,
  getSlider,
  getCategoryList,
  getAllProducts,
  getProductsByCategory,
  registerUser,
  signIn,
  addToCart,
  getCartItem,
  deleteCartItem,
};
