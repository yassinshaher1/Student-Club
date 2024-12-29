const API_BASE_URL = "http://localhost:8080/registration";

export const registerForEvent = async (eventName, userName) => {
  const response = await fetch(
    `${API_BASE_URL}/add?eventName=${eventName}&userName=${userName}`,
    {
      method: "GET",
    }
  );
  
  if (!response.ok) {
    const errorData = await response.text();
    throw new Error(errorData);
  }
  
  return response.text();
};

export const deleteRegistration = async (eventName, userName) => {
  const response = await fetch(
    `${API_BASE_URL}/delete?eventName=${eventName}&userName=${userName}`,
    {
      method: "GET",
    }
  );
  return response.json();
};

export const listRegistrations = async () => {
  const response = await fetch(`${API_BASE_URL}/list`, {
    method: "GET",
  });
  return response.json();
}; 