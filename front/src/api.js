import axios from "axios";

const API_BASE_URL = "http://localhost:8000/api";

export const createProduct = (data, accessToken) => {
    return axios.post(
      `${API_BASE_URL}/products/`,
      data,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,  // Add the token here
        },
      }
    );
  };
  
  export const listProducts = async (params) => {
    const accessToken = localStorage.getItem("access");
  
  
    if (!accessToken) {
      throw new Error("No access token available");
    }
  
    return axios.get(`${API_BASE_URL}/products/list/`, {
      params,
      headers: {
        Authorization: `Bearer ${accessToken}`, 
      },
    });
  };

  export const getSubvariants = async () => {
  
    const accessToken = localStorage.getItem("access");
    const response = await axios.get(`${API_BASE_URL}/subvariants/`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    return response;
  };

// export const addStock = (id, stock) => axios.post(`${API_BASE_URL}/subvariants/${id}/add_stock/`, { stock });
// export const removeStock = (id, stock) => axios.post(`${API_BASE_URL}/subvariants/${id}/remove_stock/`, { stock });


export const addStock = async (subvariantId, stock) => {
  try {
    const accessToken = localStorage.getItem("access");
    const response = await axios.post(
      `${API_BASE_URL}/subvariants/${subvariantId}/add_stock/`, // subvariantId must be a UUID
      { stock },
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );
    return response;
  } catch (err) {
    console.error("Error adding stock:", err);
    throw err;
  }
};





export const removeStock = (id, stock) => {

  const accessToken = localStorage.getItem("access");
  return axios.post(
    `${API_BASE_URL}/subvariants/${id}/remove_stock/`,
    { stock },
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,  
      },
    }
  );
};




