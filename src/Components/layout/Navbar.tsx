import { Link } from "react-router-dom"
import { useState, useEffect } from "react"
import { Menu, X } from "lucide-react";
import { Logo } from "../shared/Logo"

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/feed", label: "Feed" },
  { href: "/login", label: "Login" },
  { href: "/signup", label: "Signup" },
];


export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-neutral-950/95 backdrop-blur-md border-b border-neutral-800"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* left side */}
        <div className="flex items-center justify-between h-16">
          <Link to="/">
            <Logo size="md" />
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                to={link.href}
                className="text-neutral-300 hover:text-white transition-colors text-sm font-medium"
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Desktop Buttons */}
          <div className="hidden md:flex items-center gap-3">
            <Link
              to="/login"
              className="px-4 py-2 text-sm font-medium text-neutral-300 hover:text-white hover:bg-neutral-800 rounded-md transition"
            >
              Sign In
            </Link>

            <Link
              to="/signup"
              className="px-4 py-2 text-sm font-medium text-white bg-rose-500  rounded-md transition"
            >
              Get Started
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 text-neutral-300 hover:text-white"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile responsive menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-neutral-950/98 backdrop-blur-md border-t border-neutral-800">
          <div className="px-4 py-6 space-y-4">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                to={link.href}
                className="block text-neutral-300 hover:text-white py-2 text-lg"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {link.label}
              </Link>
            ))}

            <div className="flex flex-col gap-3 pt-4 border-t border-neutral-800">
              <Link
                to="/login"
                className="w-full text-center px-4 py-2 border border-neutral-700 text-neutral-300 hover:text-white hover:bg-neutral-800 rounded-md transition"
              >
                Sign In
              </Link>

              <Link
                to="/signup"
                className="w-full text-center px-4 py-2 bg-primary-500 hover:bg-primary-600 text-white rounded-md transition"
              >
                Get Started
              </Link>
            </div>
          </div>
        </div>
      )}

      {/* Profile Icons */}
      <div className="hidden">
          <img
            src="/man-chef-avatar.jpg"
            alt="profile"
            className="aspect-square w-10 rounded-full object-cover"
          />
      </div> 

    </nav>
  )
}
