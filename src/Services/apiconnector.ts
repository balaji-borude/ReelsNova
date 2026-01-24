import axios from "axios";

// make the instace of axios to call the apis throughout whole the application
export const axiosInstance = axios.create({});

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
