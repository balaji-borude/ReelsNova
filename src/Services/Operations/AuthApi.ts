import { apiConnector } from "../apiconnector";
import { endpoints } from "../apis";
import toast from "react-hot-toast";

interface loginProps {
  formData: {
    email: string;
    password: string;
  };
}

export const Login = async ({formData}:loginProps) => {
    const toastId = toast.loading("Logging in...");

  try {

    const response = await apiConnector("POST", endpoints.LOGIN_API, formData);

    console.log("Login Api response -->", response);
    if (!response.data.success) {
      toast.error(response.data.message);
      throw new Error("Login failed");
    }

    toast.success("Login Successful");

    //navigate("/home")
  } catch (error) {
    console.log("LOGIN API ERROR -->", error);
    toast.error("Login failed. Please try again.");
  }finally{
        // later
    toast.dismiss(toastId);
  }
};
