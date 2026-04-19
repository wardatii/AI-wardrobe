import { createContext, useContext, useState, ReactNode } from "react";

export interface WardrobeItem {
  id: string;
  name: string;
  category: string;
  subcategory: string;
  gender: "women" | "men";
  imageUrl: string;
  color: string;
  addedDate: string;
}

interface WardrobeContextType {
  items: WardrobeItem[];
  addItem: (item: Omit<WardrobeItem, "id" | "addedDate">) => void;
  removeItem: (id: string) => void;
  updateItem: (id: string, updates: Partial<WardrobeItem>) => void;
}

const WardrobeContext = createContext<WardrobeContextType | undefined>(undefined);

const mockItems: WardrobeItem[] = [
  {
    id: "1",
    name: "Blue Evening Dress",
    category: "dress",
    subcategory: "evening",
    gender: "women",
    imageUrl: "https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=400&h=600&fit=crop",
    color: "blue",
    addedDate: "2026-04-15",
  },
  {
    id: "2",
    name: "Black Blazer",
    category: "tops",
    subcategory: "blazer",
    gender: "women",
    imageUrl: "https://images.unsplash.com/photo-1591369822096-ffd140ec948f?w=400&h=600&fit=crop",
    color: "black",
    addedDate: "2026-04-16",
  },
  {
    id: "3",
    name: "White Shirt",
    category: "shirts",
    subcategory: "casual",
    gender: "men",
    imageUrl: "https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?w=400&h=600&fit=crop",
    color: "white",
    addedDate: "2026-04-17",
  },
  {
    id: "4",
    name: "Gold Necklace",
    category: "jewelry",
    subcategory: "necklace",
    gender: "women",
    imageUrl: "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=400&h=600&fit=crop",
    color: "gold",
    addedDate: "2026-04-18",
  },
  {
    id: "5",
    name: "Diamond Earrings",
    category: "jewelry",
    subcategory: "earrings",
    gender: "women",
    imageUrl: "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=400&h=600&fit=crop",
    color: "silver",
    addedDate: "2026-04-18",
  },
  {
    id: "6",
    name: "Pearl Bracelet",
    category: "jewelry",
    subcategory: "bracelet",
    gender: "women",
    imageUrl: "https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=400&h=600&fit=crop",
    color: "white",
    addedDate: "2026-04-18",
  },
  {
    id: "7",
    name: "Designer Handbag",
    category: "accessories",
    subcategory: "handbag",
    gender: "women",
    imageUrl: "https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=400&h=600&fit=crop",
    color: "black",
    addedDate: "2026-04-18",
  },
  {
    id: "8",
    name: "Sunglasses",
    category: "accessories",
    subcategory: "sunglasses",
    gender: "women",
    imageUrl: "https://images.unsplash.com/photo-1511499767150-a48a237f0083?w=400&h=600&fit=crop",
    color: "black",
    addedDate: "2026-04-18",
  },
  {
    id: "9",
    name: "Silk Scarf",
    category: "accessories",
    subcategory: "scarf",
    gender: "women",
    imageUrl: "https://images.unsplash.com/photo-1601924994987-69e26d50dc26?w=400&h=600&fit=crop",
    color: "multi",
    addedDate: "2026-04-18",
  },
  {
    id: "10",
    name: "Leather Watch",
    category: "accessories",
    subcategory: "watch",
    gender: "men",
    imageUrl: "https://images.unsplash.com/photo-1524592094714-0f0654e20314?w=400&h=600&fit=crop",
    color: "brown",
    addedDate: "2026-04-18",
  },
  {
    id: "11",
    name: "Black Leather Belt",
    category: "accessories",
    subcategory: "belt",
    gender: "men",
    imageUrl: "https://images.unsplash.com/photo-1624222247344-550fb60583c2?w=400&h=600&fit=crop",
    color: "black",
    addedDate: "2026-04-18",
  },
  {
    id: "12",
    name: "Leather Wallet",
    category: "accessories",
    subcategory: "wallet",
    gender: "men",
    imageUrl: "https://images.unsplash.com/photo-1627123424574-724758594e93?w=400&h=600&fit=crop",
    color: "brown",
    addedDate: "2026-04-18",
  },
  {
    id: "13",
    name: "Silver Chain",
    category: "accessories",
    subcategory: "chain",
    gender: "men",
    imageUrl: "https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=400&h=600&fit=crop",
    color: "silver",
    addedDate: "2026-04-18",
  },
  {
    id: "14",
    name: "Gold Ring",
    category: "accessories",
    subcategory: "ring",
    gender: "men",
    imageUrl: "https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=400&h=600&fit=crop",
    color: "gold",
    addedDate: "2026-04-18",
  },
];

export function WardrobeProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<WardrobeItem[]>(mockItems);

  const addItem = (item: Omit<WardrobeItem, "id" | "addedDate">) => {
    const newItem: WardrobeItem = {
      ...item,
      id: Date.now().toString(),
      addedDate: new Date().toISOString().split('T')[0],
    };
    setItems((prev) => [...prev, newItem]);
  };

  const removeItem = (id: string) => {
    setItems((prev) => prev.filter((item) => item.id !== id));
  };

  const updateItem = (id: string, updates: Partial<WardrobeItem>) => {
    setItems((prev) =>
      prev.map((item) => (item.id === id ? { ...item, ...updates } : item))
    );
  };

  return (
    <WardrobeContext.Provider value={{ items, addItem, removeItem, updateItem }}>
      {children}
    </WardrobeContext.Provider>
  );
}

export function useWardrobe() {
  const context = useContext(WardrobeContext);
  if (!context) {
    throw new Error("useWardrobe must be used within WardrobeProvider");
  }
  return context;
}
