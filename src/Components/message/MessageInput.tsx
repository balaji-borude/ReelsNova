import React, { useState, useRef, useEffect } from "react";
import {
  Smile,
  Image as ImageIcon,
  Film,
  Mic,
  Send,
  X,
} from "lucide-react";
import type { SharedReel } from "./types";

interface MessageInputProps {
  onSendMessage: (text: string) => void;
  onSendReel: (reel: SharedReel) => void;
  onSendImage: (imageUrl: string) => void;
  onSendAudio: (duration: string) => void;
}

const SAMPLE_REELS: SharedReel[] = [
  {
    id: "reel-dance-1",
    author: "dance_queen",
    thumbnail: "/dance-video-content-creator.jpg",
    caption: "New viral choreo alert! 💃 #dance",
    likes: "234K",
  },
  {
    id: "reel-food-1",
    author: "foodie_chef",
    thumbnail: "/cooking-food-video-chef.jpg",
    caption: "Authentic 5-minute creamy pasta recipe 🍝",
    likes: "89K",
  },
  {
    id: "reel-nature-1",
    author: "travel_vibes",
    thumbnail: "/mountain-adventure-sunset.png",
    caption: "Golden hour sunset from the mountain peak 🌄",
    likes: "567K",
  },
  {
    id: "reel-gym-1",
    author: "fitness_pro",
    thumbnail: "/fitness-workout-gym-motivation.jpg",
    caption: "High intensity morning burner routine 💪",
    likes: "123K",
  },
];

const EMOJIS = ["❤️", "🔥", "😂", "✨", "👏", "🙌", "😍", "🎉", "💯", "🚀", "🥹", "👀", "🍕", "⚡"];

export const MessageInput: React.FC<MessageInputProps> = ({
  onSendMessage,
  onSendReel,
  onSendImage,
  onSendAudio,
}) => {
  const [inputText, setInputText] = useState("");
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [showReelPicker, setShowReelPicker] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [recordSeconds, setRecordSeconds] = useState(0);

  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);
  const emojiPickerRef = useRef<HTMLDivElement | null>(null);

  // Close emoji picker on click outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        emojiPickerRef.current &&
        !emojiPickerRef.current.contains(e.target as Node)
      ) {
        setShowEmojiPicker(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Voice recording timer simulation
  useEffect(() => {
    let timer: ReturnType<typeof setInterval>;
    if (isRecording) {
      timer = setInterval(() => {
        setRecordSeconds((s) => s + 1);
      }, 1000);
    } else {
      setRecordSeconds(0);
    }
    return () => clearInterval(timer);
  }, [isRecording]);

  const handleSend = () => {
    if (inputText.trim()) {
      onSendMessage(inputText.trim());
      setInputText("");
      if (textareaRef.current) {
        textareaRef.current.style.height = "auto";
      }
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const fakeUrl = URL.createObjectURL(file);
      onSendImage(fakeUrl);
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    }
  };

  const handleFinishAudio = () => {
    const minutes = Math.floor(recordSeconds / 60);
    const secs = recordSeconds % 60;
    const duration = `${minutes}:${secs < 10 ? "0" : ""}${secs}`;
    onSendAudio(duration === "0:00" ? "0:05" : duration);
    setIsRecording(false);
  };

  return (
    <div className="p-3 bg-neutral-950/90 border-t border-neutral-800/80 relative">
      {/* 1. Emoji Picker Popover */}
      {showEmojiPicker && (
        <div
          ref={emojiPickerRef}
          className="absolute bottom-16 left-4 bg-neutral-900 border border-neutral-800 rounded-2xl p-3 shadow-2xl z-30 animate-in fade-in slide-in-from-bottom-2 duration-150"
        >
          <div className="grid grid-cols-7 gap-2">
            {EMOJIS.map((emoji) => (
              <button
                key={emoji}
                onClick={() => {
                  setInputText((prev) => prev + emoji);
                  setShowEmojiPicker(false);
                }}
                className="w-8 h-8 flex items-center justify-center text-lg hover:bg-neutral-800 rounded-lg transition-transform hover:scale-120"
              >
                {emoji}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* 2. Reel Share Modal / Drawer */}
      {showReelPicker && (
        <div className="absolute bottom-16 left-4 right-4 sm:right-auto sm:w-96 bg-neutral-900 border border-neutral-800 rounded-2xl p-4 shadow-2xl z-30 animate-in fade-in slide-in-from-bottom-2 duration-150">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-1.5 font-semibold text-xs text-white uppercase tracking-wider">
              <Film className="w-3.5 h-3.5 text-rose-500" />
              Share a Reel
            </div>
            <button
              onClick={() => setShowReelPicker(false)}
              className="p-1 rounded-lg text-neutral-400 hover:text-white"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          <div className="grid grid-cols-2 gap-2 max-h-56 overflow-y-auto custom-scrollbar">
            {SAMPLE_REELS.map((reel) => (
              <div
                key={reel.id}
                onClick={() => {
                  onSendReel(reel);
                  setShowReelPicker(false);
                }}
                className="group relative rounded-xl overflow-hidden aspect-[9/12] bg-neutral-950 cursor-pointer border border-neutral-800 hover:border-rose-500 transition-all"
              >
                <img
                  src={reel.thumbnail}
                  alt={reel.caption}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/30" />
                <span className="absolute top-2 left-2 text-[10px] text-white bg-black/60 px-1.5 py-0.5 rounded-md">
                  @{reel.author}
                </span>
                <p className="absolute bottom-2 left-2 right-2 text-[10px] text-neutral-200 line-clamp-1">
                  {reel.caption}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Hidden File Input */}
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleImageUpload}
        accept="image/*"
        className="hidden"
      />

      {/* 3. Recording Bar Mode */}
      {isRecording ? (
        <div className="flex items-center justify-between bg-neutral-900 border border-rose-500/40 rounded-2xl px-4 py-2.5 animate-pulse">
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-rose-500 animate-ping" />
            <span className="text-xs font-medium text-rose-400">
              Recording Voice Note:
            </span>
            <span className="text-xs font-mono text-white">
              {Math.floor(recordSeconds / 60)}:
              {recordSeconds % 60 < 10 ? "0" : ""}
              {recordSeconds % 60}
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setIsRecording(false)}
              className="text-xs text-neutral-400 hover:text-white px-2 py-1 rounded-lg"
            >
              Cancel
            </button>
            <button
              onClick={handleFinishAudio}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-gradient-to-r from-rose-500 to-rose-600 text-white text-xs font-semibold shadow-md shadow-rose-500/25"
            >
              <Send className="w-3.5 h-3.5" />
              Send
            </button>
          </div>
        </div>
      ) : (
        /* 4. Normal Input Bar */
        <div className="flex items-center gap-2 bg-neutral-900/90 border border-neutral-800 rounded-2xl p-1.5 pl-3 transition-colors focus-within:border-neutral-700">
          {/* Emojis toggle */}
          <button
            type="button"
            onClick={() => setShowEmojiPicker(!showEmojiPicker)}
            className="text-neutral-400 hover:text-rose-400 p-1.5 rounded-lg transition-colors"
            title="Add emoji"
          >
            <Smile className="w-5 h-5" />
          </button>

          {/* Quick reel share button */}
          <button
            type="button"
            onClick={() => setShowReelPicker(!showReelPicker)}
            className="text-neutral-400 hover:text-rose-400 p-1.5 rounded-lg transition-colors"
            title="Share Reel"
          >
            <Film className="w-5 h-5" />
          </button>

          {/* Image file upload */}
          <button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            className="text-neutral-400 hover:text-rose-400 p-1.5 rounded-lg transition-colors"
            title="Attach image"
          >
            <ImageIcon className="w-5 h-5" />
          </button>

          {/* Text Input area */}
          <textarea
            ref={textareaRef}
            rows={1}
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Message..."
            className="flex-1 bg-transparent text-sm text-white placeholder-neutral-500 resize-none outline-none py-1.5 px-2 max-h-24 custom-scrollbar"
          />

          {/* Voice note trigger or Send button */}
          {inputText.trim().length > 0 ? (
            <button
              onClick={handleSend}
              className="p-2 rounded-xl bg-gradient-to-r from-rose-500 to-rose-600 text-white hover:from-rose-600 hover:to-rose-700 shadow-md shadow-rose-500/25 transition-transform active:scale-95"
              title="Send message"
            >
              <Send className="w-4 h-4 translate-x-0.5" />
            </button>
          ) : (
            <button
              type="button"
              onClick={() => setIsRecording(true)}
              className="p-2 text-neutral-400 hover:text-rose-400 rounded-xl hover:bg-neutral-800/60 transition-colors"
              title="Record voice note"
            >
              <Mic className="w-5 h-5" />
            </button>
          )}
        </div>
      )}
    </div>
  );
};
