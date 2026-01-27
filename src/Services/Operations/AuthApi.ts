import { apiConnector } from "../apiconnector";
import { endpoints } from "../apis";
import toast from "react-hot-toast";

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
    const response = await apiConnector("POST", endpoints.LOGIN_API, formData);

    if (!response.data.success) {
      throw new Error(response.data.message);
    }

    toast.success("Login Successful");
    return response.data;
  } catch (error) {
    toast.error((error as Error).message || "Login failed. Please try again.");
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
import axios from "axios";

export const SignUp = async ({ formData }: SignUpProps) => {
  const toastId = toast.loading("Signing up...");
  try {
    const response = await apiConnector(
      "POST",
      endpoints.SIGNUP_API,
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
    // throw error;

  } finally {
    toast.dismiss(toastId);
  }
};

