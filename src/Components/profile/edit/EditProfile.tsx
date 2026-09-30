import { ArrowLeft, Camera } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import {
  editProfile,
  uploadProfileImage,
  getProfile,
} from "../../../Services/Operations/ProfileApi";

interface FormDataState {
  fullName: string;
  username: string;
  bio: string;
  website: string;
  location: string;
  isPrivate: boolean;
}

const DEFAULT_AVATAR =
  "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=800&q=80";

const EditProfile = () => {
  const navigate = useNavigate();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [formData, setFormData] = useState<FormDataState>({
    fullName: "",
    username: "",
    bio: "",
    website: "",
    location: "",
    isPrivate: false,
  });

  const [profileImage, setProfileImage] = useState(DEFAULT_AVATAR);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isUploadingImage, setIsUploadingImage] = useState(false);

  useEffect(() => {
    const userString = localStorage?.getItem("user");

    // Get Profile details
    const GetProfileDetails = async () => {
      try {
        const user = userString ? JSON.parse(userString) : null;
        const userId = user.id;
        if (!user.id) {
          navigate("/login");
          return;
        }

        // call the api
        const data = await getProfile({ userId });
        console.log("Get Profile -->", data);

        // set the value in useState
        setFormData({
          fullName: data.user.fullName ?? " ",
          username: data.user.username ?? "",
          bio: data.user.bio ?? "",
          website: data.user.website ?? "",
          location: data.user.location,
          isPrivate: data.user.isPrivate,
        });
        setProfileImage(data.user.profileImage);
      } catch (error) {
        console.log("Issue if Profile fetching --> ", error);
      }
    };
    GetProfileDetails();
  }, []);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({
      ...prev,
      isPrivate: e.target.checked,
    }));
  };

  const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsUploadingImage(true);
    try {
      const data = await uploadProfileImage(file);
      const imageUrl = data?.data?.profileImage;

      if (imageUrl) {
        setProfileImage(imageUrl);

        const userString = localStorage.getItem("user");
        if (userString) {
          const user = JSON.parse(userString);
          localStorage.setItem(
            "user",
            JSON.stringify({ ...user, profileImage: imageUrl }),
          );
        }
      }
    } catch (error) {
      console.error(error);
    } finally {
      setIsUploadingImage(false);
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    }
  };

  const SubmitHandler = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const data = await editProfile(formData);
      if (data?.success) {
        const userString = localStorage.getItem("user");
        if (userString && data.user) {
          const user = JSON.parse(userString);
          localStorage.setItem(
            "user",
            JSON.stringify({ ...user, ...data.user }),
          );
        }
        navigate(-1);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-neutral-950 text-white">
      <div className="max-w-3xl mx-auto px-6 py-8">
        <div className="flex items-center gap-4 mb-10">
          <button
            type="button"
            onClick={() => navigate(-1)}
            className="p-2 rounded-full hover:bg-neutral-800 transition cursor-pointer"
          >
            <ArrowLeft />
          </button>

          <h1 className="text-3xl font-bold">Edit Profile</h1>
        </div>

        <div className="bg-neutral-900 rounded-2xl border border-neutral-800 p-8">
          <div className="flex flex-col items-center">
            <img
              src={profileImage}
              alt="Profile"
              className="w-36 h-36 rounded-full object-cover border-4 border-rose-500 p-1"
            />

            <input
              ref={fileInputRef}
              type="file"
              accept="image/jpeg,image/jpg,image/png,image/webp"
              className="hidden"
              onChange={handleImageChange}
            />

            <button
              type="button"
              disabled={isUploadingImage}
              onClick={() => fileInputRef.current?.click()}
              className="mt-5 flex items-center gap-2 text-rose-500 hover:text-rose-400 disabled:opacity-60 disabled:cursor-not-allowed font-medium transition"
            >
              <Camera size={18} />
              {isUploadingImage ? "Uploading..." : "Change Photo"}
            </button>
          </div>

          <form
            id="edit-profile-form"
            className="mt-12 space-y-7"
            onSubmit={SubmitHandler}
          >
            <div>
              <label className="block mb-2 text-neutral-300">Full Name</label>

              <input
                type="text"
                name="fullName"
                value={formData.fullName}
                placeholder="Enter Your Full Name "
                onChange={handleChange}
                className="w-full bg-neutral-950 border border-neutral-700 rounded-lg px-4 py-3 outline-none focus:border-rose-500"
              />
            </div>

            <div>
              <label className="block mb-2 text-neutral-300">Username</label>
              <input
                type="text"
                name="username"
                placeholder="Enter your User name "
                value={formData.username}
                onChange={handleChange}
                className="w-full bg-neutral-950 border border-neutral-700 rounded-lg px-4 py-3 outline-none focus:border-rose-500"
              />
            </div>

            <div>
              <label className="block mb-2 text-neutral-300">Bio</label>
              <textarea
                rows={4}
                maxLength={200}
                placeholder="Enter your Bio "
                name="bio"
                value={formData.bio}
                onChange={handleChange}
                className="w-full resize-none bg-neutral-950 border border-neutral-700 rounded-lg px-4 py-3 outline-none focus:border-rose-500"
              />

              <div className="text-right text-sm text-neutral-500 mt-2">
                {formData.bio.length} / 200
              </div>
            </div>

            <div>
              <label className="block mb-2 text-neutral-300">Website</label>

              <input
                type="text"
                name="website"
                placeholder="Enter your Website URL"
                value={formData.website}
                onChange={handleChange}
                className="w-full bg-neutral-950 border border-neutral-700 rounded-lg px-4 py-3 outline-none focus:border-rose-500"
              />
            </div>

            <div>
              <label className="block mb-2 text-neutral-300">Location</label>
              <input
                type="text"
                name="location"
                value={formData.location}
                placeholder="Enter your location "
                onChange={handleChange}
                className="w-full bg-neutral-950 border border-neutral-700 rounded-lg px-4 py-3 outline-none focus:border-rose-500"
              />
            </div>

            <div className="flex items-center justify-between border border-neutral-800 rounded-xl p-5 ">
              <div>
                <h3 className="font-semibold">Private Account</h3>

                <p className="text-sm text-neutral-500 mt-1">
                  Only approved followers can see your posts.
                </p>
              </div>

              <input
                type="checkbox"
                checked={formData.isPrivate}
                onChange={handleCheckboxChange}
                className="w-5 h-5 accent-rose-500 cursor-pointer"
              />
            </div>
          </form>

          <div className="flex justify-end gap-4 mt-10">
            <button
              type="button"
              onClick={() => navigate(-1)}
              className="border border-neutral-700 px-6 py-3 rounded-lg hover:border-neutral-500 transition cursor-pointer"
            >
              Cancel
            </button>

            <button
              type="submit"
              form="edit-profile-form"
              disabled={isSubmitting}
              className="bg-rose-500 hover:bg-rose-600 disabled:opacity-60 disabled:cursor-not-allowed px-6 py-3 rounded-lg font-semibold transition cursor-pointer"
            >
              {isSubmitting ? "Saving..." : "Save Changes"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditProfile;
