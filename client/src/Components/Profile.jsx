import React, { useState } from "react";
import { TbLayoutDashboardFilled } from "react-icons/tb";
import { MdWallet } from "react-icons/md";
import { BiSolidMessageSquareDetail } from "react-icons/bi";
import { FaUser } from "react-icons/fa";
import { IoMdCloseCircle } from "react-icons/io";
import InputField from "./elements/InputField";
import Button from "./elements/Button";

const Profile = () => {
  const [profileImage, setProfileImage] = useState(null);
  const [cnicImages, setCnicImages] = useState([]);

  const handleProfileImageChange = (event) => {
    if (event.target.files.length > 0) {
      setProfileImage(URL.createObjectURL(event.target.files[0]));
    }
  };

  const removeProfileImage = () => {
    setProfileImage(null);
  };

  const handleCnicImageChange = (event) => {
    if (event.target.files.length > 0) {
      setCnicImages([...cnicImages, ...Array.from(event.target.files).map(file => URL.createObjectURL(file))]);
    }
  };

  const removeCnicImage = (index) => {
    setCnicImages(cnicImages.filter((_, i) => i !== index));
  };

  return (
    <div className="w-full bg-[#0A0A0A] flex text-white">
      {/* Sidebar */}
      <div className="w-1/5 bg-[#0A0A0A] border-r-1 border-r-[#3F3F3F] p-6 flex flex-col gap-6">
        <img src="FullLogo.png" alt="Logo" className="w-[120px] h-[30px] ml-6" />
        <div className="flex justify-center mt-24"> 
          <nav className="flex flex-col gap-10">
            <a href="#" className="hover:text-gray-300 flex items-center gap-8"><TbLayoutDashboardFilled size={22}/>Dashboard</a>
            <a href="#" className="hover:text-gray-300 flex items-center gap-8"><MdWallet size={22}/>Wallet</a>
            <a href="#" className="hover:text-gray-300 flex items-center gap-8"><BiSolidMessageSquareDetail size={22}/>Messages</a>
            <a href="#" className="hover:text-gray-300 flex items-center gap-8"><FaUser size={22}/>Profile</a>
          </nav>
        </div>
      </div>

      {/* Main Content */}
      <div className="w-4/5 p-8">
        <div className="flex justify-end items-center">
          <button className="bg-[#262626] border text-md border-[#222124] text-white px-8 py-1 rounded-xl">
            Logout
          </button>
        </div>
        <h2 className="text-2xl">Welcome, Simrah!</h2>

        {/* Profile Section */}
        <div className="flex flex-col justify-center items-center mt-8 gap-7 border-t border-t-[#3F3F3F] py-4">
          <label htmlFor="upload-profile" className="relative">
            <div className="w-30 h-30 rounded-full bg-gray-600 flex items-center justify-center cursor-pointer">
              {profileImage ? (
                <>
                  <img src={profileImage} alt="Profile" className="w-full h-full object-cover rounded-full" />
                  <IoMdCloseCircle className="absolute top-0 right-2 m-2 text-xl text-white cursor-pointer" onClick={removeProfileImage} />
                </>
              ) : (
                <img src="Camera.png" alt="Camera" className="w-14" />
              )}
            </div>
          </label>
          <input type="file" id="upload-profile" className="hidden" onChange={handleProfileImageChange} />
          
          <div className="flex justify-around gap-x-14">
            <InputField label="Full Name" placeholder="Enter your full name" className="w-100" />
            <InputField label="Email Address" placeholder="Enter your email address" className="w-100" />
          </div>
          <div className="flex justify-around gap-x-14">
            <InputField label="Phone Number" placeholder="Enter your phone number" className="w-100" />
            <InputField label="CNIC Number" placeholder="Enter your CNIC number" className="w-100" />
          </div>
          <div className="flex justify-around gap-x-14">
            <InputField label="Residential Address" placeholder="Enter your address" className="w-100" />
            <InputField label="City" placeholder="Enter your city" className="w-100" />
          </div>

          {/* CNIC Upload */}
          <div className="flex w-[90%] items-center justify-between">
          <div>
            <h2 className="text-sm mb-2">Upload CNIC</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-5 items-center">
              <label htmlFor="upload-cnic">
                <div className="border rounded-xl border-dotted border-primary bg-blue-100 h-[80px] w-[80px] cursor-pointer hover:shadow-md flex items-center justify-center">
                  <h2 className="text-2xl text-primary">+</h2>
                </div>
              </label>
              <input type="file" multiple id="upload-cnic" className="hidden" onChange={handleCnicImageChange} />
              {cnicImages.map((image, index) => (
                <div key={index} className="relative">
                  <IoMdCloseCircle className="absolute top-0 right-0 m-2 text-xl text-white cursor-pointer" onClick={() => removeCnicImage(index)} />
                  <img src={image} className="h-[80px] w-[80px] object-cover rounded-xl" alt="CNIC" />
                </div>
              ))}
            </div>
          </div>
          
          <Button name="Save Changes" className="h-9 mt-16" />
          </div>
        </div>

        {/* Password Settings */}
        <h3 className="text-lg ml-8 mt-14 mb-8">Password Settings</h3>
        <div className="flex flex-col justify-center items-center gap-7">
          <div className="flex justify-around gap-x-14">
            <InputField label="Old Password" placeholder="Enter your old password" className="w-100" />
            <InputField label="New Password" placeholder="Enter your new password" className="w-100" />
          </div>
          <div className="flex items-center gap-x-36">
            <InputField label="Confirm New Password" placeholder="Re-enter new password" className="w-100" />
            <Button name="Save Changes" className="h-9 mt-4" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
