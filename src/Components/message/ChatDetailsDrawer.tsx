import React, { useState } from "react";
import {
  X,
  Bell,
  BellOff,
  User,
  ShieldAlert,
  Trash2,
  ExternalLink,
  Film,
  Image as ImageIcon,
} from "lucide-react";
import type { ChatUser, MessageItem } from "./types";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";

interface ChatDetailsDrawerProps {
  user: ChatUser;
  messages: MessageItem[];
  isOpen: boolean;
  onClose: () => void;
  onDeleteChat?: () => void;
}

export const ChatDetailsDrawer: React.FC<ChatDetailsDrawerProps> = ({
  user,
  messages,
  isOpen,
  onClose,
  onDeleteChat,
}) => {
  const [isMuted, setIsMuted] = useState(false);

  if (!isOpen) return null;

  // Extract shared media
  const sharedImages = messages.filter((m) => m.type === "image" && m.mediaUrl);
  const sharedReels = messages.filter((m) => m.type === "reel" && m.reelData);

  const toggleMute = () => {
    setIsMuted(!isMuted);
    toast.success(
      isMuted ? "Notifications unmuted" : "Notifications muted for this chat",
      {
        style: {
          background: "#171717",
          color: "#fff",
          border: "1px solid #262626",
        },
      }
    );
  };

  return (
    <div className="w-80 h-full border-l border-neutral-800 bg-neutral-950/80 backdrop-blur-xl shrink-0 flex flex-col z-20 animate-in slide-in-from-right duration-200">
      {/* Drawer Header */}
      <div className="h-16 px-5 flex items-center justify-between border-b border-neutral-800 shrink-0">
        <h4 className="font-semibold text-white text-sm">Details</h4>
        <button
          onClick={onClose}
          className="p-1 rounded-lg text-neutral-400 hover:text-white hover:bg-neutral-900 transition-colors"
        >
          <X className="w-4 h-4" />
        </button>
      </div>

      <div className="flex-1 overflow-y-auto custom-scrollbar p-4 space-y-6">
        {/* User Profile Card */}
        <div className="flex flex-col items-center text-center p-4 rounded-2xl bg-neutral-900/60 border border-neutral-800">
          <div className="relative mb-3">
            <img
              src={user.avatar}
              alt={user.username}
              className="w-20 h-20 rounded-full object-cover border-2 border-neutral-800 shadow-lg"
            />
            {user.isOnline && (
              <span className="absolute bottom-1 right-1 w-4 h-4 bg-emerald-500 border-2 border-neutral-950 rounded-full" />
            )}
          </div>

          <h3 className="font-bold text-white text-base leading-snug">
            {user.fullName}
          </h3>
          <p className="text-xs text-rose-400 font-medium mb-2">
            @{user.username}
          </p>

          {user.bio && (
            <p className="text-xs text-neutral-400 max-w-xs mb-3 leading-relaxed">
              {user.bio}
            </p>
          )}

          <div className="flex items-center gap-4 text-xs text-neutral-300 py-2 px-4 rounded-xl bg-neutral-950 border border-neutral-800/80 mb-3 w-full justify-around">
            <div className="text-center">
              <span className="font-bold text-white block">
                {user.followers || "10K"}
              </span>
              <span className="text-[10px] text-neutral-500">Followers</span>
            </div>
            <div className="w-[1px] h-6 bg-neutral-800" />
            <div className="text-center">
              <span className="font-bold text-white block">
                {user.following || "250"}
              </span>
              <span className="text-[10px] text-neutral-500">Following</span>
            </div>
          </div>

          <Link
            to={`/profile`}
            className="w-full py-2 px-3 rounded-xl bg-neutral-800 hover:bg-neutral-700 text-white text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors"
          >
            <User className="w-3.5 h-3.5" />
            View Profile
            <ExternalLink className="w-3 h-3 text-neutral-400" />
          </Link>
        </div>

        {/* Quick Settings */}
        <div className="space-y-1">
          <p className="text-xs font-semibold text-neutral-500 uppercase tracking-wider px-1 mb-2">
            Chat Settings
          </p>

          <div
            onClick={toggleMute}
            className="flex items-center justify-between p-3 rounded-xl bg-neutral-900/40 hover:bg-neutral-900 border border-neutral-800/80 cursor-pointer transition-colors"
          >
            <div className="flex items-center gap-2.5">
              {isMuted ? (
                <BellOff className="w-4 h-4 text-neutral-400" />
              ) : (
                <Bell className="w-4 h-4 text-neutral-400" />
              )}
              <span className="text-xs text-white font-medium">
                Mute Notifications
              </span>
            </div>
            <div
              className={`w-9 h-5 rounded-full transition-colors p-0.5 flex items-center ${
                isMuted ? "bg-rose-500 justify-end" : "bg-neutral-800 justify-start"
              }`}
            >
              <div className="w-4 h-4 rounded-full bg-white shadow-sm" />
            </div>
          </div>
        </div>

        {/* Shared Media */}
        <div>
          <div className="flex items-center justify-between px-1 mb-2">
            <p className="text-xs font-semibold text-neutral-500 uppercase tracking-wider flex items-center gap-1.5">
              <ImageIcon className="w-3.5 h-3.5" />
              Shared Photos ({sharedImages.length})
            </p>
          </div>

          {sharedImages.length === 0 ? (
            <p className="text-xs text-neutral-500 italic px-1">
              No photos shared yet
            </p>
          ) : (
            <div className="grid grid-cols-3 gap-2">
              {sharedImages.map((img) => (
                <div
                  key={img.id}
                  className="aspect-square rounded-xl overflow-hidden border border-neutral-800 bg-neutral-900 group"
                >
                  <img
                    src={img.mediaUrl}
                    alt="Shared"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                  />
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Shared Reels */}
        <div>
          <div className="flex items-center justify-between px-1 mb-2">
            <p className="text-xs font-semibold text-neutral-500 uppercase tracking-wider flex items-center gap-1.5">
              <Film className="w-3.5 h-3.5 text-rose-500" />
              Shared Reels ({sharedReels.length})
            </p>
          </div>

          {sharedReels.length === 0 ? (
            <p className="text-xs text-neutral-500 italic px-1">
              No reels shared yet
            </p>
          ) : (
            <div className="grid grid-cols-2 gap-2">
              {sharedReels.map((item) => (
                <div
                  key={item.id}
                  className="aspect-[9/12] rounded-xl overflow-hidden border border-neutral-800 bg-neutral-900 relative group cursor-pointer"
                >
                  <img
                    src={item.reelData?.thumbnail}
                    alt={item.reelData?.caption}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent" />
                  <p className="absolute bottom-1.5 left-1.5 right-1.5 text-[10px] text-white line-clamp-1">
                    {item.reelData?.caption}
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Danger zone / actions */}
        <div className="pt-2 border-t border-neutral-800 space-y-1">
          <button
            onClick={() => {
              toast.error(`Reported @${user.username}`, {
                style: {
                  background: "#171717",
                  color: "#fff",
                  border: "1px solid #262626",
                },
              });
            }}
            className="w-full py-2 px-3 rounded-xl hover:bg-neutral-900 text-xs text-neutral-400 hover:text-amber-400 flex items-center gap-2 transition-colors text-left"
          >
            <ShieldAlert className="w-4 h-4" />
            Report @{user.username}
          </button>

          <button
            onClick={() => {
              onDeleteChat?.();
              toast.success("Chat deleted", {
                style: {
                  background: "#171717",
                  color: "#fff",
                  border: "1px solid #262626",
                },
              });
            }}
            className="w-full py-2 px-3 rounded-xl hover:bg-rose-500/10 text-xs text-rose-400 hover:text-rose-300 flex items-center gap-2 transition-colors text-left"
          >
            <Trash2 className="w-4 h-4" />
            Delete Conversation
          </button>
        </div>
      </div>
    </div>
  );
};
