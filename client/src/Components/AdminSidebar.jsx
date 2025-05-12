import React from 'react';
import { NavLink } from 'react-router-dom';
import { FaBitcoin } from 'react-icons/fa';
import { MdOutlineDashboardCustomize } from 'react-icons/md';
import { HiOutlineUsers } from 'react-icons/hi';
import { MdLogout } from 'react-icons/md';

const AdminSidebar = () => {
  return (
    <div className="fixed left-0 top-0 h-screen w-1/6 bg-[#0A0A0A] border-r border-[#3F3F3F] p-3 flex flex-col gap-6">
      <img src="FullLogo.png" alt="Logo" className="w-[120px] h-[30px] ml-4" />

      {/* Navigation Links */}
      <div className="flex justify-center mt-22 mr-8">
        <nav className="flex flex-col gap-9 text-[15px] ">
          <NavLink
            to="/admin-dashboard"
            className={({ isActive }) =>
              `flex items-center gap-8 ${
                isActive ? 'text-[#cfa6f9] font-semibold' : 'hover:text-gray-300'
              }`
            }
          >
            <MdOutlineDashboardCustomize size={19} />
            Stats
          </NavLink>

          <NavLink
            to="/admin-users"
            className={({ isActive }) =>
              `flex items-center gap-8 ${
                isActive ? 'text-[#b58bde] font-semibold' : 'hover:text-gray-300'
              }`
            }
          >
            <HiOutlineUsers size={19} />
            Users
          </NavLink>

          {/* <NavLink
            to="/admin-pitches"
            className={({ isActive }) =>
              `flex items-center gap-8 ${
                isActive ? 'text-[#b58bde] font-semibold' : 'hover:text-gray-300'
              }`
            }
          >
            <FaBitcoin size={19} />
            Pitches
          </NavLink> */}
        </nav>
      </div>

      {/* Logout Button */}
      <button
        // onClick={() => }
        className="flex cursor-pointer items-center gap-6 text-[15px] mt-48 ml-[28px] hover:text-gray-300"
      >
        <MdLogout size={19} />
        Logout
      </button>
    </div>
  );
};

export default AdminSidebar;
