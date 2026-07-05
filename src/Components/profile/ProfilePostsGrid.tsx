import { Grid3x3 } from "lucide-react";

const ProfilePostsGrid = () => {
  const posts = [
    {
      id: 1,
      media:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    },
    {
      id: 2,
      media:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    },
    {
      id: 3,
      media:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    },
    {
      id: 4,
      media:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    },
    {
      id: 4,
      media:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    },
    {
      id: 4,
      media:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    },
    {
      id: 4,
      media:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    },
  ];

  if (posts.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-20">
        <Grid3x3 size={60} className="text-neutral-700" />

        <h2 className="text-2xl font-semibold mt-6 text-white">
          No Posts Yet
        </h2>
          {/* Upload icon and Button */}
   
        <p className="text-neutral-500 mt-2">
          Upload your first post and start sharing.
        </p>
      </div>
    );
  }

  return (
<div className="grid grid-cols-3 md:space-x-3.5 md:space-y-3 mt-6">
  {posts.map((post) => (
    <div
      key={post.id}
      className="relative aspect-square overflow-hidden bg-neutral-900 group cursor-pointer"
    >
      <img
        src={post.media}
        alt="post"
        className="w-full h-full object-contain transition-transform duration-300 group-hover:scale-105"
      />

      <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition flex items-center justify-center">
        <span className="text-white font-semibold">
          View Post
        </span>
      </div>
    </div>
  ))}
</div>
  );
};

export default ProfilePostsGrid;