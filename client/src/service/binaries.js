import axios from 'axios';

const API_URL = 'http://localhost:8000/binarie';

export const fetchBinaries = async () => {
  try {
    const response = await axios.get(API_URL);
    return response.data;
  } catch (error) {
    throw error;
  }
};


export const toggleBinarie = async (id) => {
  try {
    const response = await axios.put(`${API_URL}/${id}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};
