import axios from "axios";

// make the instace of axios to call the apis throughout whole the application
export const axiosInstance = axios.create({});

// Handle unauthorized responses centrally.
axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    const status = error.response?.status;
    const requestUrl = error.config?.url ?? "";

    // Don't log the user out when login or registration
    // fails because of invalid credentials or validation.
    const isPublicAuthRequest = /\/(login|register|signup)(\/|$|\?)/i.test(
      requestUrl,
    );

    if (status === 401 && !isPublicAuthRequest) {
      localStorage.removeItem("token");
      localStorage.removeItem("user");

      // Redirect only if the user isn't already on login.
      if (window.location.pathname !== "/login") {
        window.location.replace("/login");
      }
    }

    return Promise.reject(error);
  },
);

export const apiConnector = (
  method: string,
  url: string,
  bodyData?: unknown,
  headers?: Record<string, string>,
  params?: Record<string, unknown>,
) => {
  return axiosInstance({
    method,
    url,
    data: bodyData,
    headers,
    params,
  });
};
