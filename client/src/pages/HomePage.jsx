import React, { useState } from "react";
import { useSelector } from "react-redux";
import Dashboard from "@/Components/Dashboard";
import InvestorHome from "@/Components/InvestorHome";
import Profile from "@/Components/Profile";
import Sidebar from "@/Components/Sidebar";
import Wallet from "@/Components/Wallet";
import Messages from "@/Components/Messages";

const HomePage = () => {
  const [activeTab, setActiveTab] = useState("dashboard");

  const {authUser} = useSelector((store)=>store.userStore);// Assuming user data is in Redux

  return (
    <div className="min-h-screen w-full bg-[#0A0A0A] flex text-white">
      <Sidebar setActiveTab={setActiveTab} activeTab={activeTab} />
      {activeTab === "dashboard" && (authUser?.user?.role === "Entrepreneur" ? <Dashboard /> : <InvestorHome />)}
      {activeTab === "profile" && <Profile />}
      {activeTab === "wallet" && <Wallet />}
      {activeTab === "messages" && <Messages />}
    </div>
  );
};

export default HomePage;
