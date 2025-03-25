import React, { useEffect, useState } from "react";
import { FaCheckCircle } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchPitches, setPitches } from "@/store"; // Adjust path based on project structure
import { GoGlobe } from "react-icons/go";

const Dashboard = () => {
  const dispatch = useDispatch();
  const { pitches } = useSelector((state) => state.pitchStore);
  const { authUser } = useSelector((state) => state.userStore);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    console.log("Auth User:", authUser);

    const getPitches = async () => {
      setLoading(true);
      try {
        const response = await dispatch(fetchPitches()).unwrap();
        dispatch(setPitches(response));
      } catch (err) {
        setError(err.message || "Failed to fetch pitches.");
      } finally {
        setLoading(false);
      }
    };

    getPitches();
  }, [dispatch]);

  // Filter pitches for the logged-in user
  const userPitches = pitches.filter(
    (pitch) => pitch.entrepreneurId === authUser?.user?.id
  );

  return (
    <div className="w-4/5 p-8 ml-[18%]">
      <h2 className="text-2xl">Welcome, {authUser?.user?.name}!</h2>
      <p className="mt-2 text-sm text-[#C5C5C5]">
        Let's check out the responses of investors. How they respond to your pitch.
      </p>

      <div className="mt-6 flex justify-between border-t border-t-[#3F3F3F] py-4">
        <h3 className="text-lg">Your Pitches</h3>
        <Link to="/add-pitch">
          <button className="mt-2 cursor-pointer text-sm bg-gradient-to-r from-[#D1B0D4] via-[#8B68AD] to-[#5A3592] px-10 py-1.5 rounded-sm">
            + Add New Pitch
          </button>
        </Link>
      </div>

      {/* Loading, Error & Pitch Display */}
      {loading && <p>Loading pitches...</p>}
      {error && <p className="text-red-500">Error: {error}</p>}
      {userPitches.length > 0 ? (
        <div className="mt-1 grid grid-cols-1 md:grid-cols-3 gap-6 p-2">
          {userPitches.map((pitch) => (
            <Link key={pitch.id} to={`/pitch/${pitch.id}`}>
              <div className="bg-[#141414] border border-[#C991FF] rounded-lg shadow-md text-white relative cursor-pointer hover:shadow-lg transition">
                {/* Display pitch thumbnail */}
                <img
                  src={pitch.pitchImages[0] || "default-thumbnail.jpg"}
                  alt={pitch.title}
                  className="w-full h-38 object-cover rounded-t-lg"
                />

                <div className="mt-6 p-4">
                  {/* Fund Received Tag */}
                  {pitch.isFunded && (
                    <span className="absolute top-3 right-3 bg-purple-600 text-white text-xs px-3 py-1 rounded-4xl">
                      Fund Received
                    </span>
                  )}

                  <span className="absolute top-41 right-3 bg-gradient-to-r from-[#6E499D] to-[#CAA8D0] text-white text-xs px-2 py-1 rounded-full flex items-center gap-1">
                    <FaCheckCircle /> Fund Received
                  </span>

                  <h4 className="text-lg font-semibold">{pitch.title}</h4>

                  <div className="mt-1 text-sm flex flex-col gap-1">
                    <p className="flex justify-between">
                      <span className="text-[#C5C5C5] text-sm">Fundraising Goal:</span>
                      <span className="text-white">{pitch?.fundingGoal} coins</span>
                    </p>
                    <p className="flex justify-between">
                      <span className="text-[#C5C5C5] text-sm">Equity:</span>
                      <span className="text-white">{pitch?.equity} %</span>
                    </p>
                    <p className="flex justify-between">
                      <span className="text-[#C5C5C5] text-sm">Category:</span>
                      <span className="text-white">{pitch?.categoryName}</span>
                    </p>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      ) : (
        <p className="mt-4 text-gray-500">You haven't added any pitches yet.</p>
      )}
    </div>
  );
};

export default Dashboard;
