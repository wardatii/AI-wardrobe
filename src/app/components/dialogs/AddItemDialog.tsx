import { useState } from "react";
import { useWardrobe } from "../../context/WardrobeContext";
import { X } from "lucide-react";

interface AddItemDialogProps {
  open: boolean;
  onClose: () => void;
}

export function AddItemDialog({ open, onClose }: AddItemDialogProps) {
  const { addItem } = useWardrobe();
  const [name, setName] = useState("");
  const [category, setCategory] = useState("");
  const [subcategory, setSubcategory] = useState("");
  const [gender, setGender] = useState<"women" | "men">("women");
  const [imageUrl, setImageUrl] = useState("");
  const [color, setColor] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    addItem({
      name,
      category,
      subcategory,
      gender,
      imageUrl: imageUrl || "https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?w=400&h=600&fit=crop",
      color,
    });
    setName("");
    setCategory("");
    setSubcategory("");
    setImageUrl("");
    setColor("");
    onClose();
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl max-w-md w-full p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl">Add New Item</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-muted rounded-lg transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block mb-2">Item Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-4 py-3 border border-border rounded-lg bg-input-background focus:outline-none focus:ring-2 focus:ring-primary"
              placeholder="e.g., Blue Evening Dress"
              required
            />
          </div>

          <div>
            <label className="block mb-2">Gender</label>
            <div className="grid grid-cols-2 gap-3">
              {(["women", "men"] as const).map((g) => (
                <button
                  key={g}
                  type="button"
                  onClick={() => setGender(g)}
                  className={`py-3 border-2 rounded-lg transition-all capitalize ${
                    gender === g
                      ? "border-purple-600 bg-purple-50"
                      : "border-border hover:border-purple-300"
                  }`}
                >
                  {g}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="block mb-2">Category</label>
            <input
              type="text"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full px-4 py-3 border border-border rounded-lg bg-input-background focus:outline-none focus:ring-2 focus:ring-primary"
              placeholder="e.g., dress, shirt, trousers"
              required
            />
          </div>

          <div>
            <label className="block mb-2">Subcategory</label>
            <input
              type="text"
              value={subcategory}
              onChange={(e) => setSubcategory(e.target.value)}
              className="w-full px-4 py-3 border border-border rounded-lg bg-input-background focus:outline-none focus:ring-2 focus:ring-primary"
              placeholder="e.g., evening, casual, formal"
              required
            />
          </div>

          <div>
            <label className="block mb-2">Color</label>
            <input
              type="text"
              value={color}
              onChange={(e) => setColor(e.target.value)}
              className="w-full px-4 py-3 border border-border rounded-lg bg-input-background focus:outline-none focus:ring-2 focus:ring-primary"
              placeholder="e.g., blue, black, white"
              required
            />
          </div>

          <div>
            <label className="block mb-2">Image URL (optional)</label>
            <input
              type="url"
              value={imageUrl}
              onChange={(e) => setImageUrl(e.target.value)}
              className="w-full px-4 py-3 border border-border rounded-lg bg-input-background focus:outline-none focus:ring-2 focus:ring-primary"
              placeholder="https://example.com/image.jpg"
            />
          </div>

          <button
            type="submit"
            className="w-full py-3 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-lg hover:from-purple-700 hover:to-blue-700 transition-all"
          >
            Add Item
          </button>
        </form>
      </div>
    </div>
  );
}
