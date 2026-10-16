import { Link } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import { Bell, Menu, MessageCircle, X , User,Bookmark, Settings, Activity,LogOut } from "lucide-react";
import { Logo } from "../shared/Logo";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { ConfirmationModal } from "../shared/ConfirmationModal";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/feed", label: "Feed" },
  { href: "/upload", label: "Upload" },
  { href: "/message", icon: <MessageCircle /> },
  { href: "/notifications", icon: <Bell /> },
];

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [showModal, setShowModal] = useState(false);

  // PENDING --> use Redux auth slice bcz --> it is not updationg after the login we have to refresh it (uer State management);

  const [user, setUser] = useState(() => {
    const userData = localStorage.getItem("user");
    return userData ? JSON.parse(userData) : null;
  });

  const navigate = useNavigate();

  const [isLoggedIn, setIsLoggedIn] = useState(() => {
    return Boolean(localStorage.getItem("token"));
  });

  const userData = localStorage.getItem("user");
  const userdata = userData ? JSON.parse(userData) : " ";
  const profileImage = userdata?.profileImage;

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

  /* Scroll effect */
  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // click outside of profile menu to close it
  const profileMenuRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent | TouchEvent) => {
      if (
        profileMenuRef.current &&
        !profileMenuRef.current.contains(event.target as Node)
      ) {
        setShowProfileMenu(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleProfileNavigation = () => {
    setShowProfileMenu(false);
  };

  // logout handler
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setIsLoggedIn(false);
    setUser(null);
    setShowProfileMenu(false);
    toast.success("Logout succesfully");
    navigate("/login");
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
                {link.icon && <span>{link.icon}</span>}{" "}
                {/*  if link has icon then show icon */}
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
              <div ref={profileMenuRef} className="relative">
                <div
                  className="flex items-center gap-1 cursor-pointer"
                  onClick={() => setShowProfileMenu((prev) => !prev)}
                >
                  <img
                    src={profileImage}
                    alt={`${user?.id}`}
                    className="w-10 h-10 rounded-full object-cover"
                  />
                  {/* down arrow */}
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={2}
                    stroke="currentColor"
                    className={`w-5 h-5  transition-transform duration-200 ${showProfileMenu ? "rotate-180" : ""}`}
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                  </svg>
                </div>

                {/* Profile Menu */}
                {showProfileMenu && (
                  <div className="absolute right-0 mt-2 w-40 bg-neutral-900 border border-neutral-800 rounded-md shadow-lg">
                    {/* show the user's profile information like name and userName */}

                      <div className="px-4 py-2 border-b border-neutral-800">
                        <p className="text-sm text-neutral-300 font-medium">
                          {user?.fullName || "John Doe"}
                        </p>
                        <p className="text-xs text-neutral-500">
                          @{user?.username}
                        </p>
                    </div>



                    <Link
                      to="/profile"
                      onClick={handleProfileNavigation}
                      className=" px-4 py-2 text-sm text-neutral-300 hover:bg-neutral-800 flex gap-2"
                    >
                     <User size={16} strokeWidth={1.5} absoluteStrokeWidth /> <span> Profile</span>
                     
                    </Link>

                    <Link
                      to="/settings"
                      onClick={handleProfileNavigation}
                      className="flex  gap-2 px-4 py-2 text-sm text-neutral-300 hover:bg-neutral-800"
                    >
                     <Settings size={16} strokeWidth={1.5} absoluteStrokeWidth /> <span> Settings</span>
                    </Link>

                    <Link
                      to="/activity"
                      onClick={handleProfileNavigation}
                      className="flex  gap-2 px-4 py-2 text-sm text-neutral-300 hover:bg-neutral-800"
                    >
                      <Activity size={16} strokeWidth={1.5} absoluteStrokeWidth /> <span> Activity</span>
                    </Link>

                    <Link
                      to="/saved"
                      onClick={handleProfileNavigation}
                      className="flex  gap-2 px-4 py-2 text-sm text-neutral-300 hover:bg-neutral-800"
                    >
                     <Bookmark size={16} strokeWidth={1.5} absoluteStrokeWidth /> <span> Saved</span>
                    </Link>

                    <button
                      onClick={
                        setShowModal.bind(null, true) // Open the modal when logout is clicked
                      }
                      className="flex  gap-2 w-full text-left px-4 py-2 text-sm text-red-400 hover:cursor-pointer hover:bg-neutral-800"
                    >
                      <LogOut size={16} strokeWidth={1.5} absoluteStrokeWidth /> <span>Logout</span>
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
                {link.icon && <span>{link.icon}</span>}{" "}
                {/*  if link has icon then show icon */}
              </Link>
            ))}

            {!isLoggedIn ? (
              <div className="flex flex-col gap-3 pt-4 border-t border-neutral-800">
                <Link to="/login">Sign In</Link>
                <Link to="/signup">Get Started</Link>
              </div>
            ) : (
              <div className="pt-4 border-t border-neutral-800 space-x-3">
                <Link to="/dashboard" className="text-white">
                  Dashboard
                </Link>
                <button
                  onClick={() => {
                    setIsMobileMenuOpen(false);
                    setShowModal(true);
                  }}
                  className="text-red-400"
                >
                  Logout
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Open Modal for the Logout confirmation */}
      {showModal && (
        <ConfirmationModal
          title="Logout"
          message="Are you sure you want to logout ?"
          confirmText="Logout"
          cancelText="Cancel"
          onConfirm={() => {
            setShowModal(false);
            handleLogout();
          }}
          onCancel={() => setShowModal(false)}
        />
      )}


    </nav>
  );
}
