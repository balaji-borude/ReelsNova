import { Play } from "lucide-react"

interface LogoProps {
  size?: "sm" | "md" | "lg" | "xl"
  variant?: "full" | "icon" | "text"
}

const sizeMap = {
  sm: "text-lg",
  md: "text-xl",
  lg: "text-2xl",
  xl: "text-3xl",
}

const iconSizeMap = {
  sm: "w-5 h-5",
  md: "w-6 h-6",
  lg: "w-7 h-7",
  xl: "w-8 h-8",
}

export function Logo({ size = "md", variant = "full" }: LogoProps) {
  return (
    <div className="flex items-center gap-2">
      {variant !== "text" && (
        <div className="relative">
          <div className="bg-gradient-to-br from-primary-500 to-primary-600 rounded-lg p-1.5">
            <Play className={`${iconSizeMap[size]} text-white fill-white`} />
          </div>
        </div>
      )}
      {variant !== "icon" && (
        <span className={`${sizeMap[size]} font-bold tracking-tight`} style={{ fontFamily: "var(--font-display)" }}>
          <span className="text-white">Reels</span>
          <span className="text-primary-500">Nova</span>
        </span>
      )}
    </div>
  )
}
