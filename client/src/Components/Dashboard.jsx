// import { axiosInstance } from "@/lib/axios";
// import React, { useEffect } from "react";
// import { Link } from "react-router";

// const Dashboard = () => {

//   const fetchPitch=async()=>{
//     try {
//       const response = await axiosInstance.get("/startups/get-all-startups",{
//           headers: {
//               "Content-Type": "multipart/form-data",
//           },
//       });
//       console.log("Response:", response.data);

//   } catch (error) {
//       console.error("Error submitting pitch:", error);
//   }
//   }

//   useEffect(() => {
//     fetchPitch();
//   }, [])
  
//   return (
//      <>
//       {/* Main Content */}
//       <div className="w-4/5 p-8">
//         <div className="flex justify-self-end items-center">
//           <button className="bg-[#262626] border text-md border-[#222124] text-white px-8 py-1 rounded-xl">
//             Logout
//           </button>
//         </div>
//         <h2 className="text-2xl">Welcome, Simrah!</h2>
//         <p className="mt-2 text-sm text-[#C5C5C5]">
//           Let's check out the responses of investors. How they respond to your pitch.
//         </p>

//         {/* Pitches Section */}
//         <div className="mt-6 flex justify-between border-t border-t-[#3F3F3F] py-4">
//           <h3 className="text-lg">Your Pitches</h3>
//           <Link to={'/add-pitch'}>
//           <button className="mt-2 cursor-pointer text-sm bg-gradient-to-r from-[#D1B0D4] via-[#8B68AD] to-[#5A3592] px-10 py-1.5 rounded-sm">
//             + Add New Pitch
//           </button>
//           </Link>
//         </div>
//       </div>
//       </>
//   );
// }; 

// export default Dashboard;

import React, { useEffect } from "react";
import { Link } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { fetchPitches } from "@/store"; // Adjust path based on your project structure

const Dashboard = () => {
  const dispatch = useDispatch();
  const { pitches, loading, error } = useSelector((state) => state.pitchStore);
  const { authUser } = useSelector((state) => state.userStore); // Get logged-in user

  useEffect(() => {
    dispatch(fetchPitches());
  }, [dispatch]);

  // Filter pitches for logged-in user
  const userPitches = pitches.filter((pitch) => pitch.entrepreneurId === authUser?.id);

  useEffect(() => {
    console.log("User Pitches:", userPitches); // Logs filtered pitches
  }, [userPitches]);

  return (
    <>
      {/* Main Content */}
      <div className="w-4/5 p-8">
        <div className="flex justify-self-end items-center">
          <button className="bg-[#262626] border text-md border-[#222124] text-white px-8 py-1 rounded-xl">
            Logout
          </button>
        </div>
        <h2 className="text-2xl">Welcome, {authUser?.name}!</h2>
        <p className="mt-2 text-sm text-[#C5C5C5]">
          Let's check out the responses of investors. How they respond to your pitch.
        </p>

        {/* Pitches Section */}
        <div className="mt-6 flex justify-between border-t border-t-[#3F3F3F] py-4">
          <h3 className="text-lg">Your Pitches</h3>
          <Link to={"/add-pitch"}>
            <button className="mt-2 cursor-pointer text-sm bg-gradient-to-r from-[#D1B0D4] via-[#8B68AD] to-[#5A3592] px-10 py-1.5 rounded-sm">
              + Add New Pitch
            </button>
          </Link>
        </div>

        {/* Display fetched pitches */}
        {loading && <p>Loading pitches...</p>}
        {error && <p className="text-red-500">Error: {error}</p>}
        {userPitches.length > 0 ? (
          <div className="mt-4">
            {userPitches.map((pitch) => (
              <div key={pitch.id} className="border p-4 rounded-lg mb-2">
                <h4 className="text-lg font-bold">{pitch.title}</h4>
                <p className="text-sm text-gray-400">{pitch.description}</p>
                <a
                  href={pitch.pitchVideo}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-400 underline"
                >
                  Watch Pitch Video
                </a>
              </div>
            ))}
          </div>
        ) : (
          <p className="mt-4 text-gray-500">You haven't added any pitches yet.</p>
        )}
      </div>
    </>
  );
};

export default Dashboard;
