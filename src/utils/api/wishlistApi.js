import axiosClient from "./axiosClient";

const wishlistApi = {
  getAll: (params) => {
    const url = "/wishlist";

    return axiosClient.get(url, { params });
  },
  get: (id) => {
    const url = `/productposts/${id}`;
    return axiosClient.get(url);
  },
};

export default wishlistApi;
