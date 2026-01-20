import { Zap, Shield, Globe, Heart } from "lucide-react"

const features = [
  {
    icon: Zap,
    title: "Lightning Fast",
    description: "Upload and share your reels in seconds with our optimized platform.",
  },
  {
    icon: Shield,
    title: "Safe & Secure",
    description: "Your content and data are protected with enterprise-grade security.",
  },
  {
    icon: Globe,
    title: "Global Reach",
    description: "Connect with creators and audiences from around the world.",
  },
  {
    icon: Heart,
    title: "Creator First",
    description: "Tools and features designed to help creators grow and succeed.",
  },
]



export function AboutSection() {
  return (
    <section className="py-24 bg-neutral-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left side - Content */}
          <div>
            <span className="text-rose-500 font-medium text-sm uppercase tracking-wider">
              About ReelsNova
            </span>

            <h2
              className="text-3xl sm:text-4xl font-bold text-white mt-4 mb-6"
              style={{ fontFamily: "var(--font-display)" }}
            >
              Empowering Creators to
              <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-rose-400 to-sky-400">
                Share Their Vision
              </span>
            </h2>

            <p className="text-neutral-300 text-lg leading-relaxed mb-8">
              ReelsNova is more than just a platform—it's a community where creativity thrives. We believe everyone has
              a story worth sharing, and we're here to help you tell it through engaging short-form video content.
            </p>

            <p className="text-neutral-400 leading-relaxed">
              Founded with a mission to democratize content creation, ReelsNova provides powerful tools that make it
              easy for anyone to create, edit, and share professional-quality videos. Join millions of creators who are
              already building their audience on ReelsNova.
            </p>
          </div>

          {/* Right side - Feature cards */}
          <div className="grid sm:grid-cols-2 gap-6">
            {features.map((feature, index) => (
              <div
                key={index}
                className="bg-neutral-800/50 border border-neutral-700 rounded-2xl p-6 hover:border-rose-500/50 transition-colors"
              >
                <div className="w-12 h-12 bg-rose-500/10 rounded-xl flex items-center justify-center mb-4">
                  <feature.icon className="w-6 h-6 text-rose-500" />
                </div>
                <h3 className="text-white font-semibold text-lg mb-2">{feature.title}</h3>
                <p className="text-neutral-400 text-sm leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

