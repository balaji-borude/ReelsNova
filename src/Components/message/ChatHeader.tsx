import React from "react";
import {
  ChevronLeft,
  Phone,
  Video,
  Info,
  Circle,
} from "lucide-react";
import type { ChatUser } from "./types";
import toast from "react-hot-toast";

interface ChatHeaderProps {
  user: ChatUser;
  onBackMobile: () => void;
  onToggleInfoDrawer: () => void;
  isInfoDrawerOpen: boolean;
}

export const ChatHeader: React.FC<ChatHeaderProps> = ({
  user,
  onBackMobile,
  onToggleInfoDrawer,
  isInfoDrawerOpen,
}) => {
  const handleStartCall = (type: "voice" | "video") => {
    toast(`Calling @${user.username} (${type})...`, {
      icon: type === "video" ? "📹" : "📞",
      style: {
        background: "#171717",
        color: "#fff",
        border: "1px solid #262626",
      },
    });
  };

  return (
    <div className="h-16 px-4 flex items-center justify-between border-b border-neutral-800 bg-neutral-950/80 backdrop-blur-md shrink-0 z-10">
      {/* Left: Back (mobile) & Profile info */}
      <div className="flex items-center gap-3 min-w-0">
        <button
          onClick={onBackMobile}
          className="md:hidden p-1.5 -ml-1 text-neutral-400 hover:text-white rounded-lg hover:bg-neutral-900 transition-colors"
          title="Back to chats"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>

        <div className="relative shrink-0 cursor-pointer" onClick={onToggleInfoDrawer}>
          <img
            src={user.avatar}
            alt={user.username}
            className="w-10 h-10 rounded-full object-cover border border-neutral-800"
          />
          {user.isOnline && (
            <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-emerald-500 border-2 border-neutral-950 rounded-full" />
          )}
        </div>

        <div className="min-w-0 cursor-pointer" onClick={onToggleInfoDrawer}>
          <div className="flex items-center gap-1.5">
            <h3 className="text-sm font-semibold text-white truncate hover:underline">
              {user.fullName}
            </h3>
          </div>
          <div className="flex items-center gap-1.5 text-xs text-neutral-400">
            {user.isOnline ? (
              <span className="flex items-center gap-1 text-emerald-400 font-medium">
                <Circle className="w-1.5 h-1.5 fill-emerald-400 text-emerald-400" />
                Active now
              </span>
            ) : (
              <span>{user.lastSeen || "Offline"}</span>
            )}
          </div>
        </div>
      </div>

      {/* Right: Actions */}
      <div className="flex items-center gap-1 sm:gap-2">
        <button
          onClick={() => handleStartCall("voice")}
          className="p-2 rounded-xl text-neutral-400 hover:text-white hover:bg-neutral-900 border border-transparent hover:border-neutral-800 transition-colors"
          title="Voice call"
        >
          <Phone className="w-4 h-4" />
        </button>

        <button
          onClick={() => handleStartCall("video")}
          className="p-2 rounded-xl text-neutral-400 hover:text-white hover:bg-neutral-900 border border-transparent hover:border-neutral-800 transition-colors"
          title="Video call"
        >
          <Video className="w-4 h-4" />
        </button>

        <div className="w-[1px] h-5 bg-neutral-800 mx-1" />

        <button
          onClick={onToggleInfoDrawer}
          className={`p-2 rounded-xl transition-colors border ${
            isInfoDrawerOpen
              ? "text-rose-400 bg-neutral-900 border-neutral-800"
              : "text-neutral-400 hover:text-white hover:bg-neutral-900 border-transparent hover:border-neutral-800"
          }`}
          title="Conversation details"
        >
          <Info className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
