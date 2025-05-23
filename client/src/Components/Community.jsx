import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { fetchPitches, setPitches } from "@/store"; // Adjust path as needed
import SelectField from "./elements/SelectField";
import Button from "./elements/Button";

const Community = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { pitches } = useSelector((state) => state.pitchStore);
  const {authUser} = useSelector((state)=> state.userStore)

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [filteredPitches, setFilteredPitches] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("All");

  useEffect(() => {
    const getPitches = async () => {
      setLoading(true);
      try {
        const response = await dispatch(fetchPitches()).unwrap();
        dispatch(setPitches(response));
        setFilteredPitches(response);
      } catch (err) {
        setError(err.message || "Failed to fetch pitches.");
      } finally {
        setLoading(false);
      }
    };
    getPitches();
  }, [dispatch]);


  useEffect(() => {
    if (selectedCategory === "All") {
      setFilteredPitches(pitches.filter((pitch) => {
        return((pitch.entrepreneurId !== authUser?.user?.id))
        }))
    } else {
      setFilteredPitches(pitches.filter((pitch) => {
        return((pitch.categoryName === selectedCategory) && (pitch.entrepreneurId !== authUser?.user?.id))
        }
    ));
    }
  }, [selectedCategory, pitches]);
  console.log(authUser.user.id, "community")
  console.log(filteredPitches,"filter")
  

  return (
    <div className="w-4/5 py-5 px-8 flex flex-col gap-4 ml-[18%]">
      <img src="BannerCommunity.png" alt="Banner" />
      <div className="flex items-center gap-3 justify-end text-sm">
        Filter by category:
        <SelectField 
          className="w-40 cursor-pointer" 
          includeAll={true}
          onChange={setSelectedCategory} 
        />
      </div>
      <div className="flex flex-col gap-6">
        {filteredPitches.map((pitch) => (
          <div key={pitch.id} className="flex text-white h-[350px] my-6">
            <div className="w-2/5 px-4 mr-2 flex flex-col h-[350px]">
              <div className="flex gap-x-4 items-center border-b border-b-white pb-3">
                <img
                  src={pitch.entrepreneur?.profile?.profileImage}
                  alt="profilePic"
                  className="w-11 h-11 rounded-full object-cover"
                />
                <div className="flex flex-col leading-tight">
                  <p className="text-lg">{pitch.title}</p>
                  <p className="text-sm mt-[-3px]">{pitch.entrepreneur?.name}</p>
                </div>
              </div>
              <div className="flex-grow">
                <p className="text-sm py-10">
              {pitch.description.split(' ').slice(0, 25).join(' ')}{pitch.description.split(' ').length > 50 && '...'}
             </p>
              </div>
              <div className="my-6 text-sm flex flex-col gap-1">
                <p className="flex justify-between">
                  <span className="text-[#C5C5C5] text-sm">Fundraising Goal:</span>
                  <span className="text-white">{pitch?.fundingGoal} coins</span>
                </p>
                <p className="flex justify-between">
                  <span className="text-[#C5C5C5] text-sm">Equity:</span>
                  <span className="text-white">{pitch?.equity} %</span>
                </p>
                {console.log(pitch.entrepreneur?.profile?.profileImage)}
              </div>
            </div>
            <div className="w-3/5">
              <img
                src={pitch.pitchImages[0] || "default-thumbnail.jpg"}
                alt={pitch.title}
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Community;