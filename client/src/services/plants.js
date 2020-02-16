import axios from "axios";
const baseUrl = "/api/plants";

// eslint-disable-next-line
let token = null;

const setToken = newToken => {
  token = `bearer ${newToken}`;
};

// Return all plants
const getAll = () => {
  const config = {
    headers: { Authorization: token }
  };
  return axios.get(baseUrl, config);
};

// Make a plant
const create = async newObject => {
  const config = {
    headers: { Authorization: token }
  };
  const response = await axios.post(baseUrl, newObject, config);
  return response.data;
};

// Update a plant
const update = (id, newObject) => {
  const config = {
    headers: { Authorization: token }
  };

  return axios.put(`${baseUrl}/${id}`, newObject, config);
};

// Delete a plant
const deletePlant = async id => {
  const config = {
    headers: { Authorization: token }
  };
  const request = axios.delete(`${baseUrl}/${id}`, config);
  const response = await request
    .then(response => response.data)
    .catch(error => console.log(error));
  console.log(response);
  return response;
};

export default { getAll, create, update, deletePlant, setToken };
