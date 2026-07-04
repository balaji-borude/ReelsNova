import {
  Grid3x3,
  SquarePlay,
  User,
  MapPin,
  Link2,
} from "lucide-react";

const Profile = () => {
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

            <h1 className="text-3xl font-bold">
              {profile.name}
            </h1>

            <p className="text-neutral-400 mt-1">
              @{profile.username}
            </p>

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
                <h2 className="text-2xl font-bold">
                  {profile.posts}
                </h2>

                <p className="text-neutral-400 text-sm">
                  Posts
                </p>
              </div>

              <div className="text-center cursor-pointer">
                <h2 className="text-2xl font-bold">
                  {profile.followers}
                </h2>

                <p className="text-neutral-400 text-sm">
                  Followers
                </p>
              </div>

              <div className="text-center cursor-pointer">
                <h2 className="text-2xl font-bold">
                  {profile.following}
                </h2>

                <p className="text-neutral-400 text-sm">
                  Following
                </p>
              </div>

            </div>

            {/* Buttons */}

            <div className="flex flex-col sm:flex-row gap-3 mt-8">

              <button className="bg-rose-500 hover:bg-rose-600 transition px-5 py-2 rounded-lg font-medium">
                Edit Profile
              </button>

              <button className="border border-neutral-700 hover:border-neutral-500 transition px-5 py-2 rounded-lg">
                Share Profile
              </button>

            </div>

          </div>

        </div>

        {/* Divider */}

        <div className="border-t border-neutral-800 mt-10"></div>

        {/* ================= Tabs ================= */}

        <div className="flex justify-center gap-10 mt-6">

          <button className="flex items-center gap-2 border-b-2 border-rose-500 pb-3">
            <Grid3x3 size={18} />
            <span>Posts</span>
          </button>

          <button className="flex items-center gap-2 text-neutral-400 hover:text-white transition pb-3">
            <SquarePlay size={18} />
            <span>Reels</span>
          </button>

          <button className="flex items-center gap-2 text-neutral-400 hover:text-white transition pb-3">
            <User size={18} />
            <span>Tagged</span>
          </button>

        </div>

        {/* ================= Empty State ================= */}

        <div className="flex flex-col items-center justify-center py-20">

          <Grid3x3
            size={60}
            className="text-neutral-700"
          />

          <h2 className="text-2xl font-semibold mt-6">
            No Posts Yet
          </h2>

          <p className="text-neutral-500 mt-2">
            Upload your first reel or post and start sharing with the world.
          </p>

        </div>

      </div>
    </div>
  );
};

export default Profile;