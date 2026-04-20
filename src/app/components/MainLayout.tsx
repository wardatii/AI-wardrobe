import { useEffect } from "react";
import { Outlet, useNavigate } from "react-router";
import { useAuth } from "../context/AuthContext";
import { Sidebar } from "./Sidebar";

export function MainLayout() {
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate("/welcome", { replace: true });
    } else if (user && !user.profileComplete) {
      navigate("/survey", { replace: true });
    }
  }, [user, navigate]);

  if (!user || !user.profileComplete) {
    return null;
  }

  return (
    <div className="flex h-screen overflow-hidden bg-background">
      <Sidebar />
      <div className="flex-1 overflow-auto">
        <Outlet />
      </div>
    </div>
  );
}

