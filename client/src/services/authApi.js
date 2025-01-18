import axios from "axios";

const API_URL = "http://localhost:8000/api/auth/";

export const loginApi = async (data) => {
  try {
    const response = await axios.post(`${API_URL}login`, data);
    return response.data;
  } catch (error) {
    throw new Error(
      error.response?.data?.message || "Something went wrong. Please try again."
    );
  }
};

export const registerApi = async (data) => {
  try {
    const response = await axios.post(`${API_URL}register`, data);
    return response.data;
  } catch (error) {
    throw new Error(
      error.response?.data?.message || "Something went wrong. Please try again."
    );
  }
};
