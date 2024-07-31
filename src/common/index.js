const backendDomain = process.env.BACKEND_URL || "http://localhost:8080";

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
};

export default summaryApi;
