

// "use client";

// import { useTheme } from "next-themes";
// import { useState, useEffect } from "react";
// import Navigation from "@/components/navigation";
// import { Button } from "@/components/ui/button";
// import Navbar from "@/components/ui/navbar";
// import { Moon, Sun, Bell, User, Shield, LogOut } from "lucide-react";

// interface Setting {
//   id: string;
//   label: string;
//   description: string;
//   type: "toggle" | "select";
//   value: boolean | string;
// }

// export default function SettingsPage() {
//   const { theme, setTheme } = useTheme();
//   const [mounted, setMounted] = useState(false);
//   const [settings, setSettings] = useState<Setting[]>([
//     {
//       id: "email-notifications",
//       label: "Email Notifications",
//       description: "Receive email updates about your progress and new features",
//       type: "toggle",
//       value: true,
//     },
//     {
//       id: "performance-alerts",
//       label: "Performance Alerts",
//       description: "Get notified when you reach certain performance milestones",
//       type: "toggle",
//       value: true,
//     },
//     {
//       id: "weekly-summary",
//       label: "Weekly Summary",
//       description: "Receive a weekly recap of your learning progress",
//       type: "toggle",
//       value: false,
//     },
//     {
//       id: "goal-reminder",
//       label: "Goal Reminder",
//       description: "Daily reminders to stay on track with your roadmap",
//       type: "toggle",
//       value: true,
//     },
//   ]);

//   useEffect(() => setMounted(true), []);
//   if (!mounted) return null;

//   const toggleSetting = (id: string) => {
//     setSettings(settings.map((s) => (s.id === id ? { ...s, value: !s.value } : s)));
//   };

//   return (
//     <div className="bg-background text-foreground min-h-screen">
//       {/* <Navigation />
//       <Navbar/> */}
//       <main className="md:ml-20 p-4 md:p-8">
//         <div className="max-w-3xl mx-auto">
//           {/* Header */}
//           <div className="space-y-2 border-b border-border pb-6 mb-8">
//             <h1 className="text-4xl font-bold tracking-tight text-foreground">Settings</h1>
//             <p className="text-muted-foreground">Customize your AI Career Copilot experience.</p>
//           </div>

//           {/* Account Section */}
//             <div className="glass rounded-2xl border border-border p-6">
//               <h2 className="text-xl font-semibold text-foreground mb-6 flex items-center gap-2">
//                 <User size={24} className="text-primary" />
//                 Account
//               </h2>

//               <div className="space-y-4">
//                 <div className="flex items-center justify-between p-4 bg-card/50 rounded-lg border border-border">
//                   <div>
//                     <p className="font-semibold text-foreground">Email Address</p>
//                     <p className="text-sm text-muted-foreground">sarah@example.com</p>
//                   </div>
//                   <Button variant="outline" size="sm">
//                     Change
//                   </Button>
//                 </div>

//                 <div className="flex items-center justify-between p-4 bg-card/50 rounded-lg border border-border">
//                   <div>
//                     <p className="font-semibold text-foreground">Password</p>
//                     <p className="text-sm text-muted-foreground">Last updated 3 months ago</p>
//                   </div>
//                   <Button variant="outline" size="sm">
//                     Update
//                   </Button>
//                 </div>
//               </div>
//             </div>

//           {/* ... your previous Account section ... */}

//           {/* ✅ Appearance Section (Updated for real dark/light toggle) */}
//           <div className="glass rounded-2xl border border-border p-6">
//             <h2 className="text-xl font-semibold text-foreground mb-6 flex items-center gap-2">
//               {theme === "dark" ? (
//                 <Moon size={24} className="text-primary" />
//               ) : (
//                 <Sun size={24} className="text-accent" />
//               )}
//               Appearance
//             </h2>

//             <div className="flex items-center justify-between p-4 bg-card/50 rounded-lg border border-border">
//               <div>
//                 <p className="font-semibold text-foreground">
//                   {theme === "dark" ? "Dark" : "Light"} Mode
//                 </p>
//                 <p className="text-sm text-muted-foreground">Choose your preferred theme</p>
//               </div>
//               <button
//                 onClick={() => setTheme(theme === "light" ? "dark" : "light")}
//                 className="px-4 py-2 rounded-lg bg-primary/20 hover:bg-primary/30 text-primary font-medium transition-colors"
//               >
//                 Toggle
//               </button>
//             </div>
//           </div>

//           {/* Notifications Section */}
//             <div className="glass rounded-2xl border border-border p-6">
//               <h2 className="text-xl font-semibold text-foreground mb-6 flex items-center gap-2">
//                 <Bell size={24} className="text-primary" />
//                 Notifications
//               </h2>

//               <div className="space-y-3">
//                 {settings.map((setting) => (
//                   <div
//                     key={setting.id}
//                     className="flex items-center justify-between p-4 bg-card/50 rounded-lg border border-border hover:bg-card/70 transition-colors"
//                   >
//                     <div>
//                       <p className="font-semibold text-foreground">{setting.label}</p>
//                       <p className="text-sm text-muted-foreground">{setting.description}</p>
//                     </div>
//                     <button
//                       onClick={() => toggleSetting(setting.id)}
//                       className={`relative w-12 h-6 rounded-full transition-colors ${
//                         setting.value ? "bg-primary" : "bg-muted"
//                       }`}
//                     >
//                       <div
//                         className={`absolute top-1 w-4 h-4 rounded-full bg-white transition-transform ${
//                           setting.value ? "translate-x-6" : "translate-x-1"
//                         }`}
//                       />
//                     </button>
//                   </div>
//                 ))}
//               </div>
//             </div>

//             {/* Privacy Section */}
//             <div className="glass rounded-2xl border border-border p-6">
//               <h2 className="text-xl font-semibold text-foreground mb-6 flex items-center gap-2">
//                 <Shield size={24} className="text-primary" />
//                 Privacy & Security
//               </h2>

//               <div className="space-y-3">
//                 <a
//                   href="#"
//                   className="block p-4 bg-card/50 rounded-lg border border-border hover:bg-card/70 transition-colors"
//                 >
//                   <p className="font-semibold text-primary hover:text-accent">Privacy Policy</p>
//                   <p className="text-sm text-muted-foreground mt-1">Review how we handle your data</p>
//                 </a>

//                 <a
//                   href="#"
//                   className="block p-4 bg-card/50 rounded-lg border border-border hover:bg-card/70 transition-colors"
//                 >
//                   <p className="font-semibold text-primary hover:text-accent">Terms of Service</p>
//                   <p className="text-sm text-muted-foreground mt-1">Read our terms and conditions</p>
//                 </a>

//                 <a
//                   href="#"
//                   className="block p-4 bg-card/50 rounded-lg border border-border hover:bg-card/70 transition-colors"
//                 >
//                   <p className="font-semibold text-primary hover:text-accent">Data Export</p>
//                   <p className="text-sm text-muted-foreground mt-1">Download your data</p>
//                 </a>
//               </div>
//             </div>

//             {/* Logout */}
//             <Button className="w-full bg-red-500/20 hover:bg-red-500/30 text-red-400 border border-red-500/50 font-semibold gap-2">
//               <LogOut size={18} />
//               Sign Out
//             </Button>
//         </div>
//       </main>
//     </div>
//   );
// }





"use client";

import { useTheme } from "next-themes";
import { useState, useEffect } from "react";
import { useAuth } from "@/contexts/auth-context";
import { Button } from "@/components/ui/button";
import { 
  Moon, Sun, User, Shield, LogOut, Camera, Lock, Mail, Save, Loader2 
} from "lucide-react";

export default function SettingsPage() {
  const { theme, setTheme } = useTheme();
  const { user, logout, updateUser } = useAuth(); // ✅ Get updateUser to refresh Navbar
  const [mounted, setMounted] = useState(false);
  
  // Form States
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    currentPassword: "",
    newPassword: ""
  });
  const [previewImage, setPreviewImage] = useState<string | null>(null);

  // Load user data when component mounts
  useEffect(() => {
    setMounted(true);
    if (user) {
      setFormData(prev => ({
        ...prev,
        fullName: user.name || "",
        email: user.email || ""
      }));
    }
  }, [user]);

  if (!mounted) return null;

  // Handle Text Input Changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // ✅ 1. HANDLE IMAGE UPLOAD (Convert to Base64 for DB)
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = reader.result as string;
        setPreviewImage(base64String);
      };
      reader.readAsDataURL(file);
    }
  };

  // ✅ 2. SAVE CHANGES TO BACKEND
  const handleSave = async () => {
    setIsLoading(true);
    const token = localStorage.getItem("token");
    const API_URL = "http://localhost:5000/api"; 

    try {
      // --- A. Update Profile Info ---
      const profileRes = await fetch(`${API_URL}/user/profile`, {
        method: "PUT",
        headers: { 
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}` 
        },
        body: JSON.stringify({
          fullName: formData.fullName,
          email: formData.email,
          photoURL: previewImage || user?.avatar 
        })
      });

      const profileData = await profileRes.json();
      if (!profileData.success) throw new Error(profileData.message);

      // --- B. Update Password (Optional) ---
      if (formData.currentPassword && formData.newPassword) {
        const passRes = await fetch(`${API_URL}/user/password`, {
          method: "PUT",
          headers: { 
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}` 
          },
          body: JSON.stringify({
            currentPassword: formData.currentPassword,
            newPassword: formData.newPassword
          })
        });
        
        const passData = await passRes.json();
        if (!passData.success) throw new Error(passData.message);
      }

      // --- C. Update Global State (Refreshes Navbar) ---
      // ✅ FIX: Map backend 'fullName' to context 'name' correctly
      if (updateUser) {
        updateUser({
          name: profileData.data.fullName, // This fixes the "User" name bug
          email: profileData.data.email,
          avatar: profileData.data.photoURL
        });
      }

      alert(" Profile updated successfully!");
      setFormData(prev => ({ ...prev, currentPassword: "", newPassword: "" }));

    } catch (err: any) {
      console.error(err);
      alert(`❌ Error: ${err.message || "Failed to update profile"}`);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-background text-foreground min-h-screen pb-20">
      <main className="max-w-3xl mx-auto p-4 md:p-8">
        
        {/* Header */}
        <div className="space-y-2 border-b border-border pb-6 mb-8">
          <h1 className="text-3xl md:text-4xl font-bold tracking-tight text-foreground">Settings</h1>
          <p className="text-muted-foreground">Manage your profile and account preferences.</p>
        </div>

        <div className="space-y-8">
          
          {/* --- 1. PROFILE PHOTO SECTION (Clickable) --- */}
          <div className="flex flex-col items-center justify-center space-y-4">
            <div className="relative group">
              {/* Hidden Input triggered by Label */}
              <input 
                type="file" 
                id="photo-upload" 
                className="hidden" 
                accept="image/*"
                onChange={handleImageUpload}
              />
              <label 
                htmlFor="photo-upload" 
                className="cursor-pointer block relative w-32 h-32 rounded-full overflow-hidden border-4 border-card shadow-lg hover:border-primary transition-colors"
              >
                <img 
                  src={previewImage || user?.avatar || `https://ui-avatars.com/api/?name=${formData.fullName}`} 
                  alt="Profile" 
                  className="w-full h-full object-cover"
                />
                {/* Hover Overlay with Icon */}
                <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                  <Camera className="text-white drop-shadow-md" size={32} />
                </div>
              </label>
            </div>
            <div className="text-center">
              <h2 className="text-xl font-bold text-foreground">{user?.name || "User"}</h2>
              <p className="text-sm text-muted-foreground">{user?.email || "email@example.com"}</p>
            </div>
          </div>

          {/* --- 2. PERSONAL INFORMATION --- */}
          <div className="glass rounded-2xl border border-border p-6 shadow-sm">
            <h2 className="text-lg font-semibold text-foreground mb-6 flex items-center gap-2">
              <User size={20} className="text-blue-500" />
              Personal Information
            </h2>

            <div className="space-y-4">
              <div className="grid gap-2">
                <label className="text-sm font-medium text-muted-foreground">Full Name</label>
                <input 
                  type="text" 
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleChange}
                  className="w-full p-3 bg-muted/30 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 text-foreground"
                  placeholder="Enter your full name"
                />
              </div>

              <div className="grid gap-2">
                <label className="text-sm font-medium text-muted-foreground">Email Address</label>
                <div className="relative">
                  <Mail size={18} className="absolute left-3 top-3.5 text-muted-foreground" />
                  <input 
                    type="email" 
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full p-3 pl-10 bg-muted/30 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 text-foreground"
                    placeholder="Enter your email"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* --- 3. SECURITY (Password) --- */}
          <div className="glass rounded-2xl border border-border p-6 shadow-sm">
            <h2 className="text-lg font-semibold text-foreground mb-6 flex items-center gap-2">
              <Lock size={20} className="text-amber-500" />
              Security
            </h2>

            <div className="space-y-4">
              <div className="grid gap-2">
                <label className="text-sm font-medium text-muted-foreground">Current Password</label>
                <input 
                  type="password" 
                  name="currentPassword"
                  value={formData.currentPassword}
                  onChange={handleChange}
                  className="w-full p-3 bg-muted/30 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 text-foreground"
                  placeholder="••••••••"
                />
              </div>

              <div className="grid gap-2">
                <label className="text-sm font-medium text-muted-foreground">New Password</label>
                <input 
                  type="password" 
                  name="newPassword"
                  value={formData.newPassword}
                  onChange={handleChange}
                  className="w-full p-3 bg-muted/30 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 text-foreground"
                  placeholder="Leave blank to keep current"
                />
              </div>
            </div>
          </div>

          {/* --- SAVE BUTTON --- */}
          <div className="flex justify-end">
            <Button 
              onClick={handleSave} 
              disabled={isLoading}
              className="bg-primary hover:bg-primary/90 text-primary-foreground px-8 py-2 h-11 shadow-lg shadow-primary/20"
            >
              {isLoading ? <Loader2 className="animate-spin mr-2" size={18} /> : <Save className="mr-2" size={18} />}
              Save Changes
            </Button>
          </div>

          {/* --- 4. APPEARANCE --- */}
          <div className="glass rounded-2xl border border-border p-6 shadow-sm mt-8">
            <h2 className="text-lg font-semibold text-foreground mb-6 flex items-center gap-2">
              {theme === "dark" ? <Moon size={20} className="text-purple-500" /> : <Sun size={20} className="text-orange-500" />}
              Appearance
            </h2>

            <div className="flex items-center justify-between p-4 bg-muted/30 rounded-lg border border-border/50">
              <div>
                <p className="font-semibold text-foreground">{theme === "dark" ? "Dark Mode" : "Light Mode"}</p>
                <p className="text-sm text-muted-foreground">Adjust the interface theme</p>
              </div>
              <button
                onClick={() => setTheme(theme === "light" ? "dark" : "light")}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 ${
                  theme === "dark" ? "bg-indigo-600" : "bg-gray-300"
                }`}
              >
                <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${theme === "dark" ? "translate-x-6" : "translate-x-1"}`} />
              </button>
            </div>
          </div>

          {/* --- 5. LOGOUT --- */}
          <Button 
            onClick={logout} 
            variant="destructive"
            className="w-full h-12 text-base font-semibold gap-2 shadow-sm mt-4"
          >
            <LogOut size={18} />
            Sign Out
          </Button>

        </div>
      </main>
    </div>
  );
}