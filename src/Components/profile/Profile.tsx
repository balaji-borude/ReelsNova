import { Grid3x3, SquarePlay, User, MapPin, Link2 } from "lucide-react";
import { useEffect, useState } from "react";
import ProfileMediaGrid from "./ProfileMediaGrid";
import { posts, reels, taggedPosts } from "./mockData";
import { useNavigate } from "react-router-dom";
import { getProfile as getProfileApi } from "../../Services/Operations/ProfileApi";

interface ProfileUser {
  id: number;
  username: string;
  fullName?: string | null;
  bio?: string | null;
  website?: string | null;
  location?: string | null;
  profileImage?: string | null;
}

const DEFAULT_AVATAR =
  "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=800&q=80";

const Profile = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<"posts" | "reels" | "tagged">(
    "posts",
  );
  const [user, setUser] = useState<ProfileUser | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const userString = localStorage.getItem("user");
        const loggedInUser = userString ? JSON.parse(userString) : null;
        const userId = Number(loggedInUser?.id);

        if (!userId) {
          navigate("/login");
          return;
        }

        const data = await getProfileApi({ userId });
        console.log("Profile data -->", data);
        setUser(data.user);
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProfile();
  }, [navigate]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-neutral-950 text-white flex items-center justify-center">
        Loading profile...
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-neutral-950 text-white flex items-center justify-center">
        Failed to load profile.
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-neutral-950 text-white">
      <div className="max-w-5xl mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row items-center lg:items-start gap-10">
          <div className="flex justify-center">
            <img
              src={user.profileImage || DEFAULT_AVATAR}
              alt="profile"
              className="w-36 h-36 sm:w-44 sm:h-44 lg:w-52 lg:h-52 rounded-full object-cover border-[3px] border-rose-500 p-1"
            />
          </div>

          <div className="flex-1 text-center lg:text-left">
            <h1 className="text-3xl font-bold">{user.fullName}</h1>

            <p className="text-neutral-400 mt-1">@{user.username}</p>

            {user.bio && (
              <p className="text-neutral-300 mt-4 leading-7 max-w-2xl">
                {user.bio}
              </p>
            )}

            <div className="flex flex-col sm:flex-row gap-4 mt-4 text-neutral-400 text-sm">
              {user.location && (
                <div className="flex items-center justify-center lg:justify-start gap-2">
                  <MapPin size={18} />
                  {user.location}
                </div>
              )}

              {user.website && (
                <span
                  className="flex items-center justify-center lg:justify-start gap-2 cursor-pointer"
                  onClick={() => window.open(user?.website || "", "_blank")}
                >
                  <Link2 size={18} />
                  {user.website}
                </span>
              )}
            </div>

            <div className="flex justify-center lg:justify-start gap-10 mt-8">
              <div className="text-center cursor-pointer">
                <h2 className="text-2xl font-bold">{posts.length}</h2>
                <p className="text-neutral-400 text-sm">Posts</p>
              </div>

              <div className="text-center cursor-pointer">
                <h2 className="text-2xl font-bold">0</h2>
                <p className="text-neutral-400 text-sm">Followers</p>
              </div>

              <div className="text-center cursor-pointer">
                <h2 className="text-2xl font-bold">0</h2>
                <p className="text-neutral-400 text-sm">Following</p>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 mt-8">
              <button
                className="bg-rose-500 hover:bg-rose-600 transition px-5 py-2 rounded-lg font-medium cursor-pointer"
                onClick={() => navigate("/profile/edit-profile")}
              >
                Edit Profile
              </button>

              <button className="border border-neutral-700 hover:border-neutral-500 transition px-5 py-2 rounded-lg cursor-pointer">
                Share Profile
              </button>
            </div>
          </div>
        </div>

        <div className="border-t border-neutral-800 mt-10"></div>

        <div className="flex justify-center gap-10 mt-6">
          <button
            onClick={() => setActiveTab("posts")}
            className={`flex items-center gap-2 border-b-2 pb-3 transition cursor-pointer ${
              activeTab === "posts"
                ? "border-rose-500 text-white"
                : "border-transparent text-neutral-400 hover:text-white"
            }`}
          >
            <Grid3x3 size={18} />
            Posts
          </button>

          <button
            onClick={() => setActiveTab("reels")}
            className={`flex items-center gap-2 border-b-2 pb-3 transition cursor-pointer ${
              activeTab === "reels"
                ? "border-rose-500 text-white"
                : "border-transparent text-neutral-400 hover:text-white"
            }`}
          >
            <SquarePlay size={18} />
            Reels
          </button>

          <button
            onClick={() => setActiveTab("tagged")}
            className={`flex items-center gap-2 border-b-2 pb-3 transition cursor-pointer ${
              activeTab === "tagged"
                ? "border-rose-500 text-white"
                : "border-transparent text-neutral-400 hover:text-white"
            }`}
          >
            <User size={18} />
            Tagged
          </button>
        </div>

        {activeTab === "posts" && (
          <ProfileMediaGrid
            data={posts}
            EmptyIcon={Grid3x3}
            emptyTitle="No Posts Yet"
            emptyDescription="Upload your first post."
          />
        )}

        {activeTab === "reels" && (
          <ProfileMediaGrid
            data={reels}
            EmptyIcon={SquarePlay}
            emptyTitle="No Reels Yet"
            emptyDescription="Upload your first reel."
          />
        )}

        {activeTab === "tagged" && (
          <ProfileMediaGrid
            data={taggedPosts}
            EmptyIcon={User}
            emptyTitle="No Tagged Posts"
            emptyDescription="Posts you're tagged in will appear here."
          />
        )}
      </div>
    </div>
  );
};

export default Profile;
