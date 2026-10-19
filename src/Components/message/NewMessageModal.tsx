import React, { useState } from "react";
import { X, Search, Check, MessageSquare } from "lucide-react";
import type { ChatUser } from "./types";
import { mockUsers } from "./mockData";

interface NewMessageModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectUser: (user: ChatUser) => void;
}

export const NewMessageModal: React.FC<NewMessageModalProps> = ({
  isOpen,
  onClose,
  onSelectUser,
}) => {
  const [search, setSearch] = useState("");
  const [selectedUserId, setSelectedUserId] = useState<string | null>(null);

  if (!isOpen) return null;

  const filteredUsers = mockUsers.filter(
    (u) =>
      u.username.toLowerCase().includes(search.toLowerCase()) ||
      u.fullName.toLowerCase().includes(search.toLowerCase())
  );

  const handleStartChat = () => {
    if (!selectedUserId) return;
    const targetUser = mockUsers.find((u) => u.id === selectedUserId);
    if (targetUser) {
      onSelectUser(targetUser);
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="w-full max-w-md bg-neutral-900 border border-neutral-800 rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[85vh]">
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-neutral-800">
          <h3 className="font-semibold text-white text-base">New Message</h3>
          <button
            onClick={onClose}
            className="p-1 rounded-lg text-neutral-400 hover:text-white hover:bg-neutral-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Search */}
        <div className="p-4 border-b border-neutral-800">
          <div className="relative">
            <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-neutral-400" />
            <input
              type="text"
              placeholder="Search people..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-neutral-950 border border-neutral-800 rounded-xl text-sm text-white placeholder-neutral-500 focus:outline-none focus:border-rose-500 transition-colors"
              autoFocus
            />
          </div>
        </div>

        {/* User list */}
        <div className="flex-1 overflow-y-auto custom-scrollbar p-2 space-y-1">
          <p className="px-3 py-2 text-xs font-semibold text-neutral-500 uppercase tracking-wider">
            Suggested
          </p>

          {filteredUsers.length === 0 ? (
            <div className="py-8 text-center text-sm text-neutral-500">
              No users found matching "{search}"
            </div>
          ) : (
            filteredUsers.map((user) => {
              const isSelected = selectedUserId === user.id;
              return (
                <div
                  key={user.id}
                  onClick={() => setSelectedUserId(user.id)}
                  className={`flex items-center justify-between p-3 rounded-xl cursor-pointer transition-all duration-150 ${
                    isSelected
                      ? "bg-rose-500/10 border border-rose-500/30"
                      : "hover:bg-neutral-800/60 border border-transparent"
                  }`}
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <div className="relative shrink-0">
                      <img
                        src={user.avatar}
                        alt={user.username}
                        className="w-11 h-11 rounded-full object-cover border border-neutral-800"
                      />
                      {user.isOnline && (
                        <span className="absolute bottom-0 right-0 w-3 h-3 bg-emerald-500 border-2 border-neutral-900 rounded-full" />
                      )}
                    </div>
                    <div className="min-w-0">
                      <p className="text-sm font-medium text-white truncate">
                        {user.fullName}
                      </p>
                      <p className="text-xs text-neutral-400 truncate">
                        @{user.username} • {user.followers} followers
                      </p>
                    </div>
                  </div>

                  <div
                    className={`w-5 h-5 rounded-full border flex items-center justify-center shrink-0 transition-colors ${
                      isSelected
                        ? "bg-rose-500 border-rose-500 text-white"
                        : "border-neutral-700 bg-neutral-800/50"
                    }`}
                  >
                    {isSelected && <Check className="w-3 h-3" />}
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-neutral-800 bg-neutral-900/60">
          <button
            onClick={handleStartChat}
            disabled={!selectedUserId}
            className={`w-full py-2.5 rounded-xl text-sm font-semibold flex items-center justify-center gap-2 transition-all ${
              selectedUserId
                ? "bg-gradient-to-r from-rose-500 to-rose-600 hover:from-rose-600 hover:to-rose-700 text-white shadow-lg shadow-rose-500/25"
                : "bg-neutral-800 text-neutral-500 cursor-not-allowed"
            }`}
          >
            <MessageSquare className="w-4 h-4" />
            Chat
          </button>
        </div>
      </div>
    </div>
  );
};
