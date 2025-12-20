import { ReelCard } from "@/components/ui/reel-card"

const reels = [
  {
    username: "dance_queen",
    thumbnail: "/dance-video-content-creator.jpg",
    likes: "234K",
    comments: "1.2K",
    caption: "New choreo alert! 💃 #dance #viral",
  },
  {
    username: "foodie_chef",
    thumbnail: "/cooking-food-video-chef.jpg",
    likes: "89K",
    comments: "456",
    caption: "5-minute pasta recipe 🍝 #cooking",
  },
  {
    username: "travel_vibes",
    thumbnail: "/mountain-adventure-sunset.png",
    likes: "567K",
    comments: "2.3K",
    caption: "Sunset in Bali 🌅 #travel #paradise",
  },
  {
    username: "fitness_pro",
    thumbnail: "/fitness-workout-gym-motivation.jpg",
    likes: "123K",
    comments: "890",
    caption: "Morning workout routine 💪 #fitness",
  },
  {
    username: "comedy_king",
    thumbnail: "/comedy-funny-video-entertainer.jpg",
    likes: "890K",
    comments: "5.6K",
    caption: "When Monday hits different 😂 #funny",
  },
  {
    username: "art_studio",
    thumbnail: "/art-painting-creative-studio.jpg",
    likes: "45K",
    comments: "234",
    caption: "Painting process ✨ #art #creative",
  },
]

export function PreviewFeedSection() {
  return (
    <section className="py-24 bg-neutral-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4" style={{ fontFamily: "var(--font-display)" }}>
            Trending <span className="text-primary-500">Reels</span>
          </h2>
          <p className="text-neutral-400 text-lg max-w-2xl mx-auto">
            Discover what's hot right now. From dance challenges to cooking hacks, there's always something new to
            explore.
          </p>
        </div>

        {/* Reel Cards Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
          {reels.map((reel, index) => (
            <ReelCard key={index} {...reel} />
          ))}
        </div>

        {/* View More */}
        <div className="text-center mt-12">
          <a
            href="/feed"
            className="inline-flex items-center gap-2 text-primary-500 hover:text-primary-400 font-medium transition-colors"
          >
            View All Reels
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </a>
        </div>
      </div>
    </section>
  )
}
