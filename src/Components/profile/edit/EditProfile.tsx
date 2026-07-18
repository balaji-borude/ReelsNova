import { ArrowLeft, Camera } from "lucide-react";
import { useNavigate } from "react-router-dom";

const EditProfile = () => {
  const navigate = useNavigate();


  return (
    <div className="min-h-screen bg-neutral-950 text-white">
      <div className="max-w-3xl mx-auto px-6 py-8">
        {/* Header */}
        <div className="flex items-center gap-4 mb-10">
          <button
            onClick={() => navigate(-1)}
            className="p-2 rounded-full hover:bg-neutral-800 transition cursor-pointer"
          >
            <ArrowLeft />
          </button>

          <h1 className="text-3xl font-bold">Edit Profile</h1>
        </div>

        {/* Card */}
        <div className="bg-neutral-900 rounded-2xl border border-neutral-800 p-8">
          {/* Profile Image */}

          <div className="flex flex-col items-center">
            <img
              src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=800&q=80"
              alt=""
              className="w-36 h-36 rounded-full object-cover border-4 border-rose-500 p-1"
            />

            <button className="mt-5 flex items-center gap-2 text-rose-500 hover:text-rose-400 font-medium transition"
              // onClick={UploadProfilePic()}
            >
              <Camera size={18} />
              Change Photo
            </button>
          </div>

          {/* Form */}

          <div className="mt-12 space-y-7">
            <div>
              <label className="block mb-2 text-neutral-300">Full Name</label>

              <input
                type="text"
                defaultValue="Balaji Borude"
                className="w-full bg-neutral-950 border border-neutral-700 rounded-lg px-4 py-3 outline-none focus:border-rose-500"
              />
            </div>

            <div>
              <label className="block mb-2 text-neutral-300">Username</label>
              <input
                type="text"
                defaultValue="balaji"
                className="w-full bg-neutral-950 border border-neutral-700 rounded-lg px-4 py-3 outline-none focus:border-rose-500"
              />
            </div>

            <div>
              <label className="block mb-2 text-neutral-300">Bio</label>
              <textarea
                rows={4}
                maxLength={200}
                defaultValue="🚀 MERN Stack Developer | Building Nova"
                className="w-full resize-none bg-neutral-950 border border-neutral-700 rounded-lg px-4 py-3 outline-none focus:border-rose-500"
              />

              {/* TODO: Add character count */}
              <div className="text-right text-sm text-neutral-500 mt-2">
                34 / 200
              </div>
            </div>

            <div>
              <label className="block mb-2 text-neutral-300">Website</label>

              <input
                type="text"
                defaultValue="https://reelsnova.com"
                className="w-full bg-neutral-950 border border-neutral-700 rounded-lg px-4 py-3 outline-none focus:border-rose-500"
              />
            </div>

            <div>
              <label className="block mb-2 text-neutral-300">Location</label>
              <input
                type="text"
                defaultValue="Pune, India"
                className="w-full bg-neutral-950 border border-neutral-700 rounded-lg px-4 py-3 outline-none focus:border-rose-500"
              />
            </div>

            {/* Toggle */}
            <div className="flex items-center justify-between border border-neutral-800 rounded-xl p-5 ">
              <div>
                <h3 className="font-semibold">Private Account</h3>

                <p className="text-sm text-neutral-500 mt-1">
                  Only approved followers can see your posts.
                </p>
              </div>

              <input type="checkbox" className="w-5 h-5 accent-rose-500 cursor-pointer" />
            </div>
          </div>

          {/* Buttons */}
          <div className="flex justify-end gap-4 mt-10">
            <button
              onClick={() => navigate(-1)}
              className="border border-neutral-700 px-6 py-3 rounded-lg hover:border-neutral-500 transition cursor-pointer"
            >
              Cancel
            </button>

            <button className="bg-rose-500 hover:bg-rose-600 px-6 py-3 rounded-lg font-semibold transition cursor-pointer">
              Save Changes
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditProfile;
