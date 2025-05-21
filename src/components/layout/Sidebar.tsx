import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Home, Music, Settings, User, Users, Disc } from "lucide-react";
import { getUserPlaylists, Playlist } from "@/lib/api";
import logo from "../../images/logo1.png";
const Sidebar = () => {
  const siteName = import.meta.env.VITE_SITE_NAME;
  const location = useLocation();
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const [playlists, setPlaylists] = useState<Playlist[]>([]);
  const [user, setUser] = useState<{ name: string } | null>(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    setUser(storedUser ? JSON.parse(storedUser) : null);

    const fetchPlaylists = async () => {
      try {
        const playlistsData = await getUserPlaylists();
        setPlaylists(playlistsData);
      } catch (error) {
        console.error("Error fetching playlists:", error);
      }
    };

    fetchPlaylists();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
  };

  const navItems = [
    { icon: Home, label: "Home", path: "/" },
    { icon: Music, label: "Playlists", path: "/playlists" },
    ...(user
      ? [
        { icon: Settings, label: "Settings", path: "/account" },
        { icon: User, label: "Logout", action: "logout" },
      ]
      : []),
  ];

  return (
    <>
      {/* Mobile Menu Button */}
      <button
        className="fixed top-2 left-4 z-30 bg-music-accent p-2 rounded-md text-white md:hidden"
        onClick={() => setIsOpen(!isOpen)}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="h-8 w-8 text-white"
        >
          <circle cx="12" cy="12" r="10"></circle>
          <circle cx="12" cy="12" r="2"></circle>
        </svg>
      </button>

      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 h-screen w-64  p-4 z-20 transition-transform glass duration-300 ${isOpen ? "translate-x-0" : "-translate-x-full"} md:translate-x-0`}
      >
        <div className="flex items-center mb-8 pl-2">
          {/* <Disc className="h-8 w-8 text-music-accent mr-2" />
          <h1 className="text-xl font-semibold text-white">{siteName}</h1> */}
          <a href=""><img src={logo} alt="Logo"  /></a>
        </div>


        <nav className="space-y-1 mb-8">
          {navItems.map((item) => (
            <div
              key={item.label}
              className={`flex items-center px-4 py-3 rounded-lg text-sm font-medium cursor-pointer ${location.pathname === item.path ? "bg-music-accent text-white" : "text-gray-400 hover:text-white hover:bg-gray-700"}`}
              onClick={() => {
                if (item.action === "logout") {
                  handleLogout();
                } else {
                  navigate(item.path);
                  setIsOpen(false);
                }
              }}
            >
              <item.icon className="h-5 w-5 mr-3" />
              {item.label}
            </div>
          ))}
        </nav>
        <div className="flex flex-col h-full">
        <div className="flex-1">{/* Other sidebar items */}</div>

        {/* Username Section (Moved Below Sidebar) */}
        {user && (
          <div className="absolute bottom-4 left-0 w-full px-4">
            <div className="flex items-center justify-between p-3 glass rounded-lg border border-white/5">
              <div className="flex items-center">
                <div className="h-8 w-8 rounded-full bg-music-accent flex items-center justify-center">
                  <Users className="h-4 w-4 text-white" />
                </div>
                <span className="ml-2 text-sm font-medium">
                  {user.name.charAt(0).toUpperCase() + user.name.slice(1)}
                </span>
              </div>
            </div>
          </div>
        )}
      </div>
      </aside>
    </>
  );
};

export default Sidebar;