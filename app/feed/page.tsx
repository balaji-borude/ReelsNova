"use client"

import { Navbar } from "@/components/layout/navbar"
import { Heart, MessageCircle, Share2, Bookmark, Volume2, VolumeX } from "lucide-react"
import { useState } from "react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

const feedReels = [
  {
    id: 1,
    username: "sarah_creates",
    avatar: "/woman-avatar-portrait.jpg",
    thumbnail: "/fashion-style-outfit-of-the-day.jpg",
    likes: "1.2M",
    comments: "45.2K",
    shares: "12K",
    caption: "Outfit check! What do you think? 👗✨ #fashion #ootd #style",
    music: "Original Sound - sarah_creates",
  },
  {
    id: 2,
    username: "chef_marco",
    avatar: "/man-chef-avatar.jpg",
    thumbnail: "/cooking-pasta-italian-food-kitchen.jpg",
    likes: "892K",
    comments: "23.1K",
    shares: "8.5K",
    caption: "The secret to perfect carbonara 🍝 #cooking #italian #foodie",
    music: "Italian Kitchen Vibes - ChefBeats",
  },
  {
    id: 3,
    username: "adventure_alex",
    avatar: "/adventurer-avatar-portrait.jpg",
    thumbnail: "/hiking-mountains-adventure-nature-sunset.jpg",
    likes: "2.1M",
    comments: "67.8K",
    shares: "34K",
    caption: "Found paradise at the top 🏔️ Worth every step #travel #hiking #nature",
    music: "Mountain High - Adventure Sounds",
  },
  {
    id: 4,
    username: "dance_dynasty",
    avatar: "/dancer-avatar-portrait.jpg",
    thumbnail: "/dance-choreography-hip-hop-studio.jpg",
    likes: "3.4M",
    comments: "98.2K",
    shares: "156K",
    caption: "New choreo just dropped! Learn it with me 💃🔥 #dance #viral #tutorial",
    music: "Hot Track 2024 - TopCharts",
  },
  {
    id: 5,
    username: "pet_paradise",
    avatar: "/cute-dog-avatar.png",
    thumbnail: "/cute-puppy-golden-retriever-playing.jpg",
    likes: "4.8M",
    comments: "234K",
    shares: "89K",
    caption: "My golden boy being the goodest boy 🐕💛 #puppy #dogsoftiktok #cute",
    music: "Happy Pets - Cute Sounds",
  },
]

export default function FeedPage() {
  const [currentReel, setCurrentReel] = useState(0)
  const [isMuted, setIsMuted] = useState(true)
  const [likedReels, setLikedReels] = useState<number[]>([])

  const toggleLike = (id: number) => {
    setLikedReels((prev) => (prev.includes(id) ? prev.filter((reelId) => reelId !== id) : [...prev, id]))
  }

  return (
    <div className="min-h-screen bg-neutral-950">
      <Navbar />

      <main className="pt-16 pb-20 md:pb-0">
        <div className="max-w-lg mx-auto">
          {/* Feed header */}
          <div className="sticky top-16 z-40 bg-neutral-950/95 backdrop-blur-md border-b border-neutral-800 px-4 py-3">
            <div className="flex items-center justify-between">
              <h1 className="text-xl font-bold text-white" style={{ fontFamily: "var(--font-display)" }}>
                For You
              </h1>
              <button
                onClick={() => setIsMuted(!isMuted)}
                className="p-2 hover:bg-neutral-800 rounded-full transition-colors"
                aria-label={isMuted ? "Unmute" : "Mute"}
              >
                {isMuted ? (
                  <VolumeX className="w-5 h-5 text-neutral-400" />
                ) : (
                  <Volume2 className="w-5 h-5 text-white" />
                )}
              </button>
            </div>
          </div>

          {/* Vertical Reels Feed */}
          <div className="space-y-4 p-4">
            {feedReels.map((reel, index) => (
              <div key={reel.id} className="relative bg-neutral-900 rounded-2xl overflow-hidden">
                {/* Reel content */}
                <div className="aspect-[9/16] relative">
                  <img
                    src={reel.thumbnail || "/placeholder.svg"}
                    alt={`Reel by ${reel.username}`}
                    className="w-full h-full object-cover"
                  />

                  {/* Gradient overlays */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/20" />

                  {/* Play/Pause indicator */}
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity cursor-pointer">
                    <div className="w-20 h-20 rounded-full bg-black/30 backdrop-blur-sm flex items-center justify-center">
                      <div className="w-0 h-0 border-l-[24px] border-l-white border-y-[14px] border-y-transparent ml-2" />
                    </div>
                  </div>

                  {/* Bottom info */}
                  <div className="absolute bottom-0 left-0 right-16 p-4">
                    {/* User info */}
                    <div className="flex items-center gap-3 mb-3">
                      <Avatar className="w-10 h-10 border-2 border-primary-500">
                        <AvatarImage src={reel.avatar || "/placeholder.svg"} alt={reel.username} />
                        <AvatarFallback className="bg-primary-500 text-white">
                          {reel.username.slice(0, 2).toUpperCase()}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <span className="text-white font-semibold text-sm">@{reel.username}</span>
                        <button className="ml-2 text-primary-500 text-sm font-medium hover:text-primary-400">
                          Follow
                        </button>
                      </div>
                    </div>

                    {/* Caption */}
                    <p className="text-white text-sm mb-3 line-clamp-2">{reel.caption}</p>

                    {/* Music */}
                    <div className="flex items-center gap-2 text-neutral-300 text-xs">
                      <span className="animate-spin-slow">🎵</span>
                      <span className="truncate">{reel.music}</span>
                    </div>
                  </div>

                  {/* Right side actions */}
                  <div className="absolute right-3 bottom-24 flex flex-col gap-5">
                    {/* Like */}
                    <button onClick={() => toggleLike(reel.id)} className="flex flex-col items-center gap-1 group">
                      <div
                        className={`p-2 rounded-full transition-colors ${
                          likedReels.includes(reel.id)
                            ? "bg-primary-500/20"
                            : "bg-neutral-800/50 group-hover:bg-neutral-700/50"
                        }`}
                      >
                        <Heart
                          className={`w-7 h-7 transition-colors ${
                            likedReels.includes(reel.id) ? "text-primary-500 fill-primary-500" : "text-white"
                          }`}
                        />
                      </div>
                      <span className="text-white text-xs font-medium">{reel.likes}</span>
                    </button>

                    {/* Comment */}
                    <button className="flex flex-col items-center gap-1 group">
                      <div className="p-2 rounded-full bg-neutral-800/50 group-hover:bg-neutral-700/50 transition-colors">
                        <MessageCircle className="w-7 h-7 text-white" />
                      </div>
                      <span className="text-white text-xs font-medium">{reel.comments}</span>
                    </button>

                    {/* Share */}
                    <button className="flex flex-col items-center gap-1 group">
                      <div className="p-2 rounded-full bg-neutral-800/50 group-hover:bg-neutral-700/50 transition-colors">
                        <Share2 className="w-6 h-6 text-white" />
                      </div>
                      <span className="text-white text-xs font-medium">{reel.shares}</span>
                    </button>

                    {/* Bookmark */}
                    <button className="flex flex-col items-center gap-1 group">
                      <div className="p-2 rounded-full bg-neutral-800/50 group-hover:bg-neutral-700/50 transition-colors">
                        <Bookmark className="w-6 h-6 text-white" />
                      </div>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Load more indicator */}
          <div className="text-center py-8">
            <div className="inline-flex items-center gap-2 text-neutral-400">
              <div className="w-2 h-2 bg-primary-500 rounded-full animate-bounce" />
              <div className="w-2 h-2 bg-primary-500 rounded-full animate-bounce delay-100" />
              <div className="w-2 h-2 bg-primary-500 rounded-full animate-bounce delay-200" />
            </div>
            <p className="text-neutral-500 text-sm mt-2">Loading more reels...</p>
          </div>
        </div>
      </main>

      {/* Mobile Bottom Navigation */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-neutral-950/95 backdrop-blur-md border-t border-neutral-800">
        <div className="flex items-center justify-around h-16">
          <button className="flex flex-col items-center gap-1 text-primary-500">
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
              <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z" />
            </svg>
            <span className="text-xs">Home</span>
          </button>
          <button className="flex flex-col items-center gap-1 text-neutral-400 hover:text-white">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
            <span className="text-xs">Explore</span>
          </button>
          <button className="flex flex-col items-center gap-1">
            <div className="w-10 h-7 bg-gradient-to-r from-secondary-500 to-primary-500 rounded-lg flex items-center justify-center">
              <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 4v16m8-8H4" stroke="currentColor" strokeWidth={3} strokeLinecap="round" />
              </svg>
            </div>
          </button>
          <button className="flex flex-col items-center gap-1 text-neutral-400 hover:text-white">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
              />
            </svg>
            <span className="text-xs">Inbox</span>
          </button>
          <button className="flex flex-col items-center gap-1 text-neutral-400 hover:text-white">
            <div className="w-6 h-6 rounded-full bg-neutral-700" />
            <span className="text-xs">Profile</span>
          </button>
        </div>
      </nav>
    </div>
  )
}
