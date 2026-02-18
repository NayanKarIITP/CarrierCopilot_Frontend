
"use client";

import { useTheme } from "next-themes";
import { useState, useEffect } from "react";
import { useAuth } from "@/contexts/auth-context";
import api from "@/lib/api"; 
import { Button } from "@/components/ui/button";
import {
  Moon, Sun, User, LogOut, Camera, Lock, Mail, Save, Loader2
} from "lucide-react";

export default function SettingsPage() {
  const { theme, setTheme } = useTheme();
  const { user, logout, updateUser } = useAuth();
  const [mounted, setMounted] = useState(false);

  const [isLoading, setIsLoading] = useState(false);
  const [previewImage, setPreviewImage] = useState<string | null>(null);

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    currentPassword: "",
    newPassword: "",
  });

  useEffect(() => {
    setMounted(true);
    if (user) {
      setFormData((prev) => ({
        ...prev,
        fullName: user.name || "",
        email: user.email || "",
      }));
    }
  }, [user]);

  if (!mounted) return null;

  /* HANDLERS */

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      setPreviewImage(reader.result as string);
    };
    reader.readAsDataURL(file);
  };

  /* ---------- SAVE ---------- */

  const handleSave = async () => {
    setIsLoading(true);
    try {
      // 1️⃣ Update profile
      const profileRes = await api.put("/user/profile", {
        fullName: formData.fullName,
        email: formData.email,
        photoURL: previewImage || user?.avatar,
      });

      if (!profileRes.data?.success) {
        throw new Error(profileRes.data?.message || "Profile update failed");
      }

      // 2️⃣ Update password (optional)
      if (formData.currentPassword && formData.newPassword) {
        const passRes = await api.put("/user/password", {
          currentPassword: formData.currentPassword,
          newPassword: formData.newPassword,
        });

        if (!passRes.data?.success) {
          throw new Error(passRes.data?.message || "Password update failed");
        }
      }

      // 3️⃣ Update global auth state (Navbar refresh)
      updateUser({
        name: profileRes.data.data.fullName,
        email: profileRes.data.data.email,
        avatar: profileRes.data.data.photoURL,
      });

      alert("✅ Profile updated successfully");
      setFormData((p) => ({ ...p, currentPassword: "", newPassword: "" }));

    } catch (err: any) {
      console.error(err);
      alert(`❌ ${err.message || "Failed to update profile"}`);
    } finally {
      setIsLoading(false);
    }
  };

  /* UI  */

  return (
    <div className="min-h-screen bg-background text-foreground pb-20">
      <main className="max-w-3xl mx-auto p-4 md:p-8">

        {/* HEADER */}
        <div className="border-b border-border pb-6 mb-8">
          <h1 className="text-4xl font-bold">Settings</h1>
          <p className="text-muted-foreground">Manage your profile and preferences</p>
        </div>

        <div className="space-y-8">

          {/* PROFILE IMAGE */}
          <div className="flex flex-col items-center gap-4">
            <input
              type="file"
              id="photo-upload"
              className="hidden"
              accept="image/*"
              onChange={handleImageUpload}
            />

            <label
              htmlFor="photo-upload"
              className="relative w-32 h-32 rounded-full overflow-hidden cursor-pointer border-4 border-border"
            >
              <img
                src={previewImage || user?.avatar || `https://ui-avatars.com/api/?name=${formData.fullName}`}
                className="w-full h-full object-cover"
                alt="Profile"
              />
              <div className="absolute inset-0 bg-black/40 opacity-0 hover:opacity-100 flex items-center justify-center transition">
                <Camera className="text-white" size={32} />
              </div>
            </label>

            <div className="text-center">
              <h2 className="text-xl font-bold">{user?.name}</h2>
              <p className="text-muted-foreground">{user?.email}</p>
            </div>
          </div>

          {/* PERSONAL INFO */}
          <div className="glass p-6 rounded-2xl border border-border">
            <h3 className="text-lg font-semibold flex items-center gap-2 mb-4">
              <User /> Personal Info
            </h3>

            <input
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
              placeholder="Full Name"
              className="w-full p-3 rounded-lg bg-muted/30 border border-border mb-4"
            />

            <div className="relative">
              <Mail size={18} className="absolute left-3 top-3.5 text-muted-foreground" />
              <input
                name="email"
                value={formData.email}
                disabled
                className="w-full p-3 pl-10 rounded-lg bg-muted/30 border border-border opacity-70 cursor-not-allowed"
              />

            </div>
          </div>

          {/* SECURITY */}
          <div className="glass p-6 rounded-2xl border border-border">
            <h3 className="text-lg font-semibold flex items-center gap-2 mb-4">
              <Lock /> Security
            </h3>

            <input
              type="password"
              name="currentPassword"
              placeholder="Current Password"
              value={formData.currentPassword}
              onChange={handleChange}
              className="w-full p-3 rounded-lg bg-muted/30 border border-border mb-4"
            />

            <input
              type="password"
              name="newPassword"
              placeholder="New Password"
              value={formData.newPassword}
              onChange={handleChange}
              className="w-full p-3 rounded-lg bg-muted/30 border border-border"
            />
          </div>

          {/* SAVE */}
          <div className="flex justify-end">
            <Button onClick={handleSave} disabled={isLoading}>
              {isLoading ? <Loader2 className="animate-spin mr-2" /> : <Save className="mr-2" />}
              Save Changes
            </Button>
          </div>

          {/* THEME */}
          <div className="glass p-6 rounded-2xl border border-border">
            <h3 className="text-lg font-semibold flex items-center gap-2 mb-4">
              {theme === "dark" ? <Moon /> : <Sun />} Appearance
            </h3>

            <button
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              className="px-4 py-2 rounded-lg bg-muted"
            >
              Switch to {theme === "dark" ? "Light" : "Dark"} Mode
            </button>
          </div>

          {/* LOGOUT */}
          <Button variant="destructive" onClick={logout} className="w-full">
            <LogOut className="mr-2" /> Sign Out
          </Button>

        </div>
      </main>
    </div>
  );
}
