import React from "react";
import { TbLayoutDashboardFilled } from "react-icons/tb";
import { MdWallet } from "react-icons/md";
import { BiSolidMessageSquareDetail } from "react-icons/bi";
import { FaUser } from "react-icons/fa";
import InputField from "./elements/InputField";
import Button from "./elements/Button";

const Profile = () => {
  return (
    <div className="w-full bg-[#0A0A0A] flex text-white">
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



        {/* profile */}

        <div className="flex flex-col justify-center items-center mt-10 gap-7">
            <div className="w-30 h-30 rounded-[40rem] bg-gray-600"></div>
            <div className="flex justify-around gap-14 mt-10">
                <InputField label={"Name"} placeholder={"Enter your full name"}></InputField>
                <InputField label={"Email"} placeholder={"Enter your email"}></InputField>
            </div>
            <div className="flex justify-around gap-14">
                <InputField label={"Phone"} placeholder={"Enter your phone number"}></InputField>
                <InputField label={"CNIC"} placeholder={"Enter your CNIC number"}></InputField>
            </div>
            <div className="flex justify-around gap-14">
                <InputField label={"Address"} placeholder={"Enter your address"}></InputField>
                <InputField label={"City"} placeholder={"Enter your city"}></InputField>
            </div>
            <div className="flex gap-[30rem] items-center">
                <InputField label={"CNIC picture"} type={"file"} className={"h-[5rem] w-[5rem] rounded-2xl cursor-pointer"}></InputField>
                <Button name={"Save changes"} className={"h-[2.5rem] w-[10rem]"}></Button>
            </div>
        </div>



        <div className="flex flex-col justify-center items-center mt-10 gap-7">
            <h3 className="text-lg self-start">Password settings</h3>
            <div className="flex justify-around gap-14">
                <InputField label={"Old password"} placeholder={"Enter old password"}></InputField>
                <InputField label={"New password"} placeholder={"Enter new password"}></InputField>
            </div>
            <div className="flex gap-[30rem] items-center">
                <InputField label={"CNIC picture"} type={"file"} className={"h-[5rem] w-[5rem] rounded-2xl cursor-pointer"}></InputField>
                <Button name={"Save changes"} className={"h-[2.5rem] w-[10rem]"}></Button>
            </div>
        </div>


        
    
      </div>
    </div>
  );
};

export default Profile;
