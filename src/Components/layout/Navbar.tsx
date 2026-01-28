import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { Menu, X, ChevronDown } from "lucide-react";
import { Logo } from "../shared/Logo";
import toast from "react-hot-toast";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/feed", label: "Feed" },
  { href: "/upload", label: "Upload" },
];

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);

  // PENDING --> use Redux auth slice bcz --> it is not updationg after the login we have to refresh it (uer State management);
  
 const [user, setUser] = useState(() => {
  const userData = localStorage.getItem("user");
  return userData ? JSON.parse(userData) : null;
});

const [isLoggedIn, setIsLoggedIn] = useState(() => {
  return Boolean(localStorage.getItem("token"));
});

  /* Sync auth state once on mount */
  // useEffect(() => {
  //   const token = localStorage.getItem("token");
  //   const userData = localStorage.getItem("user");

  //   if (token && userData) {
  //     setIsLoggedIn(true);
  //     setUser(JSON.parse(userData));
  //   } else {
  //     setIsLoggedIn(false);
  //     setUser(null);
  //   }
  // }, []);

  /* ✅ Scroll effect */
  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // logout handler 
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setIsLoggedIn(false);
    setUser(null);
    setShowProfileMenu(false);
    toast.success("Logout succesfully")
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-neutral-950/95 backdrop-blur-md border-b border-neutral-800"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">

          {/* Logo */}
          <Link to="/">
            <Logo size="md" />
          </Link>

          {/* Desktop Links */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                to={link.href}
                className="text-neutral-300 hover:text-white text-sm font-medium"
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Desktop Auth */}
          <div className="hidden md:flex items-center gap-3 relative">
            {!isLoggedIn ? (
              <>
                <Link
                  to="/login"
                  className="px-4 py-2 text-sm text-neutral-300 hover:text-white hover:bg-neutral-800 rounded-md"
                >
                  Sign In
                </Link>
                <Link
                  to="/signup"
                  className="px-4 py-2 text-sm text-white bg-rose-500 rounded-md"
                >
                  Get Started
                </Link>
              </>
            ) : (
              <div className="relative">
                <div
                  className="flex items-center gap-1 cursor-pointer"
                  onClick={() => setShowProfileMenu((p) => !p)}
                >
                  <img
                    src="/man-chef-avatar.jpg"
                    alt={`${user?.id}`}
                    className="w-10 h-10 rounded-full object-cover"
                  />
                  <ChevronDown className="text-white" />
                </div>

                {showProfileMenu && (
                  <div className="absolute right-0 mt-2 w-40 bg-neutral-900 border border-neutral-800 rounded-md shadow-lg">
                    <Link
                      to="/dashboard"
                      className="block px-4 py-2 text-sm text-neutral-300 hover:bg-neutral-800"
                    >
                      Dashboard
                    </Link>
                    <button
                      onClick={handleLogout}
                      className="w-full text-left px-4 py-2 text-sm text-red-400 hover:bg-neutral-800"
                    >
                      Logout
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Mobile Menu Toggle */}
          <button
            className="md:hidden p-2 text-neutral-300"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X /> : <Menu />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-neutral-950 border-t border-neutral-800">
          <div className="px-4 py-6 space-y-4">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                to={link.href}
                className="block text-neutral-300 text-lg"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {link.label}
              </Link>
            ))}

            {!isLoggedIn ? (
              <div className="flex flex-col gap-3 pt-4 border-t border-neutral-800">
                <Link to="/login">Sign In</Link>
                <Link to="/signup">Get Started</Link>
              </div>
            ) : (
              <div className="pt-4 border-t border-neutral-800 space-x-3">
                <Link to="/dashboard" className="text-white">Dashboard</Link>
                <button onClick={handleLogout} className="text-red-400">
                  Logout
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}
