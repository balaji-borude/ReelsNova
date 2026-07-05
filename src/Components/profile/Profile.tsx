import { Grid3x3, SquarePlay, User, MapPin, Link2 } from "lucide-react";
import { useState } from "react";
import ProfileMediaGrid from "./ProfileMediaGrid";
import { posts, reels, taggedPosts } from "./mockData";

const Profile = () => {
  const [activeTab, setActiveTab] = useState<"posts" | "reels" | "tagged">(
    "posts",
  );

  const profile = {
    name: "Balaji Borude",
    username: "balaji",
    bio: "🚀 MERN Stack Developer | Building Nova - A Production Grade Instagram Clone.",
    location: "Pune, India",
    website: "www.reelsnova.com",
    posts: 5,
    followers: 120,
    following: 95,
    image:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
  };

  // const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-neutral-950 text-white">
      <div className="max-w-5xl mx-auto px-4 py-8">
        {/* ================= Header ================= */}

        <div className="flex flex-col lg:flex-row items-center lg:items-start gap-10">
          {/* Profile Image */}

          <div className="flex justify-center">
            <img
              src={profile.image}
              alt="profile"
              className="w-36 h-36 sm:w-44 sm:h-44 lg:w-52 lg:h-52 rounded-full object-cover border-[3px] border-rose-500 p-1"
            />
          </div>

          {/* Profile Info */}

          <div className="flex-1 text-center lg:text-left">
            <h1 className="text-3xl font-bold">{profile.name}</h1>

            <p className="text-neutral-400 mt-1">@{profile.username}</p>

            <p className="text-neutral-300 mt-4 leading-7 max-w-2xl">
              {profile.bio}
            </p>

            <div className="flex flex-col sm:flex-row gap-4 mt-4 text-neutral-400 text-sm">
              <div className="flex items-center justify-center lg:justify-start gap-2">
                <MapPin size={18} />
                {profile.location}
              </div>

              <div className="flex items-center justify-center lg:justify-start gap-2">
                <Link2 size={18} />
                {profile.website}
              </div>
            </div>

            {/* Stats */}

            <div className="flex justify-center lg:justify-start gap-10 mt-8">
              <div className="text-center cursor-pointer">
                <h2 className="text-2xl font-bold">{profile.posts}</h2>

                <p className="text-neutral-400 text-sm">Posts</p>
              </div>

              <div className="text-center cursor-pointer">
                <h2 className="text-2xl font-bold">{profile.followers}</h2>

                <p className="text-neutral-400 text-sm">Followers</p>
              </div>

              <div className="text-center cursor-pointer">
                <h2 className="text-2xl font-bold">{profile.following}</h2>

                <p className="text-neutral-400 text-sm">Following</p>
              </div>
            </div>

            {/* Buttons */}

            <div className="flex flex-col sm:flex-row gap-3 mt-8">
              <button className="bg-rose-500 hover:bg-rose-600 transition px-5 py-2 rounded-lg font-medium cursor-pointer">
                Edit Profile
              </button>

              <button className="border border-neutral-700 hover:border-neutral-500 transition px-5 py-2 rounded-lg cursor-pointer">
                Share Profile
              </button>
            </div>
          </div>
        </div>

        {/* Divider */}

        <div className="border-t border-neutral-800 mt-10"></div>

        {/* ================= Tabs ================= */}
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