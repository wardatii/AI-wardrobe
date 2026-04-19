import { Sparkles } from "lucide-react";

export function AISuggestions() {
  const suggestions = [
    {
      id: 1,
      title: "Elegant Evening Look",
      description: "Perfect for formal events and dinner parties",
      imageUrl: "https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?w=400&h=600&fit=crop",
      items: ["Blue Evening Dress", "Black Heels", "Silver Clutch"],
    },
    {
      id: 2,
      title: "Business Casual",
      description: "Professional yet comfortable for office wear",
      imageUrl: "https://images.unsplash.com/photo-1591369822096-ffd140ec948f?w=400&h=600&fit=crop",
      items: ["Black Blazer", "White Blouse", "Gray Trousers"],
    },
    {
      id: 3,
      title: "Weekend Chic",
      description: "Relaxed style for casual outings",
      imageUrl: "https://images.unsplash.com/photo-1509631179647-0177331693ae?w=400&h=600&fit=crop",
      items: ["Denim Jacket", "White T-Shirt", "Black Jeans"],
    },
  ];

  return (
    <div className="p-8">
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-2">
          <Sparkles className="w-8 h-8 text-purple-600" />
          <h1 className="text-3xl">AI Suggested Outfits</h1>
        </div>
        <p className="text-muted-foreground">
          Personalized outfit recommendations based on your wardrobe
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {suggestions.map((suggestion) => (
          <div
            key={suggestion.id}
            className="bg-card border border-border rounded-xl overflow-hidden hover:shadow-lg transition-shadow"
          >
            <div className="aspect-[3/4] bg-muted relative overflow-hidden">
              <img
                src={suggestion.imageUrl}
                alt={suggestion.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute top-3 right-3 px-3 py-1 bg-purple-600 text-white rounded-full text-sm flex items-center gap-1">
                <Sparkles className="w-4 h-4" />
                AI Pick
              </div>
            </div>
            <div className="p-5">
              <h3 className="mb-2">{suggestion.title}</h3>
              <p className="text-sm text-muted-foreground mb-4">
                {suggestion.description}
              </p>
              <div className="space-y-2">
                <p className="text-sm">Includes:</p>
                <ul className="text-sm text-muted-foreground space-y-1">
                  {suggestion.items.map((item, idx) => (
                    <li key={idx} className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 bg-purple-600 rounded-full" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
