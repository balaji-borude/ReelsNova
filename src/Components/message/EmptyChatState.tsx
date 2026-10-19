import React from "react";
import { MessageSquarePlus, Send, Sparkles } from "lucide-react";

interface EmptyChatStateProps {
  onNewMessage: () => void;
}

export const EmptyChatState: React.FC<EmptyChatStateProps> = ({ onNewMessage }) => {
  return (
    <div className="flex-1 flex flex-col items-center justify-center p-8 text-center bg-neutral-950 h-full">
      <div className="relative mb-6">
        <div className="w-24 h-24 rounded-3xl bg-neutral-900 border border-neutral-800 flex items-center justify-center shadow-2xl relative">
          <div className="absolute -inset-1 bg-gradient-to-tr from-rose-500/20 to-pink-500/20 rounded-3xl blur-xl" />
          <div className="relative w-16 h-16 rounded-2xl bg-gradient-to-tr from-rose-500 to-pink-600 flex items-center justify-center text-white shadow-lg">
            <Send className="w-8 h-8 -rotate-12 translate-x-0.5" />
          </div>
        </div>
        <div className="absolute -bottom-2 -right-2 p-2 rounded-full bg-neutral-900 border border-neutral-800 text-rose-400">
          <Sparkles className="w-4 h-4" />
        </div>
      </div>

      <h2 className="text-2xl font-bold text-white tracking-tight mb-2">
        Your Direct Messages
      </h2>
      <p className="text-neutral-400 max-w-sm text-sm mb-6 leading-relaxed">
        Send private messages, share trending reels, send photos and voice notes directly to friends and creators.
      </p>

      <button
        onClick={onNewMessage}
        className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-gradient-to-r from-rose-500 to-rose-600 hover:from-rose-600 hover:to-rose-700 text-white font-medium text-sm shadow-lg shadow-rose-500/20 transition-all duration-200 transform hover:scale-[1.02] active:scale-[0.98]"
      >
        <MessageSquarePlus className="w-4 h-4" />
        Send Message
      </button>
    </div>
  );
};
