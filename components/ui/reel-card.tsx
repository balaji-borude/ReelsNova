import { Heart, MessageCircle, Share2, Bookmark } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

interface ReelCardProps {
  username: string
  avatar?: string
  thumbnail: string
  likes: string
  comments: string
  caption?: string
}

export function ReelCard({ username, avatar, thumbnail, likes, comments, caption }: ReelCardProps) {
  return (
    <div className="relative bg-neutral-900 rounded-xl overflow-hidden group cursor-pointer">
      <div className="aspect-[9/16] relative">
        <img src={thumbnail || "/placeholder.svg"} alt={`Reel by ${username}`} className="w-full h-full object-cover" />
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />

        {/* Play button overlay on hover */}
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
          <div className="w-16 h-16 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center">
            <div className="w-0 h-0 border-l-[20px] border-l-white border-y-[12px] border-y-transparent ml-1" />
          </div>
        </div>

        {/* User info */}
        <div className="absolute bottom-0 left-0 right-0 p-4">
          <div className="flex items-center gap-3 mb-2">
            <Avatar className="w-8 h-8 border-2 border-primary-500">
              <AvatarImage src={avatar || "/placeholder.svg"} alt={username} />
              <AvatarFallback className="bg-primary-500 text-white text-xs">
                {username.slice(0, 2).toUpperCase()}
              </AvatarFallback>
            </Avatar>
            <span className="text-white font-medium text-sm">@{username}</span>
          </div>
          {caption && <p className="text-neutral-200 text-xs line-clamp-2">{caption}</p>}
        </div>

        {/* Actions */}
        <div className="absolute right-3 bottom-20 flex flex-col gap-4">
          <button className="flex flex-col items-center gap-1 text-white hover:text-primary-500 transition-colors">
            <Heart className="w-6 h-6" />
            <span className="text-xs">{likes}</span>
          </button>
          <button className="flex flex-col items-center gap-1 text-white hover:text-secondary-500 transition-colors">
            <MessageCircle className="w-6 h-6" />
            <span className="text-xs">{comments}</span>
          </button>
          <button className="flex flex-col items-center gap-1 text-white hover:text-white/80 transition-colors">
            <Share2 className="w-5 h-5" />
          </button>
          <button className="flex flex-col items-center gap-1 text-white hover:text-white/80 transition-colors">
            <Bookmark className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  )
}
