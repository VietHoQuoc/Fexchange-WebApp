import axiosClient from "./axiosClient";

const adminUserApi = {
  getAll: (params) => {
    const url = "/acounts";
    return axiosClient.get(url, { params });
  },
  get: (id) => {
    const url = `/acounts/${id}`;
    return axiosClient.get(url);
  },
  put: (id, params) => {
    const url = `/acounts/${id}`;
    return axiosClient.put(url, { params });
  },
  delete: (id) => {
    const url = `/acounts/${id}`;
    return axiosClient.delete(url);
  },
};

export default adminUserApi;
