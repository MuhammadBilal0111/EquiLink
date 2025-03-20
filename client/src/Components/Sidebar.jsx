import React from "react";
import { TbLayoutDashboardFilled } from "react-icons/tb";
import { MdWallet } from "react-icons/md";
import { BiSolidMessageSquareDetail } from "react-icons/bi";
import { FaUser } from "react-icons/fa";
import { useSelector } from "react-redux";

const Sidebar = ({ setActiveTab, activeTab }) => {
  const {authUser} = useSelector((store)=>store.userStore);// Assuming user data is in Redux
  const firstTabLabel = authUser?.user?.role === "Entrepreneur" ? "Dashboard" : "Home";

  return (
    <>
      {/* Sidebar */}
      <div className="w-1/5 bg-[#0A0A0A] border-r-1 border-r-[#3F3F3F] p-5 flex flex-col gap-6">
        <img src="FullLogo.png" alt="" className="w-[120px] h-[30px] ml-6" />
        <div className="flex justify-center mt-24 mr-4">
          <nav className="flex flex-col gap-10">
            <button
              onClick={() => setActiveTab("dashboard")}
              className={`flex cursor-pointer  items-center gap-8 ${
                activeTab === "dashboard" ? "text-[#b58bde] font-semibold" : "hover:text-gray-300"
              }`}
            >
              <TbLayoutDashboardFilled size={22} />
              {firstTabLabel}
            </button>

            <button
              onClick={() => setActiveTab("wallet")}
              className={`flex cursor-pointer  items-center gap-8 ${
                activeTab === "wallet" ? "text-[#b58bde] font-semibold" : "hover:text-gray-300"
              }`}
            >
              <MdWallet size={22} />
              Wallet
            </button>

            <button
              onClick={() => setActiveTab("messages")}
              className={`flex cursor-pointer  items-center gap-8 ${
                activeTab === "messages" ? "text-[#b58bde] font-semibold" : "hover:text-gray-300"
              }`}
            >
              <BiSolidMessageSquareDetail size={22} />
              Messages
            </button>

            <button
              onClick={() => setActiveTab("profile")}
              className={`flex cursor-pointer items-center gap-8 ${
                activeTab === "profile" ? "text-[#b58bde] font-semibold" : "hover:text-gray-300"
              }`}
            >
              <FaUser size={22} />
              Profile
            </button>
          </nav>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
