import React from 'react';
import AdminSidebar from './AdminSidebar';

const States = () => {
  return (
    <div className="min-h-screen w-full bg-[#0A0A0A] flex text-white">
      <AdminSidebar />

     <div className="w-4/5 p-8 ml-[18%]">
      <h2 className="text-2xl">Welcome, Admin!</h2>
      <p className="mt-2 text-sm text-[#C5C5C5]">
        Let's check out the states of users, to see how active people are.
      </p>

      <div className="mt-6 flex-col justify-between border-t border-t-[#3F3F3F] py-4">
        {/* Metrics */}
        <div className="grid grid-cols-4 gap-6 mb-8 mt-2">
          <div className="bg-gradient-to-br from-[#D1B0D4] via-[#8B68AD] to-[#7446ba] rounded-xl p-4">
            <h3 className="text-sm mb-1">Total Users</h3>
            <p className="text-2xl font-semibold">1,200</p>
          </div>

          <div className="bg-gradient-to-br from-[#4D4C7D] to-[#8D9EFF] rounded-xl p-4">
            <h3 className="text-sm mb-1">Total Pitches</h3>
            <p className="text-2xl font-semibold">320</p>
          </div>

          <div className="bg-gradient-to-br from-[#3E54AC] to-[#7C73E6] rounded-xl p-4">
            <h3 className="text-sm mb-1">Payment Raised</h3>
            <p className="text-2xl font-semibold">$85,000</p>
          </div>

          <div className="bg-gradient-to-br from-[#635985] to-[#cdb3f3] rounded-xl p-4">
            <h3 className="text-sm mb-1">Total Invested</h3>
            <p className="text-2xl font-semibold">$45,000</p>
          </div>
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-2 gap-6">
          {/* Replace with image */}
          <div className="bg-[#1A1A1A] rounded-xl h-[280px] flex items-center justify-center">
            {/* Option 1: Use blank chart div */}
            {/* <p className="text-gray-500">Chart 1 Placeholder</p> */}

            {/* Option 2: Show chart image */}
            <img src={''} alt="Dashboard Chart" className="w-full h-full object-contain p-4" />
          </div>

          <div className="bg-[#1A1A1A] rounded-xl h-[280px] flex items-center justify-center">
            <p className="text-gray-500">Chart 2 Placeholder</p>
          </div>
        </div>
      </div>
      </div>
    </div>
  );
};

export default States;
