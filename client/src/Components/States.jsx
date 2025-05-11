import React, { useEffect } from 'react';
import AdminSidebar from './AdminSidebar';
import { useSelector } from 'react-redux';
import { axiosInstance } from '@/lib/axios';
import { useState } from 'react';
import DashboardChart from './DashboardChart';


const States = () => {
  const [user, setUser] = useState(0);
  const [pitch, setPitch] = useState(0);
  const [investedPitch, setInvestedPitch] = useState(0);
  const [totalAmount, setTotalAmount] = useState(0);

  const data = [
  { name: 'Users', value: user },
  { name: 'Pitches', value: pitch },
  { name: 'Invested', value: investedPitch },
];


const GetPitch = async () => {
  const response = await axiosInstance.get("/startups/get-all-startups");
  // console.log("API Response:", response.data); // Debugging log
  // console.log("Data Array:", response.data.data); // Debugging log
  setPitch(response.data.data.length)
  const allPitches = response.data.data;
  const investedPitchesCount = allPitches.filter(pitch => pitch.investor);
  console.log("IP",investedPitchesCount);
  const total = investedPitchesCount.reduce((sum, pitch) => sum + parseFloat(pitch.fundingGoal || 0), 0);
  console.log("Total", total);
  
  setInvestedPitch(investedPitchesCount.length);
  setTotalAmount(total);
}



const GetUsers = async () => {
  const users = await axiosInstance.get('/users/get-all')
  console.log("API Response:", users.data); // Debugging log
  console.log("Data Array:", users.data.data); // Debugging log
  setUser(users.data.data.length)

}

  
  useEffect(()=>{
    GetPitch()
    GetUsers()
  },[])

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
            <p className="text-2xl font-semibold">{user}</p>
          </div>

          <div className="bg-gradient-to-br from-[#4D4C7D] to-[#8D9EFF] rounded-xl p-4">
            <h3 className="text-sm mb-1">Total Pitches</h3>
            <p className="text-2xl font-semibold">{pitch}</p>
          </div>

          <div className="bg-gradient-to-br from-[#3E54AC] to-[#7C73E6] rounded-xl p-4">
            <h3 className="text-sm mb-1">Payment Raised</h3>
            <p className="text-2xl font-semibold">{totalAmount}</p>
          </div>

          <div className="bg-gradient-to-br from-[#635985] to-[#cdb3f3] rounded-xl p-4">
            <h3 className="text-sm mb-1">Total Invested</h3>
            <p className="text-2xl font-semibold">{investedPitch}</p>
          </div>
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-2 gap-6">
          {/* Replace with image */}
          <div className="bg-[#171616] rounded-xl h-[280px] pr-8 pt-6">
            {/* Option 1: Use blank chart div */}
            <DashboardChart chartData={data}/>
          </div>

          <div className="bg-[#171717] rounded-xl h-[280px] ">
            <video src="Transaction.mp4" className="w-full h-full object-cover rounded-lg shadow-lg" autoPlay loop muted />
          </div>
        </div>
      </div>
      </div>
    </div>
  );
};

export default States;
