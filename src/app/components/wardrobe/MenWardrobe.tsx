import { useState } from "react";
import { useNavigate } from "react-router";
import { useWardrobe } from "../../context/WardrobeContext";
import { Trash2, Shirt, Watch, Plus, Sparkles, Star } from "lucide-react";
import { AddItemDialog } from "../dialogs/AddItemDialog";

/* ─── shared light-theme card styles ─── */
const cardBase: React.CSSProperties = {
  background: "#ffffff",
  border: "1px solid rgba(45,38,35,0.06)",
  borderRadius: "16px",
  overflow: "hidden",
  cursor: "pointer",
  transition: "all 0.25s",
  boxShadow: "0 4px 16px rgba(45,38,35,0.02)",
};

const emptyBox: React.CSSProperties = {
  background: "rgba(139,168,162,0.02)",
  border: "1px dashed rgba(139,168,162,0.2)",
  borderRadius: "18px",
  padding: "48px 24px",
  textAlign: "center",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  gap: "12px",
};

const addBtn: React.CSSProperties = {
  background: "linear-gradient(135deg, #8ba8a2, #a8c7c0)",
  color: "#fff",
  border: "none",
  borderRadius: "12px",
  padding: "10px 24px",
  fontSize: "13px",
  fontWeight: 600,
  cursor: "pointer",
  boxShadow: "0 6px 18px rgba(139,168,162,0.25)",
};

export function MenWardrobe() {
  const { items, removeItem } = useWardrobe();
  const navigate = useNavigate();
  const [selectedItems, setSelectedItems] = useState<string[]>([]);
  const [showAddDialog, setShowAddDialog] = useState(false);
  const [activeTab, setActiveTab] = useState<"all" | "clothing" | "accessories">("all");

  const menItems = items.filter((item) => item.gender === "men");
  const clothingItems = menItems.filter((item) => item.category !== "accessories");
  const accessoriesItems = menItems.filter((item) => item.category === "accessories");

  const clothingCategories = [
    { name: "Shirts",         items: clothingItems.filter((i) => i.category === "shirts") },
    { name: "Shalwar Kameez", items: clothingItems.filter((i) => i.category === "shalwar") },
    { name: "Trousers",       items: clothingItems.filter((i) => i.category === "trousers") },
    { name: "Footwear",       items: clothingItems.filter((i) => i.category === "footwear") },
  ];

  const accessoriesCategories = [
    { name: "Watches", items: accessoriesItems.filter((i) => i.subcategory === "watch") },
    { name: "Chains",  items: accessoriesItems.filter((i) => i.subcategory === "chain") },
    { name: "Rings",   items: accessoriesItems.filter((i) => i.subcategory === "ring") },
    { name: "Belts",   items: accessoriesItems.filter((i) => i.subcategory === "belt") },
    { name: "Wallets", items: accessoriesItems.filter((i) => i.subcategory === "wallet") },
  ];

  const toggleSelect = (id: string) => {
    setSelectedItems((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    );
  };

  const tabs = [
    { key: "all",         label: "All Items",   count: menItems.length },
    { key: "clothing",    label: "Clothing",    count: clothingItems.length },
    { key: "accessories", label: "Accessories", count: accessoriesItems.length },
  ] as const;

  /* ─── Item card ─── */
  const ItemCard = ({ item }: { item: any }) => {
    const selected = selectedItems.includes(item.id);
    return (
      <div
        style={{
          ...cardBase,
          border: selected ? "1.5px solid #8ba8a2" : "1.5px solid rgba(45,38,35,0.06)",
          boxShadow: selected ? "0 8px 24px rgba(139,168,162,0.15)" : "0 4px 16px rgba(45,38,35,0.03)",
          transform: selected ? "translateY(-2px)" : "none",
        }}
        onClick={() => toggleSelect(item.id)}
        onMouseEnter={(e) => {
          if (!selected) {
            (e.currentTarget as HTMLElement).style.borderColor = "rgba(139,168,162,0.3)";
            (e.currentTarget as HTMLElement).style.boxShadow = "0 8px 24px rgba(45,38,35,0.08)";
            (e.currentTarget as HTMLElement).style.transform = "translateY(-3px)";
          }
        }}
        onMouseLeave={(e) => {
          if (!selected) {
            (e.currentTarget as HTMLElement).style.borderColor = "rgba(45,38,35,0.06)";
            (e.currentTarget as HTMLElement).style.boxShadow = "0 4px 16px rgba(45,38,35,0.03)";
            (e.currentTarget as HTMLElement).style.transform = "none";
          }
        }}
      >
        {/* Image */}
        <div style={{ aspectRatio: "3/4", position: "relative", overflow: "hidden", background: "#f5f2eb" }}>
          <img
            src={item.imageUrl}
            alt={item.name}
            style={{ width: "100%", height: "100%", objectFit: "cover", transition: "transform 0.4s" }}
            className="group-hover:scale-105"
          />
          {/* Selected overlay */}
          {selected && (
            <div style={{ position: "absolute", inset: 0, background: "rgba(139,168,162,0.15)", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <div style={{ width: "48px", height: "48px", borderRadius: "50%", background: "linear-gradient(135deg,#8ba8a2,#a8c7c0)", display: "flex", alignItems: "center", justifyContent: "center", boxShadow: "0 4px 12px rgba(139,168,162,0.4)" }}>
                <Star style={{ width: "22px", height: "22px", color: "#fff" }} />
              </div>
            </div>
          )}
          {/* Category badge */}
          <div style={{ position: "absolute", top: "10px", left: "10px" }}>
            <span style={{ background: "rgba(255,255,255,0.9)", backdropFilter: "blur(6px)", color: "#8ba8a2", fontSize: "10px", fontWeight: 700, padding: "4px 10px", borderRadius: "999px", textTransform: "capitalize", letterSpacing: "0.04em", border: "1px solid rgba(139,168,162,0.15)" }}>
              {item.category}
            </span>
          </div>
          {/* Delete button */}
          <div style={{ position: "absolute", top: "10px", right: "10px" }}>
            <button
              onClick={(e) => { e.stopPropagation(); removeItem(item.id); }}
              style={{ width: "30px", height: "30px", borderRadius: "8px", background: "rgba(217,93,93,0.9)", border: "none", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", backdropFilter: "blur(6px)", boxShadow: "0 2px 8px rgba(0,0,0,0.1)" }}
            >
              <Trash2 style={{ width: "13px", height: "13px", color: "#fff" }} />
            </button>
          </div>
        </div>

        {/* Info */}
        <div style={{ padding: "14px", background: "#ffffff" }}>
          <p style={{ fontSize: "14px", fontWeight: 600, color: "#2d2623", marginBottom: "4px", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{item.name}</p>
          <p style={{ fontSize: "11px", color: "#8a7a72", textTransform: "capitalize", fontWeight: 500 }}>{item.subcategory}</p>
          <button
            onClick={(e) => { e.stopPropagation(); toggleSelect(item.id); }}
            style={{
              marginTop: "12px", width: "100%", padding: "8px",
              background: selected ? "rgba(139,168,162,0.1)" : "#fdfbf7",
              border: selected ? "1px solid rgba(139,168,162,0.4)" : "1px solid rgba(45,38,35,0.08)",
              borderRadius: "10px", fontSize: "12px", fontWeight: 600,
              color: selected ? "#8ba8a2" : "#665a54", cursor: "pointer",
              transition: "all 0.2s"
            }}
          >
            {selected ? "✓ Selected" : "Select"}
          </button>
        </div>
      </div>
    );
  };

  /* ─── Empty state ─── */
  const Empty = ({ icon: Icon, label, color }: { icon: any; label: string; color: string }) => (
    <div style={emptyBox}>
      <Icon style={{ width: "40px", height: "40px", color, opacity: 0.5 }} />
      <p style={{ fontSize: "14px", color: "#8a7a72", fontWeight: 500 }}>No {label} yet</p>
      <button style={addBtn} onClick={() => setShowAddDialog(true)}>+ Add {label}</button>
    </div>
  );

  /* ─── Section header ─── */
  const SectionHeader = ({ icon: Icon, title, sub, color }: { icon: any; title: string; sub: string; color: string }) => (
    <div style={{ display: "flex", alignItems: "center", gap: "14px", marginBottom: "20px" }}>
      <div style={{ width: "44px", height: "44px", borderRadius: "14px", background: `${color}15`, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
        <Icon style={{ width: "22px", height: "22px", color }} />
      </div>
      <div>
        <h2 style={{ fontSize: "20px", fontWeight: 700, color: "#2d2623", fontFamily: "'Playfair Display', serif" }}>{title}</h2>
        <p style={{ fontSize: "13px", color: "#8a7a72", marginTop: "2px" }}>{sub}</p>
      </div>
    </div>
  );

  /* ─── Sub-category group ─── */
  const CategoryGroup = ({ name, items: groupItems }: { name: string; items: any[] }) => {
    if (groupItems.length === 0) return null;
    return (
      <div style={{ marginBottom: "32px" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "16px" }}>
          <div style={{ height: "2px", width: "28px", background: "linear-gradient(90deg, #8ba8a2, transparent)" }} />
          <span style={{ fontSize: "13px", fontWeight: 700, color: "#2d2623", textTransform: "uppercase", letterSpacing: "0.05em" }}>{name}</span>
          <span style={{ fontSize: "12px", color: "#8a7a72", fontWeight: 500 }}>({groupItems.length})</span>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(180px, 1fr))", gap: "20px" }}>
          {groupItems.map((item) => <ItemCard key={item.id} item={item} />)}
        </div>
      </div>
    );
  };

  const showClothing    = activeTab === "all" || activeTab === "clothing";
  const showAccessories = activeTab === "all" || activeTab === "accessories";

  return (
    <div
      style={{
        minHeight: "100vh",
        padding: "32px",
        background: "radial-gradient(ellipse at top right, rgba(139,168,162,0.06) 0%, transparent 50%), #fdfbf7",
        fontFamily: "'Inter', sans-serif",
      }}
    >
      {/* ── Page header ── */}
      <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", marginBottom: "28px" }}>
        <div>
          <p style={{ fontSize: "12px", color: "#8ba8a2", fontWeight: 600, marginBottom: "6px", textTransform: "uppercase", letterSpacing: "0.08em" }}>
            ✦ Wardrobe
          </p>
          <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: "32px", fontWeight: 700, color: "#2d2623", marginBottom: "6px" }}>
            Men's Collection
          </h1>
          <p style={{ fontSize: "14px", color: "#665a54" }}>
            {menItems.length} items — clothing & accessories
          </p>
        </div>
        <div style={{ display: "flex", gap: "12px" }}>
          {selectedItems.length > 0 && (
            <button
              onClick={() => navigate("/ai-chat")}
              style={{ display: "flex", alignItems: "center", gap: "6px", padding: "10px 20px", background: "rgba(139,168,162,0.08)", border: "1px solid rgba(139,168,162,0.3)", borderRadius: "12px", color: "#8ba8a2", fontSize: "13px", fontWeight: 600, cursor: "pointer", boxShadow: "0 2px 8px rgba(139,168,162,0.05)" }}
            >
              <Sparkles style={{ width: "15px", height: "15px" }} />
              Style ({selectedItems.length})
            </button>
          )}
          <button
            onClick={() => setShowAddDialog(true)}
            style={{ display: "flex", alignItems: "center", gap: "8px", padding: "10px 20px", background: "linear-gradient(135deg,#8ba8a2,#a8c7c0)", border: "none", borderRadius: "12px", color: "#fff", fontSize: "13px", fontWeight: 600, cursor: "pointer", boxShadow: "0 6px 16px rgba(139,168,162,0.3)" }}
          >
            <Plus style={{ width: "16px", height: "16px" }} />
            Add Item
          </button>
        </div>
      </div>

      {/* ── Stats row ── */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: "16px", marginBottom: "32px" }}>
        {[
          { label: "Clothing",    value: clothingItems.length,    color: "#c2887a", icon: Shirt },
          { label: "Accessories", value: accessoriesItems.length, color: "#8aa1b8", icon: Watch },
        ].map((s) => (
          <div key={s.label} style={{ background: "#ffffff", border: "1px solid rgba(45,38,35,0.06)", borderRadius: "16px", padding: "20px", display: "flex", alignItems: "center", gap: "16px", boxShadow: "0 4px 12px rgba(45,38,35,0.02)" }}>
            <div style={{ width: "48px", height: "48px", borderRadius: "14px", background: `${s.color}15`, display: "flex", alignItems: "center", justifyContent: "center" }}>
              <s.icon style={{ width: "24px", height: "24px", color: s.color }} />
            </div>
            <div>
              <p style={{ fontSize: "24px", fontWeight: 700, color: s.color }}>{s.value}</p>
              <p style={{ fontSize: "12px", color: "#8a7a72", fontWeight: 500 }}>{s.label}</p>
            </div>
          </div>
        ))}
      </div>

      {/* ── Filter Tabs ── */}
      <div style={{ display: "inline-flex", gap: "8px", marginBottom: "32px", flexWrap: "wrap", background: "#f0ebe1", padding: "6px", borderRadius: "14px" }}>
        {tabs.map((tab) => (
          <button
            key={tab.key}
            onClick={() => setActiveTab(tab.key)}
            style={{
              padding: "8px 20px",
              borderRadius: "10px",
              border: "none",
              background: activeTab === tab.key ? "#ffffff" : "transparent",
              color: activeTab === tab.key ? "#8ba8a2" : "#8a7a72",
              fontSize: "13px", fontWeight: 600, cursor: "pointer", transition: "all 0.2s",
              boxShadow: activeTab === tab.key ? "0 2px 8px rgba(45,38,35,0.05)" : "none"
            }}
          >
            {tab.label}
            <span style={{ marginLeft: "6px", fontSize: "11px", opacity: 0.8 }}>({tab.count})</span>
          </button>
        ))}
      </div>

      {/* ── Sections ── */}
      <div style={{ display: "flex", flexDirection: "column", gap: "48px" }}>

        {/* Clothing */}
        {showClothing && (
          <section>
            <SectionHeader icon={Shirt} title="Clothing" sub="Shirts, trousers, traditional wear & footwear" color="#c2887a" />
            {clothingItems.length === 0 ? (
              <Empty icon={Shirt} label="clothing" color="#c2887a" />
            ) : (
              <div>
                {clothingCategories.map((cat) => (
                  <CategoryGroup key={cat.name} name={cat.name} items={cat.items} />
                ))}
                {/* If items don't match any sub-category */}
                {clothingCategories.every((c) => c.items.length === 0) && (
                  <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(180px, 1fr))", gap: "20px" }}>
                    {clothingItems.map((item) => <ItemCard key={item.id} item={item} />)}
                  </div>
                )}
              </div>
            )}
          </section>
        )}

        {/* Accessories */}
        {showAccessories && (
          <section>
            <SectionHeader icon={Watch} title="Accessories" sub="Watches, chains, rings, belts & wallets" color="#8aa1b8" />
            {accessoriesItems.length === 0 ? (
              <Empty icon={Watch} label="accessories" color="#8aa1b8" />
            ) : (
              <div>
                {accessoriesCategories.map((cat) => (
                  <CategoryGroup key={cat.name} name={cat.name} items={cat.items} />
                ))}
                {accessoriesCategories.every((c) => c.items.length === 0) && (
                  <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(180px, 1fr))", gap: "20px" }}>
                    {accessoriesItems.map((item) => <ItemCard key={item.id} item={item} />)}
                  </div>
                )}
              </div>
            )}
          </section>
        )}
      </div>

      <AddItemDialog open={showAddDialog} onClose={() => setShowAddDialog(false)} />
    </div>
  );
}
