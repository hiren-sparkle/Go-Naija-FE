import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { LogOut, User, ShieldCheck, Trash2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Sidebar from "@/components/layout/Sidebar";
import TopBar from "@/components/layout/TopBar";
import { toast } from "@/components/ui/use-toast";

const API_BASE_URL = import.meta.env.VITE_API_URL; // Set this in .env

const AccountPage = () => {
  const [user, setUser] = useState<{ name: string; email: string } | null>(null);
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const navigate = useNavigate();

  

  const handlePasswordReset = async () => {
    try {
      const token = localStorage.getItem("token");
  
      const res = await axios.put(
        "http://localhost:5001/api/auth/change-password",
        { oldPassword, newPassword },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      toast({
        title:"Success",
        description: "Password updated successfully!",
        variant:"default"
      });
  
      // Clear the password fields after a successful update
      setOldPassword("");
      setNewPassword("");
    } catch (error) {
      console.error("Error changing password:", error);
      toast({
        title:"Error",
        description: "Failed to update password. Please try again.",
        variant: "destructive"
      });
    }
  };
  
  
  const handleDeleteAccount = async () => {
    const isConfirmed = window.confirm("Are you sure you want to delete your account? This action is irreversible!");
  
    if (!isConfirmed) return;
  
    try {
      const token = localStorage.getItem("token");
      await axios.delete(`http://localhost:5001/api/auth/delete`, {
        headers: { Authorization: `Bearer ${token}` },
      });
  
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      toast({
        title:"Success",
        description: "Account deleted successfully!",
        variant:"default"
      });
      navigate("/signup");
    } catch (error) {
        toast({
            title:"Error",
            description: "Failed to delete account. Please try again.",
            variant: "destructive"
        })
    }
  };
  

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
  };

  return (
    <div className="min-h-screen bg-black text-white flex">
    {/* Sidebar */}
    <Sidebar />

    {/* Main Content */}
    <div className="flex-1 flex flex-col">
      <TopBar />

      <main className="flex justify-center items-center py-12 px-6 pl-64">
        <div className="w-full max-w-lg bg-gray-900 rounded-lg shadow-lg p-8 border border-gray-700">
          <Tabs defaultValue="security">
            <TabsList className="grid grid-cols-2 bg-gray-800 text-white rounded-lg mb-6">
              <TabsTrigger value="security" className="p-3 rounded-lg">
                Security
              </TabsTrigger>
              <TabsTrigger value="delete" className="p-3 rounded-lg">
                Delete
              </TabsTrigger>
            </TabsList>

            {/* Security Section - Change Password */}
            <TabsContent value="security">
              <div className="p-6 rounded-lg bg-gray-800">
                <div className="flex items-center space-x-3 mb-4">
                  <ShieldCheck className="h-8 w-8 text-music-accent" />
                  <h2 className="text-xl font-semibold">Change Password</h2>
                </div>
                <div className="mt-4">
                  <label className="text-sm text-gray-300">Old Password</label>
                  <Input
                    type="password"
                    value={oldPassword}
                    onChange={(e) => setOldPassword(e.target.value)}
                    className="bg-gray-700 border-none mt-1 text-white"
                  />
                </div>
                <div className="mt-4">
                  <label className="text-sm text-gray-300">New Password</label>
                  <Input
                    type="password"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    className="bg-gray-700 border-none mt-1 text-white"
                  />
                </div>
                <Button
                  onClick={handlePasswordReset}
                  className="mt-6 w-full bg-music-accent text-white hover:bg-music-accent-dark"
                >
                  Update Password
                </Button>
              </div>
            </TabsContent>

            {/* Delete Account Section */}
            <TabsContent value="delete">
              <div className="p-6 rounded-lg bg-gray-800">
                <div className="flex items-center space-x-3 mb-4">
                  <Trash2 className="h-8 w-8 text-red-500" />
                  <h2 className="text-xl font-semibold text-red-500">
                    Delete Account
                  </h2>
                </div>
                <p className="text-sm text-gray-400">
                  This action is permanent and cannot be undone.
                </p>
                <Button
                  onClick={handleDeleteAccount}
                  className="mt-6 w-full bg-red-600 hover:bg-red-700 text-white"
                >
                  Delete Account
                </Button>
              </div>
            </TabsContent>
          </Tabs>

         
        </div>
      </main>
    </div>
  </div>
  );
};

export default AccountPage;
