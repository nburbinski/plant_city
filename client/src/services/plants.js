import axios from "axios";
const baseUrl = "/api/plants";

// eslint-disable-next-line
let token = null;

const setToken = newToken => {
  token = `bearer ${newToken}`;
};

const getAll = () => {
  return axios.get(baseUrl);
};

const create = newObject => {
  return axios.post(baseUrl, newObject);
};

const update = (id, newObject) => {
  return axios.put(`${baseUrl}/${id}`, newObject);
};

const deletePlant = id => {
  return axios.delete(`${baseUrl}/${id}`);
};

export default { getAll, create, update, deletePlant, setToken };
