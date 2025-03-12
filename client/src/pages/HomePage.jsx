import React, { useState } from "react";
import Dashboard from "@/Components/Dashboard";
import Profile from "@/Components/Profile";
import Sidebar from "@/Components/Sidebar";
import Wallet from "@/Components/Wallet";
import Messages from "@/Components/Messages";

const HomePage = () => {
  const [activeTab, setActiveTab] = useState("dashboard");

  return (
    <div className="min-h-screen w-full bg-[#0A0A0A] flex text-white">
      <Sidebar setActiveTab={setActiveTab} activeTab={activeTab} />
        {activeTab === "dashboard" && <Dashboard />}
        {activeTab === "profile" && <Profile />}
        {activeTab === "wallet" && <Wallet />}
        {activeTab === "messages" && <Messages />}
    </div>
  );
};

export default HomePage;
