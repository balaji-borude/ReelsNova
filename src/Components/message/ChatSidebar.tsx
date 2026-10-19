import React, { useState } from "react";
import {
  Search,
  SquarePen,
  Pin,
  Image as ImageIcon,
  Film,
  Mic,
  Plus,
  Circle,
} from "lucide-react";
import type { Conversation } from "./types";
import { currentUser, mockUsers } from "./mockData";

interface ChatSidebarProps {
  conversations: Conversation[];
  activeConversationId: string | null;
  onSelectConversation: (id: string) => void;
  onNewMessage: () => void;
  searchQuery: string;
  onSearchChange: (query: string) => void;
  selectedFilter: "all" | "unread" | "online";
  onFilterChange: (filter: "all" | "unread" | "online") => void;
}

export const ChatSidebar: React.FC<ChatSidebarProps> = ({
  conversations,
  activeConversationId,
  onSelectConversation,
  onNewMessage,
  searchQuery,
  onSearchChange,
  selectedFilter,
  onFilterChange,
}) => {
  const [userNote, setUserNote] = useState<string>(currentUser.note || "");
  const [isEditingNote, setIsEditingNote] = useState(false);
  const [tempNote, setTempNote] = useState(userNote);

  // Filter conversations
  const filteredConversations = conversations.filter((c) => {
    const matchesSearch =
      c.participant.fullName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.participant.username.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (c.lastMessage.text &&
        c.lastMessage.text.toLowerCase().includes(searchQuery.toLowerCase()));

    if (!matchesSearch) return false;

    if (selectedFilter === "unread") return c.unreadCount > 0;
    if (selectedFilter === "online") return c.participant.isOnline;
    return true;
  });

  const handleSaveNote = () => {
    setUserNote(tempNote);
    setIsEditingNote(false);
  };

  return (
    <aside className="w-full md:w-80 lg:w-96 h-full flex flex-col border-r border-neutral-800 bg-neutral-950/70 backdrop-blur-xl shrink-0 select-none">
      {/* Top Header */}
      <div className="p-4 flex items-center justify-between border-b border-neutral-800/80">
        <div className="flex items-center gap-2">
          <span className="font-bold text-white text-lg tracking-tight">
            Messages
          </span>
          <span className="text-xs px-2 py-0.5 rounded-full bg-rose-500/10 text-rose-400 font-medium border border-rose-500/20">
            {conversations.reduce((acc, c) => acc + c.unreadCount, 0)} new
          </span>
        </div>
        <button
          onClick={onNewMessage}
          title="New message"
          className="p-2 rounded-xl text-neutral-300 hover:text-white bg-neutral-900 hover:bg-neutral-800 border border-neutral-800 transition-all active:scale-95 shadow-sm"
        >
          <SquarePen className="w-4 h-4" />
        </button>
      </div>

      {/* Notes / Status Stories Row */}
      <div className="p-3 border-b border-neutral-800/60 overflow-x-auto no-scrollbar">
        <div className="flex items-center gap-3 min-w-max px-1">
          {/* Current user note */}
          <div className="flex flex-col items-center relative group">
            <div className="relative mb-1">
              <img
                src={currentUser.avatar}
                alt={currentUser.username}
                className="w-13 h-13 rounded-full object-cover border-2 border-dashed border-rose-500/60 p-0.5"
              />
              <button
                onClick={() => {
                  setTempNote(userNote);
                  setIsEditingNote(true);
                }}
                className="absolute -bottom-1 -right-1 w-5 h-5 rounded-full bg-gradient-to-r from-rose-500 to-rose-600 text-white flex items-center justify-center shadow-md border-2 border-neutral-950 hover:scale-110 transition-transform"
                title="Update your note"
              >
                <Plus className="w-3 h-3" />
              </button>
            </div>
            {/* Note Bubble */}
            <div
              onClick={() => {
                setTempNote(userNote);
                setIsEditingNote(true);
              }}
              className="max-w-[76px] cursor-pointer"
            >
              <div className="bg-neutral-900 border border-neutral-800 px-2 py-0.5 rounded-lg text-[10px] text-neutral-300 truncate text-center shadow-sm hover:border-rose-500/50 transition-colors">
                {userNote ? userNote : "Your Note"}
              </div>
              <p className="text-[11px] text-neutral-400 text-center truncate mt-0.5">
                Your note
              </p>
            </div>
          </div>

          {/* Friends notes */}
          {mockUsers
            .filter((u) => u.note)
            .map((user) => (
              <div
                key={user.id}
                onClick={() => {
                  const targetConv = conversations.find(
                    (c) => c.participant.id === user.id
                  );
                  if (targetConv) {
                    onSelectConversation(targetConv.id);
                  }
                }}
                className="flex flex-col items-center cursor-pointer group"
              >
                <div className="relative mb-1">
                  <div className="p-0.5 rounded-full bg-gradient-to-tr from-rose-500 to-amber-500">
                    <img
                      src={user.avatar}
                      alt={user.username}
                      className="w-12 h-12 rounded-full object-cover border-2 border-neutral-950"
                    />
                  </div>
                  {user.isOnline && (
                    <span className="absolute bottom-0 right-0 w-3.5 h-3.5 bg-emerald-500 border-2 border-neutral-950 rounded-full" />
                  )}
                </div>
                <div className="max-w-[76px]">
                  <div className="bg-neutral-900 border border-neutral-800 px-1.5 py-0.5 rounded-lg text-[10px] text-neutral-200 truncate text-center shadow-sm group-hover:border-neutral-700">
                    {user.note}
                  </div>
                  <p className="text-[11px] text-neutral-400 text-center truncate mt-0.5">
                    {user.username}
                  </p>
                </div>
              </div>
            ))}
        </div>
      </div>

      {/* Note Editing Modal */}
      {isEditingNote && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-neutral-900 border border-neutral-800 rounded-2xl p-5 max-w-xs w-full shadow-2xl">
            <h4 className="text-sm font-semibold text-white mb-2">Share a Note</h4>
            <p className="text-xs text-neutral-400 mb-3">
              Share a thought or status that appears at the top of your friends' chats.
            </p>
            <input
              type="text"
              maxLength={40}
              value={tempNote}
              onChange={(e) => setTempNote(e.target.value)}
              placeholder="What's on your mind?..."
              className="w-full px-3 py-2 bg-neutral-950 border border-neutral-800 rounded-xl text-sm text-white placeholder-neutral-500 focus:outline-none focus:border-rose-500 mb-4"
              autoFocus
            />
            <div className="flex items-center justify-end gap-2">
              <button
                onClick={() => setIsEditingNote(false)}
                className="px-3 py-1.5 text-xs text-neutral-400 hover:text-white"
              >
                Cancel
              </button>
              <button
                onClick={handleSaveNote}
                className="px-4 py-1.5 rounded-lg bg-gradient-to-r from-rose-500 to-rose-600 text-white text-xs font-semibold hover:from-rose-600 hover:to-rose-700"
              >
                Share
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Search Input */}
      <div className="px-4 pt-3 pb-2">
        <div className="relative">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-neutral-500" />
          <input
            type="text"
            placeholder="Search conversations..."
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            className="w-full pl-9 pr-3 py-1.5 bg-neutral-900/80 border border-neutral-800 rounded-xl text-xs text-white placeholder-neutral-500 focus:outline-none focus:border-neutral-700 transition-colors"
          />
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="px-4 py-2 flex items-center gap-1.5 border-b border-neutral-800/60">
        <button
          onClick={() => onFilterChange("all")}
          className={`px-3 py-1 rounded-full text-xs font-medium transition-all ${
            selectedFilter === "all"
              ? "bg-rose-500 text-white shadow-sm shadow-rose-500/20"
              : "bg-neutral-900 text-neutral-400 hover:text-neutral-200 border border-neutral-800/80"
          }`}
        >
          All
        </button>
        <button
          onClick={() => onFilterChange("unread")}
          className={`px-3 py-1 rounded-full text-xs font-medium transition-all ${
            selectedFilter === "unread"
              ? "bg-rose-500 text-white shadow-sm shadow-rose-500/20"
              : "bg-neutral-900 text-neutral-400 hover:text-neutral-200 border border-neutral-800/80"
          }`}
        >
          Unread
        </button>
        <button
          onClick={() => onFilterChange("online")}
          className={`px-3 py-1 rounded-full text-xs font-medium transition-all flex items-center gap-1.5 ${
            selectedFilter === "online"
              ? "bg-rose-500 text-white shadow-sm shadow-rose-500/20"
              : "bg-neutral-900 text-neutral-400 hover:text-neutral-200 border border-neutral-800/80"
          }`}
        >
          <Circle className="w-2 h-2 fill-emerald-500 text-emerald-500" />
          Online
        </button>
      </div>

      {/* Conversation List */}
      <div className="flex-1 overflow-y-auto custom-scrollbar p-2 space-y-1">
        {filteredConversations.length === 0 ? (
          <div className="py-12 text-center text-xs text-neutral-500">
            No conversations found
          </div>
        ) : (
          filteredConversations.map((conv) => {
            const isActive = activeConversationId === conv.id;
            const hasUnread = conv.unreadCount > 0;

            return (
              <div
                key={conv.id}
                onClick={() => onSelectConversation(conv.id)}
                className={`flex items-center gap-3 p-3 rounded-2xl cursor-pointer transition-all duration-150 relative ${
                  isActive
                    ? "bg-neutral-900 border border-neutral-800 shadow-md"
                    : "hover:bg-neutral-900/50 border border-transparent"
                }`}
              >
                {/* Active Indicator bar */}
                {isActive && (
                  <span className="absolute left-1 top-3 bottom-3 w-1 bg-gradient-to-b from-rose-500 to-pink-500 rounded-full" />
                )}

                {/* Avatar with Online Badge */}
                <div className="relative shrink-0 ml-1">
                  <img
                    src={conv.participant.avatar}
                    alt={conv.participant.username}
                    className="w-12 h-12 rounded-full object-cover border border-neutral-800"
                  />
                  {conv.participant.isOnline && (
                    <span className="absolute bottom-0 right-0 w-3 h-3 bg-emerald-500 border-2 border-neutral-950 rounded-full" />
                  )}
                </div>

                {/* Info & Snippet */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-0.5">
                    <div className="flex items-center gap-1.5 min-w-0">
                      <p
                        className={`text-sm font-semibold truncate ${
                          hasUnread ? "text-white" : "text-neutral-200"
                        }`}
                      >
                        {conv.participant.fullName}
                      </p>
                      {conv.isPinned && (
                        <Pin className="w-3 h-3 text-neutral-400 rotate-45 shrink-0" />
                      )}
                    </div>
                    <span
                      className={`text-[11px] shrink-0 ${
                        hasUnread
                          ? "text-rose-400 font-medium"
                          : "text-neutral-500"
                      }`}
                    >
                      {conv.updatedAt}
                    </span>
                  </div>

                  <div className="flex items-center justify-between gap-2">
                    <div className="flex items-center gap-1.5 min-w-0 text-xs text-neutral-400 truncate">
                      {conv.lastMessage.type === "reel" && (
                        <span className="flex items-center gap-1 text-rose-400 shrink-0">
                          <Film className="w-3.5 h-3.5" /> Reel •
                        </span>
                      )}
                      {conv.lastMessage.type === "image" && (
                        <span className="flex items-center gap-1 text-rose-400 shrink-0">
                          <ImageIcon className="w-3.5 h-3.5" /> Photo •
                        </span>
                      )}
                      {conv.lastMessage.type === "audio" && (
                        <span className="flex items-center gap-1 text-rose-400 shrink-0">
                          <Mic className="w-3.5 h-3.5" /> Voice note •
                        </span>
                      )}
                      <span
                        className={`truncate ${
                          hasUnread
                            ? "font-semibold text-neutral-200"
                            : "text-neutral-400"
                        }`}
                      >
                        {conv.lastMessage.text || "Sent an attachment"}
                      </span>
                    </div>

                    {hasUnread && (
                      <span className="w-5 h-5 rounded-full bg-gradient-to-r from-rose-500 to-rose-600 text-white text-[10px] font-bold flex items-center justify-center shrink-0 shadow-sm shadow-rose-500/30">
                        {conv.unreadCount}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>
    </aside>
  );
};
