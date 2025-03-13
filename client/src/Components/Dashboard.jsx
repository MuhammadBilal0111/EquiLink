import React from "react";
import { Link } from "react-router";

const Dashboard = () => {
  return (
     <>
      {/* Main Content */}
      <div className="w-4/5 p-8">
        <div className="flex justify-self-end items-center">
          <button className="bg-[#262626] border text-md border-[#222124] text-white px-8 py-1 rounded-xl">
            Logout
          </button>
        </div>
        <h2 className="text-2xl">Welcome, Simrah!</h2>
        <p className="mt-2 text-sm text-[#C5C5C5]">
          Let's check out the responses of investors. How they respond to your pitch.
        </p>

        {/* Pitches Section */}
        <div className="mt-6 flex justify-between border-t border-t-[#3F3F3F] py-4">
          <h3 className="text-lg">Your Pitches</h3>
          <Link to={'/add-pitch'}>
          <button className="mt-2 cursor-pointer text-sm bg-gradient-to-r from-[#D1B0D4] via-[#8B68AD] to-[#5A3592] px-10 py-1.5 rounded-sm">
            + Add New Pitch
          </button>
          </Link>
        </div>
      </div>
      </>
  );
};

export default Dashboard;
