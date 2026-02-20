const BASE_URL = "http://127.0.0.1:5000";

export const apiFetch = async (
  endpoint: string,
  options: RequestInit = {}
) => {
  const token = localStorage.getItem("token");

  const response = await fetch(`${BASE_URL}${endpoint}`, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...(token && { Authorization: `Bearer ${token}` }),
      ...options.headers,
    },
  });

  const data = await response.json();
  return { response, data };
};
