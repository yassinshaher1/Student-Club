// services/usersService.js
const API_BASE_URL = "http://localhost:8080/users"; 

export const loginUser = async (email, password) => {
  const response = await fetch(`${API_BASE_URL}/login?email=${email}&password=${password}`, {
    method: "GET",
  });
  return response.json();
};

export const addUser = async (userData) => {
  const { name, email, password, phone} = userData;
  const response = await fetch(`${API_BASE_URL}/add-user?name=${name}&email=${email}&password=${password}&phone=${phone}`, {
    method: "GET",
  });
  
  if (!response.ok) {
    const errorData = await response.text();
    throw new Error(errorData);
  }
  
  return response.text();
};

export const updateUser = async (email, updates) => {
  const response = await fetch(`${API_BASE_URL}/update-user?email=${email}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(updates),
  });
  return response.json();
};

export const deleteUser = async (email) => {
  const response = await fetch(`${API_BASE_URL}/delete-user?email=${email}`, {
    method: "GET",
  });
  return response.json();
};

export const listUsers = async () => {
  const response = await fetch(`${API_BASE_URL}/list-users`, {
    method: "GET",
  });
  return response.json();
};
