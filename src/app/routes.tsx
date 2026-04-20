import { createHashRouter, Navigate } from "react-router";
import { MainLayout } from "./components/MainLayout";
import { Dashboard } from "./components/Dashboard";
import { LandingPage } from "./components/LandingPage";
import { Login } from "./components/auth/Login";
import { Register } from "./components/auth/Register";
import { Survey } from "./components/auth/Survey";
import { WomenWardrobe } from "./components/wardrobe/WomenWardrobe";
import { MenWardrobe } from "./components/wardrobe/MenWardrobe";
import { AISuggestions } from "./components/AISuggestions";
import { Profile } from "./components/Profile";
import { AIChat } from "./components/AIChat";

export const router = createHashRouter([
  {
    // Root redirects to landing page
    path: "/",
    element: <Navigate to="/welcome" replace />,
  },
  {
    path: "/welcome",
    Component: LandingPage,
  },
  {
    path: "/login",
    Component: Login,
  },
  {
    path: "/register",
    Component: Register,
  },
  {
    path: "/survey",
    Component: Survey,
  },
  {
    path: "/app",
    Component: MainLayout,
    children: [
      { index: true, Component: Dashboard },
      { path: "women", Component: WomenWardrobe },
      { path: "men", Component: MenWardrobe },
      { path: "ai-suggestions", Component: AISuggestions },
      { path: "ai-chat", Component: AIChat },
      { path: "profile", Component: Profile },
    ],
  },
  {
    // Catch-all: redirect unknown URLs to welcome
    path: "*",
    element: <Navigate to="/welcome" replace />,
  },
]);
