import { apiConnector } from "../apiconnector";
import { endpoints } from "../apis";
import toast from "react-hot-toast";
import axios from "axios";

const {
  LOGIN_API,
  SIGNUP_API
} = endpoints;


interface loginProps {
  formData: {
    email: string;
    password: string;
  };
}

// login
export const Login = async ({ formData }: loginProps) => {
  const toastId = toast.loading("Logging in...");

  try {
    const response = await apiConnector("POST", LOGIN_API, formData);

    if (!response.data.success) {
      throw new Error(response.data.message);
    }

    toast.success("Login Successful");
    console.log("Login res",response);
    console.log("Checking user ",response.data.user)
    localStorage.setItem("token", response.data.token);
    localStorage.setItem("user", JSON.stringify(response.data.user));

    return response.data;
  } catch (error:unknown) {
    let errorMessage = "Login failed. Please try again.";

    if (axios.isAxiosError(error)) {
  
     errorMessage =
        error.response?.data?.error || error.message;
    }

    toast.error(errorMessage);
     throw error;
     
  } finally {
    toast.dismiss(toastId);
  }
};

// signup
interface SignUpProps {
  formData: {
    username:string;
    email: string;
    password: string;
  }
}

export const SignUp = async ({ formData }: SignUpProps) => {
  const toastId = toast.loading("Signing up...");
  try {
    const response = await apiConnector(
      "POST",
      SIGNUP_API,
      formData
    );

    toast.success("Signup Successful");
    return response.data;

  } catch (error: unknown) {
    console.log("SIGNUP_ERROR --> ", error);

    let errorMessage = "Signup failed. Please try again.";

    if (axios.isAxiosError(error)) {
  
     errorMessage =
        error.response?.data?.error || error.message;
    }

    toast.error(errorMessage);
     throw error;

  } finally {
    toast.dismiss(toastId);
  }
};

