import React from "react";
import { TbLayoutDashboardFilled } from "react-icons/tb";
import { MdWallet } from "react-icons/md";
import { BiSolidMessageSquareDetail } from "react-icons/bi";
import { FaUser } from "react-icons/fa";

const Dashboard = () => {
  return (
    <div className="h-screen w-full bg-[#0A0A0A] flex text-white">
      {/* Sidebar */}
      <div className="w-1/5 bg-[#0A0A0A] border-r-1 border-r-[#3F3F3F] p-6 flex flex-col gap-6">
        <img src="FullLogo.png" alt="" className="w-[120px] h-[30px] ml-6" />
        <div className="flex justify-center mt-24"> 
          <nav className="flex flex-col gap-10">
          <a href="#" className="hover:text-gray-300 flex items-center gap-8"><span><TbLayoutDashboardFilled size={22}/></span>Dashboard</a>
          <a href="#" className="hover:text-gray-300 flex items-center gap-8"><span><MdWallet size={22}/></span>Wallet</a>
          <a href="#" className="hover:text-gray-300 flex items-center  gap-8"><span><BiSolidMessageSquareDetail size={22}/></span>Messages</a>
          <a href="#" className="hover:text-gray-300 flex items-center gap-8"> <span><FaUser size={22}/></span>Profile</a>
        </nav></div>
        
      </div>

      {/* Main Content */}
      <div className="w-4/5 p-8">
        <div className="flex justify-self-end items-center">
          <button className="bg-[#262626] border text-md border-[#222124] text-white px-8 py-1 rounded-xl">
            Logout
          </button>
        </div>
        <h2 className="text-2xl">Welcome, Simrah!</h2>
        <p className="mt-2 text-gray-400">
          Let's check out the responses of investors. How they respond to your pitch.
        </p>

        
        
        {/* Pitches Section */}
        <div className="mt-6 flex justify-between border-t border-t-[#3F3F3F] py-4">
          <h3 className="text-lg">Your Pitches</h3>
          <button className="mt-2 text-sm bg-gradient-to-r from-[#D1B0D4] via-[#8B68AD] to-[#5A3592] px-10 py-1.5 rounded-sm">
            + Add New Pitch
          </button>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
