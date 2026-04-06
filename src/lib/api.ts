export const API_URL = import.meta.env.VITE_API_URL || "http://localhost:8082/api";

export const fetchApi = async (endpoint: string, options: RequestInit = {}) => {
  const tokenRecord = localStorage.getItem("attendai_token");
  const headers: Record<string, string> = {
    "Content-Type": "application/json",
    ...((options.headers as Record<string, string>) || {}),
  };

  if (tokenRecord) {
    headers["Authorization"] = `Bearer ${tokenRecord}`;
  }

  const response = await fetch(`${API_URL}${endpoint}`, {
    ...options,
    headers,
  });

  const data = await response.json().catch(() => ({}));
  if (!response.ok) {
    throw new Error((data as { message?: string }).message || "API request failed");
  }
  return data;
};