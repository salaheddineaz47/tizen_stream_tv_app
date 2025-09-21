"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { TVLayout } from "@/components/tv-layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  ArrowLeft,
  User,
  Settings,
  LogOut,
  Edit3,
  Save,
  X,
} from "lucide-react";

interface UserProfile {
  id: string;
  name: string;
  email: string;
  avatar: string;
  preferences: {
    theme: string;
    language: string;
    autoplay: boolean;
    quality: string;
  };
}

export default function ProfilePage() {
  const router = useRouter();
  const [user, setUser] = useState<UserProfile | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editForm, setEditForm] = useState({
    name: "",
    email: "",
  });
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    // Load user data from localStorage (in real app, this would be from API/auth context)
    const userData = localStorage.getItem("user");
    if (userData) {
      const parsedUser = JSON.parse(userData);
      setUser(parsedUser);
      setEditForm({
        name: parsedUser.name,
        email: parsedUser.email,
      });
    } else {
      // Redirect to login if no user data
      // router.push("/login");
    }
  }, [router]);

  const handleBack = () => {
    router.back();
  };

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleCancelEdit = () => {
    setIsEditing(false);
    if (user) {
      setEditForm({
        name: user.name,
        email: user.email,
      });
    }
  };

  const handleSave = async () => {
    if (!user) return;

    setIsLoading(true);
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));

      const updatedUser = {
        ...user,
        name: editForm.name,
        email: editForm.email,
      };

      localStorage.setItem("user", JSON.stringify(updatedUser));
      setUser(updatedUser);
      setIsEditing(false);
    } catch (error) {
      console.error("Failed to update profile:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("user");
    router.push("/login");
  };

  const handlePreferenceChange = (key: string, value: any) => {
    if (!user) return;

    const updatedUser = {
      ...user,
      preferences: {
        ...user.preferences,
        [key]: value,
      },
    };

    localStorage.setItem("user", JSON.stringify(updatedUser));
    setUser(updatedUser);
  };

  if (!user) {
    return (
      <TVLayout backgroundImage="/cinematic-dark-streaming-background.jpg">
        <div className="min-h-screen flex items-center justify-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
        </div>
      </TVLayout>
    );
  }

  return (
    <TVLayout backgroundImage="/cinematic-dark-streaming-background.jpg">
      <div className="min-h-screen p-8 relative z-10">
        <div className="flex items-center justify-between mb-12">
          <Button
            variant="ghost"
            size="lg"
            className="text-white hover:bg-white/10 backdrop-blur-sm border border-white/20 px-6"
            onClick={handleBack}
          >
            <ArrowLeft className="w-5 h-5 mr-3" />
            Back
          </Button>

          <h1 className="text-3xl font-light text-white tracking-wide">
            Profile Settings
          </h1>

          <Button
            variant="ghost"
            size="lg"
            className="text-white hover:bg-white/10 backdrop-blur-sm border border-white/20 px-6"
            onClick={handleLogout}
          >
            <LogOut className="w-5 h-5 mr-3" />
            Sign Out
          </Button>
        </div>

        <div className="max-w-4xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Profile Information */}
          <div className="glassmorphism rounded-2xl p-8 border border-white/20">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-xl font-light text-white tracking-wide">
                Profile Information
              </h2>
              {!isEditing ? (
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-white hover:bg-white/10"
                  onClick={handleEdit}
                >
                  <Edit3 className="w-4 h-4 mr-2" />
                  Edit
                </Button>
              ) : (
                <div className="flex gap-2">
                  <Button
                    variant="ghost"
                    size="sm"
                    className="text-white hover:bg-white/10"
                    onClick={handleCancelEdit}
                  >
                    <X className="w-4 h-4 mr-2" />
                    Cancel
                  </Button>
                  <Button
                    size="sm"
                    className="bg-primary hover:bg-primary/90"
                    onClick={handleSave}
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent mr-2"></div>
                    ) : (
                      <Save className="w-4 h-4 mr-2" />
                    )}
                    Save
                  </Button>
                </div>
              )}
            </div>

            <div className="space-y-6">
              <div className="flex items-center justify-center mb-8">
                <div className="w-24 h-24 rounded-full bg-primary/20 border-2 border-primary/40 flex items-center justify-center">
                  <User className="w-12 h-12 text-primary" />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-white/80 text-sm font-light tracking-wide">
                  Full Name
                </label>
                {isEditing ? (
                  <Input
                    value={editForm.name}
                    onChange={(e) =>
                      setEditForm((prev) => ({ ...prev, name: e.target.value }))
                    }
                    className="glassmorphism text-white border-white/20 focus:border-primary/60"
                  />
                ) : (
                  <p className="text-white text-lg font-light">{user.name}</p>
                )}
              </div>

              <div className="space-y-2">
                <label className="text-white/80 text-sm font-light tracking-wide">
                  Email Address
                </label>
                {isEditing ? (
                  <Input
                    value={editForm.email}
                    onChange={(e) =>
                      setEditForm((prev) => ({
                        ...prev,
                        email: e.target.value,
                      }))
                    }
                    className="glassmorphism text-white border-white/20 focus:border-primary/60"
                  />
                ) : (
                  <p className="text-white text-lg font-light">{user.email}</p>
                )}
              </div>
            </div>
          </div>

          {/* Preferences */}
          <div className="glassmorphism rounded-2xl p-8 border border-white/20">
            <div className="flex items-center mb-8">
              <Settings className="w-6 h-6 text-primary mr-3" />
              <h2 className="text-xl font-light text-white tracking-wide">
                Preferences
              </h2>
            </div>

            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <label className="text-white font-light">Autoplay</label>
                  <p className="text-white/60 text-sm font-light">
                    Automatically play next episode
                  </p>
                </div>
                <Button
                  variant={user.preferences.autoplay ? "default" : "secondary"}
                  size="sm"
                  onClick={() =>
                    handlePreferenceChange(
                      "autoplay",
                      !user.preferences.autoplay
                    )
                  }
                >
                  {user.preferences.autoplay ? "On" : "Off"}
                </Button>
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <label className="text-white font-light">Video Quality</label>
                  <p className="text-white/60 text-sm font-light">
                    Default playback quality
                  </p>
                </div>
                <select
                  value={user.preferences.quality}
                  onChange={(e) =>
                    handlePreferenceChange("quality", e.target.value)
                  }
                  className="glassmorphism text-white rounded-lg px-4 py-2 text-sm border border-white/20"
                >
                  <option value="auto">Auto</option>
                  <option value="1080p">1080p</option>
                  <option value="720p">720p</option>
                  <option value="480p">480p</option>
                </select>
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <label className="text-white font-light">Language</label>
                  <p className="text-white/60 text-sm font-light">
                    Interface language
                  </p>
                </div>
                <select
                  value={user.preferences.language}
                  onChange={(e) =>
                    handlePreferenceChange("language", e.target.value)
                  }
                  className="glassmorphism text-white rounded-lg px-4 py-2 text-sm border border-white/20"
                >
                  <option value="en">English</option>
                  <option value="es">Español</option>
                  <option value="fr">Français</option>
                  <option value="de">Deutsch</option>
                </select>
              </div>
            </div>
          </div>
        </div>
      </div>
    </TVLayout>
  );
}
