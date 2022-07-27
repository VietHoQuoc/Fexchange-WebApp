import { get, put } from "./apiCaller";
const adminUserApi = {
  getAll: (token) => {
    const url = "/acounts/10000/1";
    return get(
      url,
      { NumberOfProductPosts: 0 },
      { Authorization: "Bearer " + token }
    );
  },
  get: (id, token) => {
    const url = `/acounts/${id}`;
    return get(url, {}, { Authorization: "Bearer " + token });
  },
  put: (id, obj, token) => {
    const url = `/acounts/${id}`;
    return put(url, obj, {}, { Authorization: "Bearer " + token });
  },
  delete: (id, token) => {
    const url = `/acounts/${id}`;
    return put(url, {}, {}, { Authorization: "Bearer " + token });
  },
};

export default adminUserApi;
