
// deployed backend URL
// const BASE_URL = "https://reelsnova-backend.onrender.com/api/v1" 

const BASE_URL =
  import.meta.env.VITE_API_BASE_URL || "http://localhost:3000/api/v1";

export const endpoints = {
  AUTH: {
    SIGNUP: `${BASE_URL}/auth/signup`,
    LOGIN: `${BASE_URL}/auth/login`,

    LOGOUT: `${BASE_URL}/auth/logout`,
    REFRESH_TOKEN: `${BASE_URL}/auth/refresh-token`,
  },

  PROFILE: {
    GET: `${BASE_URL}/profile`,
    EDIT: `${BASE_URL}/profile/edit`,
    UPLOAD_IMAGE: `${BASE_URL}/profile`,
  },

  POST: {
    CREATE: `${BASE_URL}/post/create`,
    DELETE: `${BASE_URL}/post/delete`,
    GET_ALL: `${BASE_URL}/post`,
  },

  FOLLOW: {
    FOLLOW_USER: `${BASE_URL}/follow`,
    UNFOLLOW_USER: `${BASE_URL}/unfollow`,
  },
};
