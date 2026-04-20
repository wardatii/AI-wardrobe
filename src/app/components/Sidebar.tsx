import { NavLink } from "react-router";
import { useAuth } from "../context/AuthContext";
import {
  LayoutDashboard,
  Shirt,
  MessageSquare,
  LogOut,
  User,
  Heart,
  Sparkles,
} from "lucide-react";

export function Sidebar() {
  const { logout, user } = useAuth();

  const isMen = user?.preferences?.gender === "men";
  const wardrobePath = isMen ? "/app/men" : "/app/women";

  const navigation = [
    { name: "Dashboard", href: "/app", icon: LayoutDashboard },
    { name: "Women's Wardrobe", href: "/app/women", icon: Shirt },
    { name: "Men's Wardrobe", href: "/app/men", icon: Shirt },
    { name: "AI Stylist", href: "/app/ai-chat", icon: MessageSquare },
    { name: "Saved Outfits", href: "/app/ai-suggestions", icon: Heart },
    { name: "Profile", href: "/app/profile", icon: User },
  ];

  return (
    <div 
      style={{
        width: "260px",
        height: "100vh",
        background: "#ffffff",
        borderRight: "1px solid rgba(45,38,35,0.06)",
        display: "flex",
        flexDirection: "column",
        fontFamily: "'Inter', sans-serif"
      }}
    >
      {/* ── Brand / Logo ── */}
      <div style={{ padding: "32px 24px", display: "flex", alignItems: "center", gap: "10px" }}>
        <div style={{ 
          width: "36px", height: "36px", borderRadius: "10px", 
          background: "linear-gradient(135deg, #c2887a, #dcaa9e)", 
          display: "flex", alignItems: "center", justifyContent: "center",
          boxShadow: "0 4px 12px rgba(194,136,122,0.3)"
        }}>
          <Sparkles style={{ width: "18px", height: "18px", color: "#fff" }} />
        </div>
        <span style={{ 
          fontSize: "20px", fontWeight: 700, 
          fontFamily: "'Playfair Display', serif", color: "#2d2623" 
        }}>
          AI Dresser
        </span>
      </div>

      {/* ── Navigation Links ── */}
      <nav style={{ flex: 1, padding: "0 16px", display: "flex", flexDirection: "column", gap: "6px" }}>
        {navigation.map((item) => (
          <NavLink
            key={item.name}
            to={item.href}
            className={({ isActive }) => `group flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${isActive ? 'active-nav' : ''}`}
            style={({ isActive }) => ({
              color: isActive ? "#c2887a" : "#665a54",
              background: isActive ? "rgba(194,136,122,0.08)" : "transparent",
              fontWeight: isActive ? 600 : 500,
              textDecoration: "none",
              fontSize: "14px",
            })}
          >
            {({ isActive }) => (
              <>
                <item.icon 
                  style={{ 
                    width: "20px", height: "20px",
                    color: isActive ? "#c2887a" : "#a1938a",
                    transition: "all 0.2s"
                  }} 
                  className={isActive ? "" : "group-hover:text-[#c2887a]"}
                />
                <span className={isActive ? "" : "group-hover:text-[#2d2623]"}>{item.name}</span>
                
                {/* Active Indicator Line */}
                {isActive && (
                  <div style={{ marginLeft: "auto", width: "4px", height: "16px", borderRadius: "2px", background: "#c2887a" }} />
                )}
              </>
            )}
          </NavLink>
        ))}
      </nav>

      {/* ── User Profile & Logout ── */}
      <div style={{ padding: "24px 16px", borderTop: "1px solid rgba(45,38,35,0.04)" }}>
        
        {/* User Badge */}
        <div style={{ 
          display: "flex", alignItems: "center", gap: "12px", 
          padding: "12px", background: "#fdfbf7", borderRadius: "12px",
          marginBottom: "16px"
        }}>
          <div style={{ 
            width: "36px", height: "36px", borderRadius: "10px", 
            background: "rgba(194,136,122,0.15)",
            border: "1px solid rgba(194,136,122,0.2)",
            display: "flex", alignItems: "center", justifyContent: "center",
            color: "#c2887a", fontWeight: 600, fontSize: "14px"
          }}>
            {user?.name?.charAt(0) || "U"}
          </div>
          <div style={{ overflow: "hidden" }}>
            <p style={{ fontSize: "13px", fontWeight: 600, color: "#2d2623", whiteSpace: "nowrap", textOverflow: "ellipsis" }}>
              {user?.name || "User"}
            </p>
            <p style={{ fontSize: "11px", color: "#8a7a72", textTransform: "capitalize" }}>
              {user?.preferences?.gender || "Stylist"} Account
            </p>
          </div>
        </div>

        {/* Logout Button */}
        <button
          onClick={logout}
          style={{
            width: "100%", padding: "12px",
            display: "flex", alignItems: "center", justifyContent: "center", gap: "8px",
            background: "rgba(217,93,93,0.05)", border: "1px solid rgba(217,93,93,0.1)",
            color: "#d95d5d", borderRadius: "12px", fontSize: "13px", fontWeight: 600,
            cursor: "pointer", transition: "all 0.2s"
          }}
          onMouseEnter={(e) => {
            (e.currentTarget as HTMLElement).style.background = "rgba(217,93,93,0.1)";
          }}
          onMouseLeave={(e) => {
            (e.currentTarget as HTMLElement).style.background = "rgba(217,93,93,0.05)";
          }}
        >
          <LogOut style={{ width: "16px", height: "16px" }} />
          Sign Out
        </button>
      </div>
    </div>
  );
}
