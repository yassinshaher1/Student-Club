const API_BASE_URL = "http://localhost:8080/events";

export const addEvent = async (eventData) => {
  const { name, description, eventDate, location } = eventData;
  const response = await fetch(
    `${API_BASE_URL}/add-event?name=${name}&description=${description}&eventDate=${eventDate}&location=${location}`,
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

export const updateEvent = async (name, updates) => {
  const response = await fetch(`${API_BASE_URL}/update-event?name=${name}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(updates),
  });
  return response.json();
};

export const deleteEvent = async (name) => {
  const response = await fetch(`${API_BASE_URL}/delete-event?name=${name}`, {
    method: "GET",
  });
  return response.json();
};

export const listEvents = async () => {
  const response = await fetch(`${API_BASE_URL}/list-events`, {
    method: "GET",
  });
  return response.json();
}; 