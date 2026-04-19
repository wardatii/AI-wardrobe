import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { User, Lock, Mail, Settings, FileText } from "lucide-react";

export function Profile() {
  const { user } = useAuth();
  const [activeSection, setActiveSection] = useState<string | null>(null);

  const profileSections = [
    {
      id: "manage",
      title: "Profile Management",
      icon: User,
      description: "View and edit personal information",
    },
    {
      id: "password",
      title: "Change Password",
      icon: Lock,
      description: "Update your account password",
    },
    {
      id: "preferences",
      title: "Preferences & Info",
      icon: Settings,
      description: "Edit style choices and preferences",
    },
    {
      id: "email",
      title: "Email Change",
      icon: Mail,
      description: "Update contact information",
    },
    {
      id: "survey",
      title: "Retake Survey",
      icon: FileText,
      description: "Update your style profile",
    },
  ];

  return (
    <div className="p-8">
      <h1 className="text-3xl mb-8">Profile Settings</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {profileSections.map((section) => (
          <button
            key={section.id}
            onClick={() => setActiveSection(section.id)}
            className="bg-card border border-border rounded-xl p-6 hover:shadow-lg transition-all text-left group"
          >
            <div className="flex items-start gap-4">
              <div className="p-3 bg-gradient-to-br from-purple-100 to-blue-100 rounded-lg group-hover:from-purple-200 group-hover:to-blue-200 transition-colors">
                <section.icon className="w-6 h-6 text-purple-600" />
              </div>
              <div>
                <h3 className="mb-1">{section.title}</h3>
                <p className="text-sm text-muted-foreground">
                  {section.description}
                </p>
              </div>
            </div>
          </button>
        ))}
      </div>

      {activeSection === "manage" && (
        <div className="mt-8 bg-card border border-border rounded-xl p-6">
          <h2 className="text-xl mb-4">Profile Information</h2>
          <div className="space-y-4">
            <div>
              <label className="block mb-2">Full Name</label>
              <input
                type="text"
                defaultValue={user?.name}
                className="w-full px-4 py-3 border border-border rounded-lg bg-input-background focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>
            <div>
              <label className="block mb-2">Email</label>
              <input
                type="email"
                defaultValue={user?.email}
                className="w-full px-4 py-3 border border-border rounded-lg bg-input-background focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>
            <button className="px-6 py-3 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-lg hover:from-purple-700 hover:to-blue-700 transition-all">
              Save Changes
            </button>
          </div>
        </div>
      )}

      {activeSection === "password" && (
        <div className="mt-8 bg-card border border-border rounded-xl p-6">
          <h2 className="text-xl mb-4">Change Password</h2>
          <div className="space-y-4">
            <div>
              <label className="block mb-2">Current Password</label>
              <input
                type="password"
                className="w-full px-4 py-3 border border-border rounded-lg bg-input-background focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>
            <div>
              <label className="block mb-2">New Password</label>
              <input
                type="password"
                className="w-full px-4 py-3 border border-border rounded-lg bg-input-background focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>
            <div>
              <label className="block mb-2">Confirm New Password</label>
              <input
                type="password"
                className="w-full px-4 py-3 border border-border rounded-lg bg-input-background focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>
            <button className="px-6 py-3 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-lg hover:from-purple-700 hover:to-blue-700 transition-all">
              Update Password
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
