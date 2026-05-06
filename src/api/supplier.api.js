import axios from 'axios';

const API_BASE_URL = 'http://localhost:5000/api/suppliers';


export const getSuppliersApi = async (page, limit) => {
  const response = await axios.get(
    `${API_BASE_URL}?page=${page}&limit=${limit}`
  );

  return response.data;
};


export const createSupplierApi = async (payload) => {
  const response = await axios.post(
    API_BASE_URL,
    payload
  );

  return response.data;
};


export const updateSupplierApi = async (id, payload) => {
  const response = await axios.put(
    `${API_BASE_URL}/${id}`,
    payload
  );

  return response.data;
};

export const deleteSupplierApi = async (id, payload) => {

  const response = await axios.delete(
    `${API_BASE_URL}/${id}`,
    {
      data: payload,
    }
  );

  return response.data;
};