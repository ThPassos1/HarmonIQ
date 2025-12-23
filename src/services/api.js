const API_URL = "http://localhost:3001";

export const api = {
  post: async (endpoint, body, token = null) => {
    const res = await fetch(`${API_URL}${endpoint}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        ...(token && { Authorization: `Bearer ${token}` })
      },
      body: JSON.stringify(body)
    });
    return res.json();
  },

  get: async (endpoint, token = null) => {
    const res = await fetch(`${API_URL}${endpoint}`, {
      headers: {
        ...(token && { Authorization: `Bearer ${token}` })
      }
    });
    return res.json();
  }
};
