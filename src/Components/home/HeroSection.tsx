import { Link } from "react-router-dom"
import { Play, Sparkles, TrendingUp, Users, Heart, MessageCircle, Share2 } from "lucide-react"

export function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-neutral-950 via-neutral-900 to-neutral-950" />

      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-rose-500/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-sky-500/20 rounded-full blur-3xl animate-pulse delay-1000" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left side */}
          <div className="text-center lg:text-left">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-rose-500/10 border border-rose-500/20 rounded-full mb-6">
              <Sparkles className="w-4 h-4 text-rose-500" />
              <span className="text-rose-400 text-sm font-medium">The Future of Short Videos</span>
            </div>

            <h1
              className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white leading-tight"
              style={{ fontFamily: "var(--font-display)" }}
            >
              Create. Share.
              <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-rose-400 to-rose-600">
                Go Viral.
              </span>
            </h1>

            <p className="mt-6 text-lg text-neutral-300 max-w-xl mx-auto lg:mx-0 leading-relaxed">
              ReelsNova is the ultimate platform for short-form video content. Discover trending reels, connect with
              millions of creators, and share your story with the world.
            </p>

            <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Link
                to="/signup"
                className="inline-flex items-center justify-center bg-rose-500 hover:bg-rose-600 text-white px-8 py-4 text-lg rounded-md transition"
              >
                <Play className="w-5 h-5 mr-2 fill-current" />
                Get Started
              </Link>

              <Link
                to="/feed"
                className="inline-flex items-center justify-center border border-neutral-700 hover:bg-neutral-800 px-8 py-4 text-lg rounded-md transition text-white"
              >
                Explore Reels
              </Link>
            </div>

            {/* Stats */}
            <div className="mt-12 grid grid-cols-3 gap-8 max-w-md mx-auto lg:mx-0">
              {[
                ["10M+", "Active Users"],
                ["50M+", "Reels Created"],
                ["100+", "Countries"],
              ].map(([num, label]) => (
                <div key={label} className="text-center lg:text-left">
                  <div className="text-2xl sm:text-3xl font-bold text-white">{num}</div>
                  <div className="text-neutral-400 text-sm">{label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Right side */}
          <div className="hidden lg:flex justify-center">
            <div className="relative">
              <div className="w-72 h-[580px] bg-neutral-900 rounded-[3rem] p-3 border-4 border-neutral-800 shadow-2xl">
                <div className="w-full h-full bg-neutral-950 rounded-[2.5rem] overflow-hidden relative">
                  <div className="absolute top-0 left-0 right-0 h-8 bg-black/50 backdrop-blur-sm z-10 flex items-center justify-center">
                    <div className="w-20 h-5 bg-black rounded-full" />
                  </div>

                  <img
                    src="/trendy-short-video-content-creator-dancing.jpg"
                    alt="Reel preview"
                    className="w-full h-full object-cover"
                  />

                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/30" />

                  <div className="absolute bottom-6 left-4 right-16">
                    <div className="flex items-center gap-2 mb-2">
                      <div className="w-8 h-8 rounded-full bg-rose-500" />
                      <span className="text-white text-sm font-medium">@creative_star</span>
                    </div>
                    <p className="text-white text-xs">Living my best life ✨ #trending #viral</p>
                  </div>

                  <div className="absolute right-3 bottom-20 flex flex-col gap-5">
                    <div className="flex flex-col items-center">
                      <Heart className="w-7 h-7 text-white" />
                      <span className="text-white text-xs mt-1">234K</span>
                    </div>
                    <div className="flex flex-col items-center">
                      <MessageCircle className="w-7 h-7 text-white" />
                      <span className="text-white text-xs mt-1">1.2K</span>
                    </div>
                    <div className="flex flex-col items-center">
                      <Share2 className="w-6 h-6 text-white" />
                    </div>
                  </div>
                </div>
              </div>

              <div className="absolute -top-4 -right-4 w-16 h-16 bg-rose-500 rounded-2xl flex items-center justify-center shadow-lg shadow-rose-500/30 animate-bounce">
                <TrendingUp className="w-8 h-8 text-white" />
              </div>
              <div className="absolute -bottom-4 -left-4 w-14 h-14 bg-sky-500 rounded-xl flex items-center justify-center shadow-lg shadow-sky-500/30">
                <Users className="w-7 h-7 text-white" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
