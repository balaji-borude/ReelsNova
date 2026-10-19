import React, { useState } from "react";
import {
  Check,
  CheckCheck,
  Play,
  Pause,
  Heart,
  Film,
} from "lucide-react";
import type { MessageItem } from "./types";

interface MessageBubbleProps {
  message: MessageItem;
  isMe: boolean;
  senderAvatar?: string;
  onReact: (messageId: string, emoji: string) => void;
  onOpenReel?: (reelId: string | number) => void;
}

const QUICK_EMOJIS = ["❤️", "😂", "🔥", "😮", "👏", "🙌"];

export const MessageBubble: React.FC<MessageBubbleProps> = ({
  message,
  isMe,
  senderAvatar,
  onReact,
  onOpenReel,
}) => {
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);
  const [audioProgress, setAudioProgress] = useState(0);

  // Simulated audio playback
  const handleToggleAudio = () => {
    if (isPlayingAudio) {
      setIsPlayingAudio(false);
    } else {
      setIsPlayingAudio(true);
      let p = 0;
      const interval = setInterval(() => {
        p += 5;
        if (p > 100) {
          clearInterval(interval);
          setIsPlayingAudio(false);
          setAudioProgress(0);
        } else {
          setAudioProgress(p);
        }
      }, 100);
    }
  };

  return (
    <div
      className={`flex items-end gap-2 my-2 group relative ${
        isMe ? "justify-end" : "justify-start"
      }`}
    >
      {/* Other user avatar */}
      {!isMe && senderAvatar && (
        <img
          src={senderAvatar}
          alt="Sender"
          className="w-7 h-7 rounded-full object-cover shrink-0 mb-1 border border-neutral-800"
        />
      )}

      {/* Floating Hover Reaction Bar */}
      <div
        className={`absolute -top-7 ${
          isMe ? "right-2" : "left-9"
        } hidden group-hover:flex items-center gap-0.5 bg-neutral-900 border border-neutral-800 px-1.5 py-0.5 rounded-full shadow-xl z-20 animate-in fade-in duration-150`}
      >
        {QUICK_EMOJIS.map((emoji) => (
          <button
            key={emoji}
            onClick={() => onReact(message.id, emoji)}
            className="text-xs p-1 hover:scale-125 transition-transform"
          >
            {emoji}
          </button>
        ))}
      </div>

      <div className="flex flex-col max-w-[85%] sm:max-w-[70%]">
        {/* Main Content Bubble */}
        <div
          className={`relative px-4 py-2.5 rounded-2xl text-sm break-words transition-all shadow-sm ${
            isMe
              ? "bg-gradient-to-r from-rose-600 to-rose-700 text-white rounded-br-xs shadow-rose-950/20"
              : "bg-neutral-900 border border-neutral-800 text-neutral-100 rounded-bl-xs"
          }`}
        >
          {/* 1. TEXT MESSAGE */}
          {message.text && (
            <p className="leading-relaxed whitespace-pre-wrap">{message.text}</p>
          )}

          {/* 2. REEL PREVIEW CARD */}
          {message.type === "reel" && message.reelData && (
            <div
              onClick={() => onOpenReel?.(message.reelData!.id)}
              className="mt-2 rounded-xl overflow-hidden bg-neutral-950/80 border border-neutral-800/80 cursor-pointer group/reel hover:border-rose-500/50 transition-all max-w-xs"
            >
              <div className="relative aspect-[9/12] w-full max-h-56 overflow-hidden bg-neutral-900">
                <img
                  src={message.reelData.thumbnail}
                  alt={message.reelData.caption}
                  className="w-full h-full object-cover group-hover/reel:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/20" />
                
                {/* Play Badge */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-11 h-11 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center text-white shadow-lg group-hover/reel:scale-110 transition-transform">
                    <Play className="w-5 h-5 fill-white translate-x-0.5" />
                  </div>
                </div>

                {/* Reel author badge */}
                <div className="absolute top-2 left-2 flex items-center gap-1.5 px-2 py-1 rounded-full bg-black/50 backdrop-blur-md text-[11px] text-white">
                  <Film className="w-3 h-3 text-rose-400" />
                  <span>@{message.reelData.author}</span>
                </div>

                {/* Reel stats bottom */}
                <div className="absolute bottom-2 left-2 right-2 text-white">
                  <p className="text-xs line-clamp-2 mb-1 text-neutral-200">
                    {message.reelData.caption}
                  </p>
                  <div className="flex items-center gap-2 text-[10px] text-neutral-400 font-medium">
                    <span className="flex items-center gap-1">
                      <Heart className="w-3 h-3 fill-rose-500 text-rose-500" />
                      {message.reelData.likes}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* 3. IMAGE MESSAGE */}
          {message.type === "image" && message.mediaUrl && (
            <div className="mt-2 rounded-xl overflow-hidden border border-neutral-800/60 max-w-xs">
              <img
                src={message.mediaUrl}
                alt="Shared attachment"
                className="w-full max-h-64 object-cover hover:opacity-95 transition-opacity cursor-pointer"
              />
            </div>
          )}

          {/* 4. VOICE NOTE MESSAGE */}
          {message.type === "audio" && (
            <div className="flex items-center gap-3 py-1 min-w-[200px] sm:min-w-[240px]">
              <button
                onClick={handleToggleAudio}
                className={`w-9 h-9 rounded-full flex items-center justify-center shrink-0 transition-transform active:scale-95 shadow-md ${
                  isMe
                    ? "bg-white text-rose-600 hover:bg-neutral-100"
                    : "bg-rose-500 text-white hover:bg-rose-600"
                }`}
              >
                {isPlayingAudio ? (
                  <Pause className="w-4 h-4 fill-current" />
                ) : (
                  <Play className="w-4 h-4 fill-current translate-x-0.5" />
                )}
              </button>

              {/* Waveform bars */}
              <div className="flex-1 flex items-center gap-0.5 h-7">
                {(message.audioWaveform || [40, 60, 80, 50, 70, 90, 30, 85, 60, 40, 75, 95, 55, 35]).map(
                  (val, idx, arr) => {
                    const isPlayed = (idx / arr.length) * 100 <= audioProgress;
                    return (
                      <div
                        key={idx}
                        className={`w-1 rounded-full transition-all duration-150 ${
                          isMe
                            ? isPlayed
                              ? "bg-white"
                              : "bg-rose-300/50"
                            : isPlayed
                            ? "bg-rose-500"
                            : "bg-neutral-700"
                        }`}
                        style={{ height: `${Math.max(20, val)}%` }}
                      />
                    );
                  }
                )}
              </div>

              <span
                className={`text-[11px] font-mono shrink-0 ${
                  isMe ? "text-rose-100" : "text-neutral-400"
                }`}
              >
                {message.audioDuration || "0:30"}
              </span>
            </div>
          )}

          {/* Footer inside bubble: timestamp & status */}
          <div
            className={`flex items-center justify-end gap-1 mt-1 text-[10px] ${
              isMe ? "text-rose-100/75" : "text-neutral-400"
            }`}
          >
            <span>{message.timestamp}</span>
            {isMe && (
              <span>
                {message.status === "read" ? (
                  <CheckCheck className="w-3.5 h-3.5 text-sky-300" />
                ) : message.status === "delivered" ? (
                  <CheckCheck className="w-3.5 h-3.5 text-rose-200" />
                ) : (
                  <Check className="w-3.5 h-3.5 text-rose-200" />
                )}
              </span>
            )}
          </div>
        </div>

        {/* Reaction Badges pinned below bubble */}
        {message.reactions && message.reactions.length > 0 && (
          <div
            className={`flex items-center gap-1 mt-1 ${
              isMe ? "justify-end" : "justify-start"
            }`}
          >
            {message.reactions.map((react, i) => (
              <span
                key={i}
                onClick={() => onReact(message.id, react.emoji)}
                className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded-full bg-neutral-900 border border-neutral-800 text-[11px] text-neutral-300 shadow-sm cursor-pointer hover:border-neutral-700 hover:scale-105 transition-all"
              >
                <span>{react.emoji}</span>
                {react.count > 1 && (
                  <span className="text-[10px] text-neutral-400 font-medium">
                    {react.count}
                  </span>
                )}
              </span>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
