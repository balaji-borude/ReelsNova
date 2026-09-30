import { apiConnector } from "../apiconnector";
import { endpoints } from "../apis";
import toast from "react-hot-toast";
import axios from "axios";

export interface EditProfileFormData {
  fullName: string;
  username: string;
  bio: string;
  website: string;
  location: string;
  isPrivate: boolean;
}

const getLoggedInUserId = (): number => {
  const userString = localStorage.getItem("user");
  const user = userString ? JSON.parse(userString) : null;
  const userId = user?.id;

  if (!userId) {
    throw new Error("User not found. Please log in again.");
  }

  return Number(userId);
};

// get Profile details
export const getProfile = async ({ userId }: { userId: number }) => {
  const toastId = toast.loading("Getting profile...");
  try {
    const response = await apiConnector(
      "GET",
      `${endpoints.PROFILE.GET}/${userId}`,
      {}, // body data
      {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    );
    // console.log("Profile fetched details -->", response);
    if (!response.data.success) {
      throw new Error(response.data.message);
    }
    return response.data;
  } catch (error: unknown) {
    let errorMessage = "Failed to get profile. Please try again.";
    if (axios.isAxiosError(error)) {
      errorMessage = error.response?.data?.message || error.message;
    }
    throw new Error(errorMessage);
  } finally {
    toast.dismiss(toastId);
  }
};

export const editProfile = async (formData: EditProfileFormData) => {
  const toastId = toast.loading("Updating Profile...");

  try {
    const userId = getLoggedInUserId();

    const response = await apiConnector(
      "PUT",
      `${endpoints.PROFILE.EDIT}/${userId}`,
      formData,
    );

    if (!response.data.success) {
      throw new Error(response.data.message);
    }

    toast.success("Profile updated successfully");
    return response.data;
  } catch (error: unknown) {
    let errorMessage = "Failed to update profile. Please try again.";

    if (axios.isAxiosError(error)) {
      errorMessage = error.response?.data?.message || error.message;
    } else if (error instanceof Error) {
      errorMessage = error.message;
    }

    toast.error(errorMessage);
    throw error;
  } finally {
    toast.dismiss(toastId);
  }
};

export const uploadProfileImage = async (file: File) => {
  const toastId = toast.loading("Uploading photo...");

  try {
    const userId = getLoggedInUserId();
    const formData = new FormData();
    formData.append("profileImage", file);

    const response = await apiConnector(
      "POST",
      `${endpoints.PROFILE.UPLOAD_IMAGE}/${userId}/upload-profile-image`,
      formData,
    );

    if (!response.data.success) {
      throw new Error(response.data.message);
    }

    toast.success("Profile photo updated");
    return response.data;
  } catch (error: unknown) {
    let errorMessage = "Failed to upload profile photo. Please try again.";

    if (axios.isAxiosError(error)) {
      errorMessage = error.response?.data?.message || error.message;
    } else if (error instanceof Error) {
      errorMessage = error.message;
    }

    toast.error(errorMessage);
    throw error;
  } finally {
    toast.dismiss(toastId);
  }
};
