const backendDomain = process.env.REACT_APP_API_URL;

const summaryApi = {
  signUp: {
    url: `${backendDomain}/v1/users/signup`,
    method: "post",
  },
  signIn: {
    url: `${backendDomain}/v1/users/signin`,
    method: "post",
  },
  currentUser: {
    url: `${backendDomain}/v1/users/user-details`,
    method: "get",
  },
  logoutUser: {
    url: `${backendDomain}/v1/users/user-logout`,
    method: "get",
  },
  allUser: {
    url: `${backendDomain}/v1/users/all-users`,
    method: "get",
  },
  updateUser: {
    url: `${backendDomain}/v1/users/update-user`,
    method: "put",
  },
  uploadProduct: {
    url: `${backendDomain}/v1/products/upload-product`,
    method: "post",
  },
  allProduct: {
    url: `${backendDomain}/v1/products/get-products`,
    method: "get",
  },
  updateProduct: {
    url: `${backendDomain}/v1/products/update-product`,
    method: "put",
  },
  categoryProduct: {
    url: `${backendDomain}/v1/products/get-categories`,
    method: "get",
  },
  productByCategory: {
    url: `${backendDomain}/v1/products/products-by-category`,
    method: "post",
  },
  productDetails: {
    url: `${backendDomain}/v1/products/get-details`,
    method: "post",
  },
  addToCartProduct: {
    url: `${backendDomain}/v1/cart/add-cart`,
    method: "post",
  },
  getCartProductCount: {
    url: `${backendDomain}/v1/cart/count-add`,
    method: "get",
  },
  getCartProducts: {
    url: `${backendDomain}/v1/cart/cart-products`,
    method: "get",
  },
  updateCartProduct: {
    url: `${backendDomain}/v1/cart/update-cart-product`,
    method: "put",
  },
  deleteCartProduct: {
    url: `${backendDomain}/v1/cart/delete-cart-product`,
    method: "delete",
  },
  searchProduct: {
    url: `${backendDomain}/v1/products/search-products`,
    method: "get",
  },
  filterProduct: {
    url: `${backendDomain}/v1/products/filter-products`,
    method: "post",
  },
};

export default summaryApi;
