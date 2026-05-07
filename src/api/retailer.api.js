import axios from "axios";

const API_BASE_URL =
  "http://localhost:5000/api/retailers";


// GET ALL
export const getRetailersApi = async (
  page,
  limit
) => {

  const response = await axios.get(
    `${API_BASE_URL}?page=${page}&limit=${limit}`
  );

  return response.data;
};


// GET BY ID
export const getRetailerByIdApi = async (
  id
) => {

  const response = await axios.get(
    `${API_BASE_URL}/${id}`
  );

  return response.data;
};


// CREATE
export const createRetailerApi = async (
  payload
) => {

  const response = await axios.post(
    API_BASE_URL,
    payload
  );

  return response.data;
};


// UPDATE
export const updateRetailerApi = async (
  id,
  payload
) => {

  const response = await axios.put(
    `${API_BASE_URL}/${id}`,
    payload
  );

  return response.data;
};


// DELETE
export const deleteRetailerApi = async (
  id,
  payload
) => {

  const response = await axios.delete(
    `${API_BASE_URL}/${id}`,
    {
      data: payload,
    }
  );

  return response.data;
};