import React from "react";
import { TbLayoutDashboardFilled } from "react-icons/tb";
import { MdWallet } from "react-icons/md";
import { BiSolidMessageSquareDetail } from "react-icons/bi";
import { FaUser } from "react-icons/fa";
import { GoGlobe } from "react-icons/go";
import { MdLogout } from "react-icons/md";
import { FaBitcoin } from "react-icons/fa6";
import { useDispatch, useSelector } from "react-redux";
import { userActions } from "@/store";
import { axiosInstance } from "@/lib/axios";
import { toast } from "sonner";

const Sidebar = ({ setActiveTab, activeTab }) => {
  const { authUser } = useSelector((store) => store.userStore);
  const dispatch = useDispatch()
  const userRole = authUser?.user?.role;
  const firstTabLabel = userRole === "Entrepreneur" ? "Dashboard" : "Home";


  const logout = async ()=>{
    setActiveTab("logout")
    try{
      const res = await axiosInstance.post("/auth/logout")
      if(res.data.status == true){
        dispatch(userActions.setUser(null));
        toast.success(res.data.message)
      }
      else{
        toast.error("Something went wrong")
      }
    }
    catch(err){
      toast.error("Something went wrong")
    }
  }

  return (
    <>
      {/* Sidebar */}
      <div className="fixed left-0 top-0 h-screen w-1/6 bg-[#0A0A0A] border-r border-[#3F3F3F] p-3 flex flex-col gap-6">
        <img src="FullLogo.png" alt="" className="w-[120px] h-[30px] ml-2" />

        {/* Navigation Buttons */}
        <div className="flex justify-center mt-22 mr-4">
          <nav className="flex flex-col gap-8">
            <button
              onClick={() => setActiveTab("dashboard")}
              className={`flex cursor-pointer items-center gap-8 text-[14px] ${
                activeTab === "dashboard" ? "text-[#b58bde] font-semibold" : "hover:text-gray-300"
              }`}
            >
              <TbLayoutDashboardFilled size={19} />
              {firstTabLabel}
            </button>

            <button
              onClick={() => setActiveTab("wallet")}
              className={`flex cursor-pointer items-center gap-8 text-[14px] ${
                activeTab === "wallet" ? "text-[#b58bde] font-semibold" : "hover:text-gray-300"
              }`}
            >
              <MdWallet size={19} />
              Wallet
            </button>

            <button
              onClick={() => setActiveTab("messages")}
              className={`flex cursor-pointer items-center gap-8 text-[14px] ${
                activeTab === "messages" ? "text-[#b58bde] font-semibold" : "hover:text-gray-300"
              }`}
            >
              <BiSolidMessageSquareDetail size={19} />
              Messages
            </button>


            {/* Conditional Buttons */}
            {userRole === "Entrepreneur" && (
              <button
                onClick={() => setActiveTab("community")}
                className={`flex cursor-pointer items-center gap-8 text-[14px] ${
                  activeTab === "community" ? "text-[#b58bde] font-semibold" : "hover:text-gray-300"
                }`}
              >
                <GoGlobe size={19} />
                Community
              </button>
            )}

            {userRole === "Investor" && (
              <button
                onClick={() => setActiveTab("invested-pitches")}
                className={`flex cursor-pointer items-center gap-8 text-[14px] ${
                  activeTab === "invested-pitches" ? "text-[#b58bde] font-semibold" : "hover:text-gray-300"
                }`}
              >
                <FaBitcoin size={19} />
                Invested Pitches
              </button>
            )}

            <button
              onClick={() => setActiveTab("profile")}
              className={`flex cursor-pointer items-center gap-8 text-[14px] ${
                activeTab === "profile" ? "text-[#b58bde] font-semibold" : "hover:text-gray-300"
              }`}
            >
              <FaUser size={19} />
              Profile
            </button>
          </nav>
        </div>

        {/* Logout Button at Bottom */}
        <button
          onClick={()=>logout()}
          className="flex cursor-pointer items-center gap-6 text-[15px] mt-26 ml-[30px] hover:text-gray-300"
        >
          <MdLogout size={19} />
          Logout
        </button>
      </div>
    </>
  );
};

export default Sidebar;
