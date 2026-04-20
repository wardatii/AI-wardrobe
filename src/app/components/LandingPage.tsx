import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import { useAuth } from "../context/AuthContext";
import {
  Sparkles,
  ChevronRight,
  Upload,
  Brain,
  Shirt,
  MessageSquare,
  Calendar,
  Briefcase,
  Heart,
  PartyPopper,
  Coffee,
  Award,
  Mail,
  Lock,
  User,
  X,
  ArrowRight,
  Star,
  Crown,
  Zap,
} from "lucide-react";

/* ─── Sub-components defined OUTSIDE LandingPage to prevent remount on re-render ─── */
const PhotoCard = ({ img, title, tag, tall = true }: { img: string; title: string; tag: string; tall?: boolean }) => (
  <div
    className="group relative overflow-hidden cursor-pointer"
    style={{ borderRadius: "20px", border: "1px solid rgba(45,38,35,0.06)", background: "#fff" }}
  >
    <div style={{ aspectRatio: tall ? "3/4" : "1/1", overflow: "hidden" }}>
      <img
        src={img}
        alt={title}
        style={{ width: "100%", height: "100%", objectFit: "cover", transition: "transform 0.5s" }}
        className="group-hover:scale-110"
      />
    </div>
    <div
      style={{
        position: "absolute", inset: 0,
        background: "linear-gradient(to top, rgba(253,251,247,0.95) 0%, rgba(253,251,247,0.4) 40%, transparent 100%)",
        display: "flex", flexDirection: "column", justifyContent: "flex-end",
        padding: "20px",
      }}
    >
      <span style={{ fontSize: "11px", color: "#c2887a", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: "4px" }}>
        {tag}
      </span>
      <span style={{ fontSize: "16px", fontWeight: 600, color: "#2d2623" }}>{title}</span>
    </div>
  </div>
);

const InputField = ({
  type, value, onChange, placeholder, icon: Icon, label,
}: {
  type: string; value: string; onChange: (v: string) => void;
  placeholder: string; icon: any; label: string;
}) => (
  <div style={{ marginBottom: "18px" }}>
    <label style={{ display: "block", fontSize: "13px", fontWeight: 500, color: "#665a54", marginBottom: "8px" }}>
      {label}
    </label>
    <div style={{ position: "relative" }}>
      <Icon style={{ position: "absolute", left: "14px", top: "50%", transform: "translateY(-50%)", width: "16px", height: "16px", color: "#a1938a" }} />
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        required
        style={{
          width: "100%",
          paddingLeft: "42px",
          paddingRight: "16px",
          paddingTop: "13px",
          paddingBottom: "13px",
          background: "#f9f8f5",
          border: "1px solid rgba(45,38,35,0.1)",
          borderRadius: "12px",
          color: "#2d2623",
          fontSize: "14px",
          outline: "none",
          boxSizing: "border-box" as const,
        }}
        onFocus={(e) => e.target.style.borderColor = "#c2887a"}
        onBlur={(e) => e.target.style.borderColor = "rgba(45,38,35,0.1)"}
      />
    </div>
  </div>
);

/* ─── Inline styles as JS objects for consistency ─── */
const S = {
  page: {
    minHeight: "100vh",
    background: "#fdfbf7",
    color: "#2d2623",
    fontFamily: "'Inter', sans-serif",
    overflowX: "hidden" as const,
  },
  // Gradient text
  gradText: {
    background: "linear-gradient(135deg, #c2887a, #996e62)",
    WebkitBackgroundClip: "text" as const,
    WebkitTextFillColor: "transparent" as const,
    backgroundClip: "text" as const,
  },
  // Primary CTA button
  btnPrimary: {
    background: "linear-gradient(135deg, #c2887a, #dcaa9e)",
    color: "#fff",
    border: "none",
    borderRadius: "14px",
    padding: "14px 32px",
    fontSize: "15px",
    fontWeight: 600,
    cursor: "pointer",
    boxShadow: "0 4px 16px rgba(194,136,122,0.3)",
    display: "inline-flex",
    alignItems: "center",
    gap: "8px",
    transition: "all 0.25s",
  },
  // Ghost button
  btnGhost: {
    background: "rgba(194,136,122,0.05)",
    color: "#c2887a",
    border: "1px solid rgba(194,136,122,0.2)",
    borderRadius: "14px",
    padding: "13px 28px",
    fontSize: "15px",
    fontWeight: 500,
    cursor: "pointer",
    display: "inline-flex",
    alignItems: "center",
    gap: "8px",
    transition: "all 0.25s",
    backdropFilter: "blur(8px)",
  },
  card: {
    background: "#ffffff",
    border: "1px solid rgba(45,38,35,0.06)",
    borderRadius: "20px",
    padding: "32px",
    boxShadow: "0 4px 16px rgba(45,38,35,0.03)",
    transition: "all 0.3s",
  },
};

export function LandingPage() {
  const [showModal, setShowModal] = useState(false);
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [scrolled, setScrolled] = useState(false);
  const navigate = useNavigate();
  const { login, register } = useAuth();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    await login(email, password);
    navigate("/app");
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    await register(name, email, password);
    navigate("/survey");
  };

  const openSignup = () => { setIsLogin(false); setShowModal(true); };
  const openLogin = () => { setIsLogin(true); setShowModal(true); };

  /* ─── Data ─── */
  const features = [
    {
      icon: Brain,
      title: "AI-Powered Styling",
      desc: "Advanced algorithms analyze color theory, style compatibility, and fashion trends.",
      gradient: "linear-gradient(135deg, #c2887a, #dcaa9e)",
      glow: "rgba(194,136,122,0.2)",
    },
    {
      icon: Shirt,
      title: "Digital Wardrobe",
      desc: "Organise your closet digitally — by type, color, season, and occasion.",
      gradient: "linear-gradient(135deg, #8ba8a2, #a8c7c0)",
      glow: "rgba(139,168,162,0.2)",
    },
    {
      icon: MessageSquare,
      title: "AI Chat Stylist",
      desc: "Describe your event, get instant outfit suggestions and styling tips tailored to you.",
      gradient: "linear-gradient(135deg, #d1a56e, #e8c697)",
      glow: "rgba(209,165,110,0.2)",
    },
  ];

  const steps = [
    { step: 1, icon: User,    title: "Create Account",  desc: "Sign up and fill your style profile." },
    { step: 2, icon: Upload,  title: "Upload Wardrobe", desc: "Add clothes, shoes, and accessories." },
    { step: 3, icon: Brain,   title: "AI Analysis",     desc: "Our AI learns your style and analyzes your items." },
    { step: 4, icon: Sparkles,title: "Get Suggestions", desc: "Receive personalized recommendations." },
  ];

  const categories = [
    { icon: Briefcase,   label: "Professional",  color: "#8aa1b8" },
    { icon: PartyPopper, label: "Party & Events", color: "#c2887a" },
    { icon: Coffee,      label: "Casual",         color: "#d1a56e" },
    { icon: Heart,       label: "Date Night",     color: "#bf9199" },
    { icon: Calendar,    label: "Seasonal",       color: "#8ba8a2" },
    { icon: Award,       label: "Formal Events",  color: "#a9a1ba" },
  ];

  const womenStyles = [
    { title: "Evening Elegance", tag: "Formal", img: "https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?w=400&h=600&fit=crop" },
    { title: "Business Chic",   tag: "Professional", img: "https://images.unsplash.com/photo-1591369822096-ffd140ec948f?w=400&h=600&fit=crop" },
    { title: "Weekend Vibes",   tag: "Casual", img: "https://images.unsplash.com/photo-1509631179647-0177331693ae?w=400&h=600&fit=crop" },
  ];

  const womenAcc = [
    { title: "Gold Necklace",     cat: "Jewelry",    img: "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=400&h=400&fit=crop" },
    { title: "Designer Handbag",  cat: "Accessories",img: "https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=400&h=400&fit=crop" },
    { title: "Diamond Earrings",  cat: "Jewelry",    img: "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=400&h=400&fit=crop" },
    { title: "Elegant Sunglasses",cat: "Accessories",img: "https://images.unsplash.com/photo-1511499767150-a48a237f0083?w=400&h=400&fit=crop" },
  ];

  const menStyles = [
    { title: "Sharp Professional", tag: "Professional", img: "https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=400&h=600&fit=crop" },
    { title: "Smart Casual",       tag: "Casual",       img: "https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?w=400&h=600&fit=crop" },
    { title: "Formal Attire",      tag: "Formal Events",img: "https://images.unsplash.com/photo-1617137968427-85924c800a22?w=400&h=600&fit=crop" },
  ];

  const menAcc = [
    { title: "Luxury Watch",   cat: "Accessories", img: "https://images.unsplash.com/photo-1524592094714-0f0654e20314?w=400&h=400&fit=crop" },
    { title: "Leather Wallet", cat: "Accessories", img: "https://images.unsplash.com/photo-1627123424574-724758594e93?w=400&h=400&fit=crop" },
    { title: "Silver Chain",   cat: "Accessories", img: "https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=400&h=400&fit=crop" },
    { title: "Designer Belt",  cat: "Accessories", img: "https://images.unsplash.com/photo-1624222247344-550fb60583c2?w=400&h=400&fit=crop" },
  ];

  return (
    <div style={S.page}>
      {/* ── Navbar ── */}
      <nav
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          zIndex: 100,
          padding: "16px 40px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          transition: "all 0.3s",
          background: scrolled ? "rgba(253,251,247,0.92)" : "transparent",
          backdropFilter: scrolled ? "blur(20px)" : "none",
          borderBottom: scrolled ? "1px solid rgba(45,38,35,0.06)" : "none",
        }}
      >
        {/* Logo */}
        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          <div
            style={{
              width: "38px", height: "38px", borderRadius: "12px",
              background: "linear-gradient(135deg, #c2887a, #dcaa9e)",
              display: "flex", alignItems: "center", justifyContent: "center",
              boxShadow: "0 4px 12px rgba(194,136,122,0.3)",
            }}
          >
            <Sparkles style={{ width: "18px", height: "18px", color: "#fff" }} />
          </div>
          <span style={{ fontSize: "18px", fontWeight: 700, fontFamily: "'Playfair Display', serif", color: "#2d2623" }}>
            AI Dresser
          </span>
        </div>

        {/* Nav links */}
        <div style={{ display: "flex", alignItems: "center", gap: "32px" }}>
          {["Features", "How It Works", "Styles"].map((link) => (
            <a
              key={link}
              href={`#${link.toLowerCase().replace(/ /g, "-")}`}
              style={{ color: "#665a54", fontSize: "14px", textDecoration: "none", transition: "color 0.2s", fontWeight: 500 }}
              onMouseEnter={(e) => ((e.target as HTMLElement).style.color = "#c2887a")}
              onMouseLeave={(e) => ((e.target as HTMLElement).style.color = "#665a54")}
            >
              {link}
            </a>
          ))}
        </div>

        {/* Buttons */}
        <div style={{ display: "flex", gap: "10px" }}>
          <button
            onClick={openLogin}
            style={S.btnGhost}
            onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.background = "rgba(194,136,122,0.08)"; }}
            onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.background = "rgba(194,136,122,0.05)"; }}
          >
            Login
          </button>
          <button
            onClick={openSignup}
            style={S.btnPrimary}
            onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.boxShadow = "0 6px 20px rgba(194,136,122,0.4)")}
            onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.boxShadow = "0 4px 16px rgba(194,136,122,0.3)")}
          >
            Get Started <ChevronRight style={{ width: "16px", height: "16px" }} />
          </button>
        </div>
      </nav>

      {/* ── Hero ── */}
      <section
        style={{
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          position: "relative",
          overflow: "hidden",
          paddingTop: "100px",
        }}
      >
        {/* Background */}
        <div style={{ position: "absolute", inset: 0, background: "#fdfbf7" }}>
          {/* Subtle noise/texture effect optional */}
          <div style={{ position: "absolute", top: "0", right: "0", width: "800px", height: "800px", borderRadius: "50%", background: "radial-gradient(circle, rgba(194,136,122,0.06) 0%, transparent 70%)", pointerEvents: "none" }} />
          <div style={{ position: "absolute", bottom: "0", left: "0", width: "600px", height: "600px", borderRadius: "50%", background: "radial-gradient(circle, rgba(139,168,162,0.06) 0%, transparent 70%)", pointerEvents: "none" }} />
        </div>

        <div style={{ position: "relative", zIndex: 10, maxWidth: "1280px", margin: "0 auto", padding: "0 40px", display: "grid", gridTemplateColumns: "1fr 1fr", gap: "60px", alignItems: "center" }}>
          {/* Left text */}
          <div>
            {/* Badge */}
            <div
              style={{
                display: "inline-flex", alignItems: "center", gap: "8px",
                padding: "8px 18px",
                background: "rgba(194,136,122,0.08)",
                border: "1px solid rgba(194,136,122,0.15)",
                borderRadius: "999px",
                marginBottom: "28px",
              }}
            >
              <Sparkles style={{ width: "14px", height: "14px", color: "#c2887a" }} />
              <span style={{ fontSize: "13px", color: "#c2887a", fontWeight: 600 }}>AI-Powered Fashion Assistant</span>
            </div>

            <h1
              style={{
                fontFamily: "'Playfair Display', serif",
                fontSize: "clamp(36px, 5vw, 64px)",
                fontWeight: 700,
                lineHeight: 1.15,
                marginBottom: "24px",
                color: "#2d2623",
              }}
            >
              Style Smarter
              <br />
              with{" "}
              <span style={S.gradText}>
                Artificial Intelligence
              </span>
            </h1>

            <p style={{ fontSize: "17px", lineHeight: 1.75, color: "#665a54", marginBottom: "40px", maxWidth: "480px" }}>
              Transform your wardrobe into endless possibilities. Get personalised outfit
              recommendations for every occasion, powered by advanced AI technology.
            </p>

            <div style={{ display: "flex", gap: "14px", flexWrap: "wrap" }}>
              <button
                onClick={openSignup}
                style={S.btnPrimary}
                onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.boxShadow = "0 6px 20px rgba(194,136,122,0.4)")}
                onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.boxShadow = "0 4px 16px rgba(194,136,122,0.3)")}
              >
                Start Your Style Journey <ArrowRight style={{ width: "16px", height: "16px" }} />
              </button>
              <button
                onClick={openLogin}
                style={{ ...S.btnGhost, background: "#ffffff" }}
                onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.background = "rgba(194,136,122,0.05)"; }}
                onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.background = "#ffffff"; }}
              >
                Sign In
              </button>
            </div>

            {/* Stats row */}
            <div style={{ display: "flex", gap: "36px", marginTop: "52px" }}>
              {[{ n: "10K+", l: "Users" }, { n: "50K+", l: "Outfits" }, { n: "98%", l: "Satisfaction" }].map(({ n, l }) => (
                <div key={l}>
                  <div style={{ fontSize: "26px", fontWeight: 700, ...S.gradText }}>{n}</div>
                  <div style={{ fontSize: "13px", color: "#8a7a72", marginTop: "2px", fontWeight: 500 }}>{l}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Right: floating image cards */}
          <div style={{ position: "relative", height: "520px", display: "flex", alignItems: "center", justifyContent: "center" }}>
            {/* Main big card */}
            <div
              style={{
                position: "absolute",
                left: "0", top: "20px",
                width: "230px", height: "310px",
                borderRadius: "20px",
                overflow: "hidden",
                border: "4px solid #ffffff",
                boxShadow: "0 12px 32px rgba(45,38,35,0.08)",
              }}
            >
              <img src="https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?w=400&h=600&fit=crop" alt="Evening" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
            </div>
            {/* Middle card */}
            <div
              style={{
                position: "absolute",
                left: "140px", top: "60px",
                width: "200px", height: "270px",
                borderRadius: "20px",
                overflow: "hidden",
                border: "4px solid #ffffff",
                boxShadow: "0 16px 40px rgba(45,38,35,0.1)",
                zIndex: 2,
              }}
            >
              <img src="https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=400&h=600&fit=crop" alt="Professional" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
            </div>
            {/* Small card */}
            <div
              style={{
                position: "absolute",
                right: "0", bottom: "60px",
                width: "170px", height: "220px",
                borderRadius: "20px",
                overflow: "hidden",
                border: "4px solid #ffffff",
                boxShadow: "0 12px 32px rgba(45,38,35,0.08)",
              }}
            >
              <img src="https://images.unsplash.com/photo-1509631179647-0177331693ae?w=400&h=600&fit=crop" alt="Casual" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
            </div>
            {/* AI badge floating */}
            <div
              style={{
                position: "absolute",
                bottom: "20px", left: "30px",
                background: "rgba(255,255,255,0.95)",
                backdropFilter: "blur(12px)",
                borderRadius: "14px",
                padding: "12px 16px",
                display: "flex", alignItems: "center", gap: "10px",
                boxShadow: "0 8px 24px rgba(45,38,35,0.06)",
              }}
            >
              <div style={{ width: "36px", height: "36px", borderRadius: "10px", background: "linear-gradient(135deg,#c2887a,#dcaa9e)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                <Sparkles style={{ width: "18px", height: "18px", color: "#fff" }} />
              </div>
              <div>
                <div style={{ fontSize: "12px", fontWeight: 600, color: "#2d2623" }}>AI Outfit Ready</div>
                <div style={{ fontSize: "11px", color: "#8a7a72" }}>3 matches found</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Features ── */}
      <section
        id="features"
        style={{ padding: "100px 40px", maxWidth: "1280px", margin: "0 auto" }}
      >
        <div style={{ textAlign: "center", marginBottom: "64px" }}>
          <div style={{ display: "inline-flex", alignItems: "center", gap: "8px", padding: "6px 16px", background: "rgba(194,136,122,0.08)", borderRadius: "999px", marginBottom: "20px" }}>
            <Zap style={{ width: "13px", height: "13px", color: "#c2887a" }} />
            <span style={{ fontSize: "12px", color: "#c2887a", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.08em" }}>Why AI Dresser?</span>
          </div>
          <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(28px, 3.5vw, 44px)", fontWeight: 700, color: "#2d2623", marginBottom: "16px" }}>
            Everything you need to{" "}
            <span style={S.gradText}>dress brilliantly</span>
          </h2>
          <p style={{ fontSize: "16px", color: "#665a54", maxWidth: "520px", margin: "0 auto" }}>
            Experience the future of personal styling powered by intelligent AI recommendations
          </p>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "24px" }}>
          {features.map((f) => (
            <div
              key={f.title}
              style={{ ...S.card, cursor: "default" }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.boxShadow = `0 16px 40px ${f.glow}`;
                (e.currentTarget as HTMLElement).style.transform = "translateY(-6px)";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.boxShadow = "0 4px 16px rgba(45,38,35,0.03)";
                (e.currentTarget as HTMLElement).style.transform = "none";
              }}
            >
              <div style={{ width: "56px", height: "56px", borderRadius: "16px", background: f.gradient, display: "flex", alignItems: "center", justifyContent: "center", marginBottom: "24px", boxShadow: `0 8px 20px ${f.glow}` }}>
                <f.icon style={{ width: "26px", height: "26px", color: "#fff" }} />
              </div>
              <h3 style={{ fontSize: "20px", fontWeight: 600, color: "#2d2623", marginBottom: "12px" }}>{f.title}</h3>
              <p style={{ fontSize: "15px", lineHeight: 1.7, color: "#665a54" }}>{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── How It Works ── */}
      <section
        id="how-it-works"
        style={{
          padding: "100px 40px",
          background: "linear-gradient(180deg, transparent 0%, rgba(139,168,162,0.06) 50%, transparent 100%)",
        }}
      >
        <div style={{ maxWidth: "1280px", margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: "64px" }}>
            <div style={{ display: "inline-flex", alignItems: "center", gap: "8px", padding: "6px 16px", background: "rgba(139,168,162,0.15)", borderRadius: "999px", marginBottom: "20px" }}>
              <Star style={{ width: "13px", height: "13px", color: "#8ba8a2" }} />
              <span style={{ fontSize: "12px", color: "#54756f", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.08em" }}>Simple Process</span>
            </div>
            <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(28px, 3.5vw, 44px)", fontWeight: 700, color: "#2d2623", marginBottom: "14px" }}>
              How It Works
            </h2>
            <p style={{ fontSize: "16px", color: "#665a54" }}>Getting started takes just a few minutes</p>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "24px", position: "relative" }}>
            {/* Connector line */}
            <div style={{ position: "absolute", top: "44px", left: "12%", right: "12%", height: "2px", background: "linear-gradient(90deg, transparent, rgba(139,168,162,0.2), rgba(194,136,122,0.2), transparent)" }} />

            {steps.map((s) => (
              <div key={s.step} style={{ textAlign: "center", position: "relative" }}>
                <div style={{ position: "relative", display: "inline-block", marginBottom: "24px" }}>
                  <div style={{ width: "80px", height: "80px", borderRadius: "50%", background: "#ffffff", border: "1px solid rgba(45,38,35,0.06)", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto", boxShadow: "0 8px 24px rgba(45,38,35,0.04)" }}>
                    <s.icon style={{ width: "32px", height: "32px", color: "#8a7a72" }} />
                  </div>
                  <div style={{ position: "absolute", top: "-4px", right: "-4px", width: "24px", height: "24px", borderRadius: "50%", background: "#c2887a", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "11px", fontWeight: 700, color: "#fff", boxShadow: "0 2px 8px rgba(194,136,122,0.4)" }}>
                    {s.step}
                  </div>
                </div>
                <h3 style={{ fontSize: "16px", fontWeight: 600, color: "#2d2623", marginBottom: "10px" }}>{s.title}</h3>
                <p style={{ fontSize: "13px", color: "#665a54", lineHeight: 1.7 }}>{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Occasion Categories ── */}
      <section style={{ padding: "80px 40px", maxWidth: "1280px", margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: "52px" }}>
          <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(26px, 3vw, 40px)", fontWeight: 700, color: "#2d2623", marginBottom: "12px" }}>
            Styling for Every Occasion
          </h2>
          <p style={{ fontSize: "15px", color: "#665a54" }}>From casual outings to formal events — we've got you covered</p>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(6, 1fr)", gap: "16px" }}>
          {categories.map((c) => (
            <div
              key={c.label}
              style={{ ...S.card, padding: "24px 16px", textAlign: "center", cursor: "pointer" }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.transform = "translateY(-6px)";
                (e.currentTarget as HTMLElement).style.boxShadow = `0 12px 32px rgba(45,38,35,0.06)`;
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.transform = "none";
                (e.currentTarget as HTMLElement).style.boxShadow = "0 4px 16px rgba(45,38,35,0.03)";
              }}
            >
              <div style={{ width: "52px", height: "52px", borderRadius: "14px", background: `${c.color}15`, display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 14px" }}>
                <c.icon style={{ width: "24px", height: "24px", color: c.color }} />
              </div>
              <p style={{ fontSize: "13px", fontWeight: 600, color: "#4a3f39" }}>{c.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── Style Inspiration ── */}
      <section id="styles" style={{ padding: "80px 40px 100px", maxWidth: "1280px", margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: "60px" }}>
          <div style={{ display: "inline-flex", alignItems: "center", gap: "8px", padding: "6px 16px", background: "rgba(209,165,110,0.15)", borderRadius: "999px", marginBottom: "20px" }}>
            <Crown style={{ width: "13px", height: "13px", color: "#ba8f52" }} />
            <span style={{ fontSize: "12px", color: "#ba8f52", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.08em" }}>Style Inspiration</span>
          </div>
          <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(28px, 3.5vw, 44px)", fontWeight: 700, color: "#2d2623" }}>
            Discover Trending Looks
          </h2>
        </div>

        {/* Women's */}
        <div style={{ marginBottom: "70px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "32px" }}>
            <div style={{ height: "2px", width: "40px", background: "linear-gradient(90deg, #c2887a, transparent)" }} />
            <h3 style={{ fontSize: "22px", fontWeight: 700, fontFamily: "'Playfair Display', serif", color: "#2d2623" }}>Women's Collection</h3>
            <span style={{ fontSize: "18px" }}>👗</span>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "20px", marginBottom: "20px" }}>
            {womenStyles.map((s) => <PhotoCard key={s.title} img={s.img} title={s.title} tag={s.tag} />)}
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "16px" }}>
            {womenAcc.map((s) => <PhotoCard key={s.title} img={s.img} title={s.title} tag={s.cat} tall={false} />)}
          </div>
        </div>

        {/* Men's */}
        <div>
          <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "32px" }}>
            <div style={{ height: "2px", width: "40px", background: "linear-gradient(90deg, #8ba8a2, transparent)" }} />
            <h3 style={{ fontSize: "22px", fontWeight: 700, fontFamily: "'Playfair Display', serif", color: "#2d2623" }}>Men's Collection</h3>
            <span style={{ fontSize: "18px" }}>👔</span>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "20px", marginBottom: "20px" }}>
            {menStyles.map((s) => <PhotoCard key={s.title} img={s.img} title={s.title} tag={s.tag} />)}
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "16px" }}>
            {menAcc.map((s) => <PhotoCard key={s.title} img={s.img} title={s.title} tag={s.cat} tall={false} />)}
          </div>
        </div>
      </section>

      {/* ── CTA Banner ── */}
      <section
        style={{
          margin: "0 40px 80px",
          borderRadius: "28px",
          padding: "80px 60px",
          textAlign: "center",
          background: "linear-gradient(135deg, #f0ebe1 0%, #e2d9cd 100%)",
          border: "1px solid rgba(45,38,35,0.05)",
          position: "relative",
          overflow: "hidden",
        }}
      >
        <div style={{ position: "absolute", top: "-60px", left: "50%", transform: "translateX(-50%)", width: "400px", height: "300px", borderRadius: "50%", background: "radial-gradient(circle, #ffffff 0%, transparent 70%)", pointerEvents: "none" }} />
        <div style={{ position: "relative" }}>
          <Sparkles style={{ width: "40px", height: "40px", color: "#c2887a", margin: "0 auto 20px" }} />
          <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(28px, 3.5vw, 48px)", fontWeight: 700, color: "#2d2623", marginBottom: "16px" }}>
            Ready to Transform Your Style?
          </h2>
          <p style={{ fontSize: "17px", color: "#665a54", maxWidth: "500px", margin: "0 auto 36px", lineHeight: 1.7 }}>
            Join thousands of users who are already styling smarter with AI
          </p>
          <button
            onClick={openSignup}
            style={{ ...S.btnPrimary, fontSize: "16px", padding: "16px 40px" }}
            onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.boxShadow = "0 8px 24px rgba(194,136,122,0.4)")}
            onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.boxShadow = "0 4px 16px rgba(194,136,122,0.3)")}
          >
            Get Started Free <ArrowRight style={{ width: "18px", height: "18px" }} />
          </button>
        </div>
      </section>

      {/* ── Footer ── */}
      <footer
        style={{
          padding: "40px",
          borderTop: "1px solid rgba(45,38,35,0.06)",
          background: "#ffffff",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          flexWrap: "wrap",
          gap: "16px",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          <div style={{ width: "32px", height: "32px", borderRadius: "10px", background: "linear-gradient(135deg, #c2887a, #dcaa9e)", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <Sparkles style={{ width: "15px", height: "15px", color: "#fff" }} />
          </div>
          <span style={{ fontFamily: "'Playfair Display', serif", fontSize: "16px", fontWeight: 700, color: "#2d2623" }}>AI Dresser</span>
        </div>
        <p style={{ fontSize: "13px", color: "#8a7a72" }}>© 2026 AI Dresser. All rights reserved.</p>
        <div style={{ display: "flex", gap: "24px" }}>
          {["Privacy", "Terms", "Contact"].map((l) => (
            <a key={l} href="#" style={{ fontSize: "13px", color: "#8a7a72", textDecoration: "none", fontWeight: 500 }}
              onMouseEnter={(e) => ((e.target as HTMLElement).style.color = "#c2887a")}
              onMouseLeave={(e) => ((e.target as HTMLElement).style.color = "#8a7a72")}
            >{l}</a>
          ))}
        </div>
      </footer>

      {/* ── Auth Modal ── */}
      {showModal && (
        <div
          style={{
            position: "fixed", inset: 0,
            background: "rgba(45,38,35,0.4)",
            backdropFilter: "blur(12px)",
            display: "flex", alignItems: "center", justifyContent: "center",
            zIndex: 200, padding: "20px",
          }}
          onClick={(e) => { if (e.target === e.currentTarget) setShowModal(false); }}
        >
          <div
            style={{
              width: "100%", maxWidth: "440px",
              background: "#ffffff",
              border: "1px solid rgba(45,38,35,0.06)",
              borderRadius: "24px",
              padding: "40px",
              position: "relative",
              boxShadow: "0 24px 60px rgba(45,38,35,0.15)",
            }}
          >
            {/* Close */}
            <button
              onClick={() => setShowModal(false)}
              style={{ position: "absolute", top: "16px", right: "16px", background: "#f5f2eb", border: "none", borderRadius: "10px", width: "36px", height: "36px", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", color: "#8a7a72" }}
            >
              <X style={{ width: "16px", height: "16px" }} />
            </button>

            {/* Header */}
            <div style={{ textAlign: "center", marginBottom: "32px" }}>
              <div style={{ width: "52px", height: "52px", borderRadius: "16px", background: "linear-gradient(135deg, #c2887a, #dcaa9e)", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 16px", boxShadow: "0 6px 16px rgba(194,136,122,0.3)" }}>
                <Sparkles style={{ width: "24px", height: "24px", color: "#fff" }} />
              </div>
              <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: "26px", fontWeight: 700, color: "#2d2623", marginBottom: "8px" }}>
                {isLogin ? "Welcome Back" : "Get Started"}
              </h2>
              <p style={{ fontSize: "14px", color: "#8a7a72" }}>
                {isLogin ? "Sign in to access your wardrobe" : "Create your account and start styling"}
              </p>
            </div>

            {/* Form */}
            <form onSubmit={isLogin ? handleLogin : handleRegister}>
              {!isLogin && (
                <InputField type="text" label="Full Name" value={name} onChange={setName} placeholder="Ameena Khan" icon={User} />
              )}
              <InputField type="email" label="Email Address" value={email} onChange={setEmail} placeholder="you@example.com" icon={Mail} />
              <InputField type="password" label="Password" value={password} onChange={setPassword} placeholder={isLogin ? "Enter your password" : "Create a strong password"} icon={Lock} />

              <button
                type="submit"
                style={{ ...S.btnPrimary, width: "100%", justifyContent: "center", padding: "16px", marginTop: "8px", borderRadius: "14px", fontSize: "15px" }}
                onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.boxShadow = "0 8px 24px rgba(194,136,122,0.4)")}
                onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.boxShadow = "0 4px 16px rgba(194,136,122,0.3)")}
              >
                {isLogin ? "Sign In" : "Create Account"}
                <ChevronRight style={{ width: "16px", height: "16px" }} />
              </button>
            </form>

            {/* Toggle */}
            <p style={{ marginTop: "24px", textAlign: "center", fontSize: "14px", color: "#665a54" }}>
              {isLogin ? "Don't have an account? " : "Already have an account? "}
              <button
                onClick={() => setIsLogin(!isLogin)}
                style={{ background: "none", border: "none", color: "#c2887a", cursor: "pointer", fontWeight: 600, fontSize: "14px" }}
              >
                {isLogin ? "Sign Up" : "Sign In"}
              </button>
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
