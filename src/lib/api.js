import { authClient } from "./auth-client";
import { API_URL } from "./constants";


async function getToken() {
  const { data, error } = await authClient.token();
  if (error || !data?.token) throw new Error("Your session has expired. Please log in again.");
  return data.token;
}


export async function apiRequest(path, { method = "GET", body, auth = false } = {}) {
  const headers = {};
  if (body) headers["Content-Type"] = "application/json";
  if (auth) headers.Authorization = `Bearer ${await getToken()}`;

  let response;
  try {
    response = await fetch(`${API_URL}${path}`, {
      method,
      headers,
      body: body ? JSON.stringify(body) : undefined,
      cache: "no-store",
    });
  } catch {
    throw new Error("Cannot reach the server. Please check your internet and try again.");
  }

  const data = await response.json().catch(() => ({}));
  if (!response.ok) throw new Error(data.message || "Something went wrong. Please try again.");
  return data;
}
