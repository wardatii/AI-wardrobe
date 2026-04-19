import { useState } from "react";
import { Send, Plus, Sparkles, Image as ImageIcon } from "lucide-react";

interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
  outfit?: {
    imageUrl: string;
    items: string[];
  };
}

interface Chat {
  id: string;
  title: string;
  messages: Message[];
}

export function AIChat() {
  const [chats, setChats] = useState<Chat[]>([
    {
      id: "1",
      title: "Chat 1",
      messages: [
        {
          id: "1",
          role: "assistant",
          content: "Hello! I'm your AI stylist. How can I help you today?",
        },
      ],
    },
  ]);
  const [currentChatId, setCurrentChatId] = useState("1");
  const [input, setInput] = useState("");

  const currentChat = chats.find((c) => c.id === currentChatId);

  const createNewChat = () => {
    const newChat: Chat = {
      id: Date.now().toString(),
      title: `Chat ${chats.length + 1}`,
      messages: [
        {
          id: "1",
          role: "assistant",
          content: "Hello! I'm your AI stylist. How can I help you today?",
        },
      ],
    };
    setChats([...chats, newChat]);
    setCurrentChatId(newChat.id);
  };

  const sendMessage = () => {
    if (!input.trim() || !currentChat) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: "user",
      content: input,
    };

    const aiResponse: Message = {
      id: (Date.now() + 1).toString(),
      role: "assistant",
      content: "Based on your request, I recommend this stylish outfit that combines comfort and elegance.",
      outfit: {
        imageUrl: "https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?w=400&h=600&fit=crop",
        items: ["Blue Evening Dress", "Black Heels", "Silver Accessories"],
      },
    };

    setChats(
      chats.map((chat) =>
        chat.id === currentChatId
          ? {
              ...chat,
              messages: [...chat.messages, userMessage, aiResponse],
            }
          : chat
      )
    );

    setInput("");
  };

  return (
    <div className="flex h-full">
      <div className="w-64 border-r border-border bg-sidebar flex flex-col">
        <div className="p-4 border-b border-sidebar-border">
          <button
            onClick={createNewChat}
            className="w-full px-4 py-3 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-lg hover:from-purple-700 hover:to-blue-700 transition-all flex items-center justify-center gap-2"
          >
            <Plus className="w-5 h-5" />
            New Chat
          </button>
        </div>

        <div className="flex-1 overflow-auto p-4 space-y-2">
          <p className="text-xs text-muted-foreground mb-2 px-2">Chat History</p>
          {chats.map((chat) => (
            <button
              key={chat.id}
              onClick={() => setCurrentChatId(chat.id)}
              className={`w-full px-4 py-3 rounded-lg transition-colors text-left ${
                currentChatId === chat.id
                  ? "bg-sidebar-accent text-sidebar-accent-foreground"
                  : "text-sidebar-foreground hover:bg-sidebar-accent/50"
              }`}
            >
              {chat.title}
            </button>
          ))}
        </div>
      </div>

      <div className="flex-1 flex flex-col">
        <div className="p-6 border-b border-border">
          <div className="flex items-center gap-3">
            <Sparkles className="w-6 h-6 text-purple-600" />
            <h1 className="text-2xl">AI Stylist Chat</h1>
          </div>
        </div>

        <div className="flex-1 overflow-auto p-6 space-y-6">
          {currentChat?.messages.map((message) => (
            <div
              key={message.id}
              className={`flex ${
                message.role === "user" ? "justify-end" : "justify-start"
              }`}
            >
              <div
                className={`max-w-2xl ${
                  message.role === "user"
                    ? "bg-gradient-to-r from-purple-600 to-blue-600 text-white"
                    : "bg-muted"
                } rounded-2xl p-4`}
              >
                <p className="mb-2">{message.content}</p>
                {message.outfit && (
                  <div className="mt-4 bg-white rounded-xl overflow-hidden">
                    <img
                      src={message.outfit.imageUrl}
                      alt="AI suggested outfit"
                      className="w-full h-64 object-cover"
                    />
                    <div className="p-4">
                      <p className="text-sm text-muted-foreground mb-2">
                        Outfit includes:
                      </p>
                      <ul className="text-sm space-y-1">
                        {message.outfit.items.map((item, idx) => (
                          <li key={idx} className="flex items-center gap-2 text-foreground">
                            <span className="w-1.5 h-1.5 bg-purple-600 rounded-full" />
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        <div className="border-t border-border p-6">
          <div className="flex gap-3">
            <button className="p-3 border border-border rounded-lg hover:bg-muted transition-colors">
              <Plus className="w-5 h-5" />
            </button>
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={(e) => e.key === "Enter" && sendMessage()}
              className="flex-1 px-4 py-3 border border-border rounded-lg bg-input-background focus:outline-none focus:ring-2 focus:ring-primary"
              placeholder="Ask for styling suggestions..."
            />
            <button
              onClick={sendMessage}
              className="p-3 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-lg hover:from-purple-700 hover:to-blue-700 transition-all"
            >
              <Send className="w-5 h-5" />
            </button>
          </div>
          <p className="text-xs text-muted-foreground mt-2">
            Use + to add costumes or accessories from your wardrobe
          </p>
        </div>
      </div>
    </div>
  );
}
