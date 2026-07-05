import { Heart, MessageCircle, Play } from "lucide-react";
import type { ProfileMediaGridProps } from "../../Types/profile";

const ProfileMediaGrid = ({
  data,
  EmptyIcon,
  emptyTitle,
  emptyDescription,
}: ProfileMediaGridProps) => {
  if (data.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-20">
        <EmptyIcon size={60} className="text-neutral-700" />

        <h2 className="mt-6 text-2xl font-semibold text-white">
          {emptyTitle}
        </h2>

        <p className="mt-2 text-neutral-500">
          {emptyDescription}
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-3 gap-1 md:gap-2 mt-6">
      {data.map((item) => (
        <div
          key={item.id}
          className="relative aspect-square overflow-hidden bg-neutral-900 cursor-pointer group"
        >
          <img
            src={item.media}
            alt="media"
            className="w-full h-full object-cover transition duration-300 group-hover:scale-110"
          />

          {/* Video Badge */}

          {item.type === "VIDEO" && (
            <Play
              size={18}
              fill="white"
              className="absolute top-2 right-2 text-white"
            />
          )}

          {/* Overlay */}

          <div className="absolute inset-0 bg-black/45 opacity-0 group-hover:opacity-100 transition duration-300 flex items-center justify-center gap-8">

            <div className="flex items-center gap-2 text-white font-semibold">
              <Heart size={18} fill="white" />
              {item.likes}
            </div>

            <div className="flex items-center gap-2 text-white font-semibold">
              <MessageCircle size={18} fill="white" />
              {item.comments}
            </div>

          </div>
        </div>
      ))}
    </div>
  );
};

export default ProfileMediaGrid;