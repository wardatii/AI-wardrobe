import { useState } from "react";
import { useNavigate } from "react-router";
import {
  Sparkles,
  Shirt,
  Heart,
  Plus,
  Calendar,
  MoreVertical,
  X,
  Target,
  ArrowRight,
  Clock,
  ChevronRight,
  Trash2,
  Crown, // using Crown for jewelry
  Watch, // using Watch for accessories
  Gem,
} from "lucide-react";
import { useAuth } from "../context/AuthContext";
import { useWardrobe } from "../context/WardrobeContext";
import { AddItemDialog } from "./dialogs/AddItemDialog";

/* ─── Shared Styles for Cream/Light Theme ─── */
const S = {
  page: {
    padding: "32px",
    background: "transparent",
    color: "#2d2623",
    fontFamily: "'Inter', sans-serif",
  },
  card: {
    background: "#ffffff",
    border: "1px solid rgba(45,38,35,0.06)",
    borderRadius: "20px",
    padding: "24px",
    boxShadow: "0 4px 16px rgba(45,38,35,0.03)",
  },
  btnPrimary: {
    background: "linear-gradient(135deg, #c2887a, #dcaa9e)",
    color: "#fff",
    border: "none",
    borderRadius: "12px",
    padding: "10px 20px",
    fontSize: "13px",
    fontWeight: 600,
    cursor: "pointer",
    display: "inline-flex",
    alignItems: "center",
    gap: "8px",
    boxShadow: "0 4px 16px rgba(194,136,122,0.3)",
    transition: "all 0.2s",
  },
  iconBox: (color: string) => ({
    width: "44px", height: "44px",
    borderRadius: "14px",
    background: `${color}15`, // e.g., rgba(c2887a, 0.15) roughly
    display: "flex", alignItems: "center", justifyContent: "center",
    color: color,
  }),
};

export function Dashboard() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const { items, removeItem } = useWardrobe();
  const [showAddDialog, setShowAddDialog] = useState(false);
  const [hoveredCard, setHoveredCard] = useState<string | null>(null);

  // Group items
  const clothingItems = items.filter(i => i.category !== "jewelry" && i.category !== "accessories");
  const jewelryItems = items.filter(i => i.category === "jewelry");
  const accessoriesItems = items.filter(i => i.category === "accessories");
  
  // Show only 4 most recent for the main view
  const recentItems = [...items].reverse().slice(0, 4);

  return (
    <div style={S.page}>
      
      {/* ── Header ── */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: "32px" }}>
        <div>
          <p style={{ fontSize: "14px", color: "#8a7a72", marginBottom: "4px" }}>
            Welcome back, {user?.name?.split(" ")[0] || "Stylist"} ✨
          </p>
          <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: "32px", fontWeight: 700, color: "#2d2623" }}>
            Your Wardrobe Overview
          </h1>
        </div>
        <div style={{ display: "flex", gap: "12px" }}>
          <button 
            onClick={() => setShowAddDialog(true)}
            style={S.btnPrimary}
            onMouseEnter={(e) => (e.currentTarget.style.boxShadow = "0 6px 20px rgba(194,136,122,0.4)")}
            onMouseLeave={(e) => (e.currentTarget.style.boxShadow = "0 4px 16px rgba(194,136,122,0.3)")}
          >
            <Plus style={{ width: "16px", height: "16px" }} /> Add Item
          </button>
        </div>
      </div>

      {/* ── Main Grid ── */}
      <div style={{ display: "grid", gridTemplateColumns: "3fr 1fr", gap: "24px" }}>
        
        {/* Left Column */}
        <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
          
          {/* Quick Stats Row */}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "16px" }}>
            {[
              { label: "Total Items", val: items.length, icon: Shirt, color: "#c2887a" },
              { label: "Jewelry", val: jewelryItems.length, icon: Gem, color: "#d1a56e" },
              { label: "Accessories", val: accessoriesItems.length, icon: Watch, color: "#8aa1b8" },
              { label: "AI Outfits", val: 24, icon: Sparkles, color: "#8ba8a2" },
            ].map(stat => (
              <div key={stat.label} style={{ ...S.card, padding: "20px", display: "flex", alignItems: "center", gap: "16px" }}>
                <div style={{ width: "48px", height: "48px", borderRadius: "14px", background: `${stat.color}15`, display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <stat.icon style={{ width: "24px", height: "24px", color: stat.color }} />
                </div>
                <div>
                  <div style={{ fontSize: "24px", fontWeight: 700, color: stat.color }}>{stat.val}</div>
                  <div style={{ fontSize: "12px", color: "#8a7a72", fontWeight: 500 }}>{stat.label}</div>
                </div>
              </div>
            ))}
          </div>

          {/* Recent Items Section */}
          <div style={S.card}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px" }}>
              <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: "20px", fontWeight: 700 }}>Recently Added</h2>
              <button 
                onClick={() => navigate(user?.preferences?.gender === "men" ? "/men" : "/women")}
                style={{ background: "none", border: "none", color: "#c2887a", fontSize: "13px", fontWeight: 600, display: "flex", alignItems: "center", gap: "4px", cursor: "pointer" }}
              >
                View Wardrobe <ChevronRight style={{ width: "14px", height: "14px" }} />
              </button>
            </div>

            {items.length === 0 ? (
              <div style={{ textAlign: "center", padding: "40px", background: "rgba(194,136,122,0.03)", borderRadius: "16px", border: "1px dashed rgba(194,136,122,0.2)" }}>
                <Shirt style={{ width: "40px", height: "40px", color: "rgba(194,136,122,0.4)", margin: "0 auto 12px" }} />
                <p style={{ color: "#665a54", fontSize: "14px", marginBottom: "16px" }}>Your wardrobe is empty.</p>
                <button onClick={() => setShowAddDialog(true)} style={S.btnPrimary}>+ Add First Item</button>
              </div>
            ) : (
              <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "16px" }}>
                {recentItems.map(item => (
                  <div 
                    key={item.id} 
                    onMouseEnter={() => setHoveredCard(item.id)}
                    onMouseLeave={() => setHoveredCard(null)}
                    style={{ position: "relative", borderRadius: "16px", overflow: "hidden", border: "1px solid rgba(45,38,35,0.06)", background: "#faf8f5", cursor: "pointer", transition: "all 0.3s" }}
                  >
                    <div style={{ aspectRatio: "3/4", overflow: "hidden" }}>
                      <img src={item.imageUrl} alt={item.name} style={{ width: "100%", height: "100%", objectFit: "cover", transition: "transform 0.4s", transform: hoveredCard === item.id ? "scale(1.05)" : "scale(1)" }} />
                      
                      {/* Overlay actions on hover */}
                      <div style={{ position: "absolute", top: 0, left: 0, right: 0, padding: "12px", display: "flex", justifyContent: "flex-end", opacity: hoveredCard === item.id ? 1 : 0, transition: "opacity 0.2s" }}>
                        <button 
                          onClick={(e) => { e.stopPropagation(); removeItem(item.id); }}
                          style={{ width: "32px", height: "32px", borderRadius: "8px", background: "rgba(255,255,255,0.9)", border: "none", color: "#d95d5d", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", boxShadow: "0 4px 12px rgba(0,0,0,0.1)" }}
                        >
                          <Trash2 style={{ width: "14px", height: "14px" }} />
                        </button>
                      </div>
                      
                      {/* Gradient bottom info */}
                      <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, background: "linear-gradient(to top, rgba(0,0,0,0.7) 0%, transparent 100%)", padding: "20px 12px 12px" }}>
                        <p style={{ color: "#fff", fontSize: "14px", fontWeight: 600, textShadow: "0 2px 4px rgba(0,0,0,0.3)", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{item.name}</p>
                        <p style={{ color: "rgba(255,255,255,0.8)", fontSize: "11px", textTransform: "capitalize", marginTop: "2px" }}>{item.category}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Quick Actions / Suggested Actions */}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}>
            <div 
              onClick={() => navigate("/ai-chat")}
              style={{ ...S.card, padding: "24px", cursor: "pointer", background: "linear-gradient(135deg, #c2887a 0%, #aa7265 100%)", border: "none", color: "#fff" }}
            >
              <Sparkles style={{ width: "28px", height: "28px", color: "#fff", marginBottom: "16px" }} />
              <h3 style={{ fontSize: "18px", fontWeight: 700, marginBottom: "6px", fontFamily: "'Playfair Display', serif" }}>Ask AI Stylist</h3>
              <p style={{ fontSize: "13px", color: "rgba(255,255,255,0.8)", marginBottom: "16px" }}>Get instant outfit recommendations for any occasion.</p>
              <div style={{ fontSize: "13px", fontWeight: 600, display: "flex", alignItems: "center", gap: "6px" }}>Start Chat <ArrowRight style={{ width: "14px", height: "14px" }} /></div>
            </div>
            
            <div 
              onClick={() => navigate("/ai-suggestions")}
              style={{ ...S.card, padding: "24px", cursor: "pointer", background: "linear-gradient(135deg, #8ba8a2 0%, #75928d 100%)", border: "none", color: "#fff" }}
            >
              <Heart style={{ width: "28px", height: "28px", color: "#fff", marginBottom: "16px" }} />
              <h3 style={{ fontSize: "18px", fontWeight: 700, marginBottom: "6px", fontFamily: "'Playfair Display', serif" }}>Saved Outfits</h3>
              <p style={{ fontSize: "13px", color: "rgba(255,255,255,0.8)", marginBottom: "16px" }}>Review your favorite AI-generated style combinations.</p>
              <div style={{ fontSize: "13px", fontWeight: 600, display: "flex", alignItems: "center", gap: "6px" }}>View Collection <ArrowRight style={{ width: "14px", height: "14px" }} /></div>
            </div>
          </div>

        </div>

        {/* Right Column */}
        <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
          
          {/* AI Daily Tip */}
          <div style={{ ...S.card, position: "relative", overflow: "hidden", border: "1px solid rgba(194,136,122,0.2)" }}>
            <div style={{ position: "absolute", top: "-20px", right: "-20px", width: "100px", height: "100px", background: "radial-gradient(circle, rgba(194,136,122,0.15) 0%, transparent 70%)" }} />
            
            <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "16px" }}>
              <div style={{ width: "24px", height: "24px", borderRadius: "6px", background: "rgba(194,136,122,0.1)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                <Sparkles style={{ width: "14px", height: "14px", color: "#c2887a" }} />
              </div>
              <span style={{ fontSize: "12px", color: "#c2887a", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.05em" }}>AI Tip of the Day</span>
            </div>
            
            <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: "18px", fontWeight: 700, marginBottom: "12px", lineHeight: 1.3 }}>
              Elevate your neutrals
            </h3>
            <p style={{ fontSize: "13px", color: "#665a54", lineHeight: 1.6, marginBottom: "16px" }}>
              Since you have 6 items in earthy tones, try pairing them with your gold accessories to instantly elevate a casual look.
            </p>
            <button style={{ background: "rgba(194,136,122,0.08)", border: "none", color: "#c2887a", fontSize: "12px", fontWeight: 600, padding: "8px 16px", borderRadius: "8px", cursor: "pointer", width: "100%" }}>
              Generate Outfit
            </button>
          </div>

          {/* Upcoming Events */}
          <div style={{ ...S.card, flex: 1 }}>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "20px" }}>
              <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: "18px", fontWeight: 700 }}>Upcoming Events</h2>
              <button style={{ background: "none", border: "none", color: "#c2887a" }}><Plus style={{ width: "16px", height: "16px" }}/></button>
            </div>
            
            <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
              {[
                { title: "Wedding Reception", date: "This Saturday", color: "#c2887a", planned: true },
                { title: "Business Pitch", date: "Next Tuesday", color: "#8aa1b8", planned: false },
                { title: "Dinner Date", date: "Nov 24", color: "#d1a56e", planned: false },
              ].map(event => (
                <div key={event.title} style={{ display: "flex", alignItems: "flex-start", gap: "12px", padding: "12px", borderRadius: "12px", background: "#fdfbf7", border: "1px solid rgba(45,38,35,0.04)" }}>
                  <div style={{ width: "40px", height: "40px", borderRadius: "10px", background: `${event.color}15`, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                    <Calendar style={{ width: "18px", height: "18px", color: event.color }} />
                  </div>
                  <div style={{ flex: 1 }}>
                    <h4 style={{ fontSize: "14px", fontWeight: 600, marginBottom: "4px" }}>{event.title}</h4>
                    <div style={{ display: "flex", alignItems: "center", gap: "8px", fontSize: "11px" }}>
                      <span style={{ color: "#8a7a72" }}>{event.date}</span>
                      <span style={{ width: "4px", height: "4px", borderRadius: "50%", background: "#d4cec4" }} />
                      <span style={{ color: event.planned ? "#8ba8a2" : "#c2887a", fontWeight: 500 }}>
                        {event.planned ? "Outfit Ready" : "Needs Styling"}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>

      <AddItemDialog open={showAddDialog} onClose={() => setShowAddDialog(false)} />
    </div>
  );
}
