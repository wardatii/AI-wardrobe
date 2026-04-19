import { RouterProvider } from "react-router";
import { router } from "./routes";
import { AuthProvider } from "./context/AuthContext";
import { WardrobeProvider } from "./context/WardrobeContext";

export default function App() {
  return (
    <AuthProvider>
      <WardrobeProvider>
        <RouterProvider router={router} />
      </WardrobeProvider>
    </AuthProvider>
  );
}