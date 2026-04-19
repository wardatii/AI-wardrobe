import { useState } from "react";
import { useNavigate } from "react-router";
import { useAuth } from "../../context/AuthContext";
import { Sparkles, ChevronRight } from "lucide-react";

export function Survey() {
  const [step, setStep] = useState(1);
  const [gender, setGender] = useState("");
  const [style, setStyle] = useState<string[]>([]);
  const [colors, setColors] = useState<string[]>([]);
  const navigate = useNavigate();
  const { completeProfile } = useAuth();

  const styleOptions = [
    "Casual",
    "Formal",
    "Sporty",
    "Bohemian",
    "Classic",
    "Trendy",
  ];

  const colorOptions = [
    { name: "Black", value: "black", bg: "bg-black" },
    { name: "White", value: "white", bg: "bg-white border-2" },
    { name: "Blue", value: "blue", bg: "bg-blue-600" },
    { name: "Red", value: "red", bg: "bg-red-600" },
    { name: "Green", value: "green", bg: "bg-green-600" },
    { name: "Pink", value: "pink", bg: "bg-pink-600" },
  ];

  const toggleSelection = (value: string, list: string[], setter: (val: string[]) => void) => {
    if (list.includes(value)) {
      setter(list.filter((v) => v !== value));
    } else {
      setter([...list, value]);
    }
  };

  const handleComplete = () => {
    completeProfile({
      gender,
      style,
      favoriteColors: colors,
    });
    navigate("/");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-50 via-white to-blue-50 p-4">
      <div className="w-full max-w-2xl">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-purple-600 to-blue-600 rounded-2xl mb-4">
            <Sparkles className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-3xl mb-2">Complete Your Profile</h1>
          <p className="text-muted-foreground">Help us personalize your experience</p>
        </div>

        <div className="bg-white rounded-2xl shadow-lg p-8">
          <div className="mb-6">
            <div className="flex gap-2">
              {[1, 2, 3].map((s) => (
                <div
                  key={s}
                  className={`h-2 flex-1 rounded-full transition-colors ${
                    s <= step ? "bg-gradient-to-r from-purple-600 to-blue-600" : "bg-muted"
                  }`}
                />
              ))}
            </div>
            <p className="text-sm text-muted-foreground mt-2">Step {step} of 3</p>
          </div>

          {step === 1 && (
            <div>
              <h2 className="text-2xl mb-4">What's your wardrobe preference?</h2>
              <div className="grid grid-cols-2 gap-4">
                {["women", "men"].map((g) => (
                  <button
                    key={g}
                    onClick={() => setGender(g)}
                    className={`p-6 border-2 rounded-xl transition-all ${
                      gender === g
                        ? "border-purple-600 bg-purple-50"
                        : "border-border hover:border-purple-300"
                    }`}
                  >
                    <div className="text-4xl mb-2">{g === "women" ? "👗" : "👔"}</div>
                    <p className="capitalize">{g}</p>
                  </button>
                ))}
              </div>
            </div>
          )}

          {step === 2 && (
            <div>
              <h2 className="text-2xl mb-4">Select your style preferences</h2>
              <p className="text-muted-foreground mb-4">Choose all that apply</p>
              <div className="grid grid-cols-2 gap-3">
                {styleOptions.map((s) => (
                  <button
                    key={s}
                    onClick={() => toggleSelection(s.toLowerCase(), style, setStyle)}
                    className={`p-4 border-2 rounded-xl transition-all ${
                      style.includes(s.toLowerCase())
                        ? "border-purple-600 bg-purple-50"
                        : "border-border hover:border-purple-300"
                    }`}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>
          )}

          {step === 3 && (
            <div>
              <h2 className="text-2xl mb-4">Choose your favorite colors</h2>
              <p className="text-muted-foreground mb-4">Select colors you prefer</p>
              <div className="grid grid-cols-3 gap-4">
                {colorOptions.map((c) => (
                  <button
                    key={c.value}
                    onClick={() => toggleSelection(c.value, colors, setColors)}
                    className={`p-6 border-2 rounded-xl transition-all ${
                      colors.includes(c.value)
                        ? "border-purple-600 bg-purple-50"
                        : "border-border hover:border-purple-300"
                    }`}
                  >
                    <div className={`w-12 h-12 rounded-full mx-auto mb-2 ${c.bg}`} />
                    <p>{c.name}</p>
                  </button>
                ))}
              </div>
            </div>
          )}

          <div className="flex justify-between mt-8">
            {step > 1 && (
              <button
                onClick={() => setStep(step - 1)}
                className="px-6 py-3 border border-border rounded-lg hover:bg-muted transition-colors"
              >
                Back
              </button>
            )}
            {step < 3 ? (
              <button
                onClick={() => setStep(step + 1)}
                disabled={
                  (step === 1 && !gender) ||
                  (step === 2 && style.length === 0)
                }
                className="ml-auto px-6 py-3 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-lg hover:from-purple-700 hover:to-blue-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
              >
                Next <ChevronRight className="w-5 h-5" />
              </button>
            ) : (
              <button
                onClick={handleComplete}
                disabled={colors.length === 0}
                className="ml-auto px-6 py-3 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-lg hover:from-purple-700 hover:to-blue-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Complete
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
