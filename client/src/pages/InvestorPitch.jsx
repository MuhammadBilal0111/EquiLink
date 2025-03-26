import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import Button from "@/components/elements/Button";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import Service from "@/constants/Service";

const InvestorPitch = () => {
  const { id } = useParams();
  const { pitches } = useSelector((state) => state.pitchStore);
  const {authUser} = useSelector((state)=> state.userStore)

  const pitch = pitches.find((p) => p.id === parseInt(id));
  console.log(pitch);

  const [selectedImage, setSelectedImage] = useState(pitch.pitchImages[0]);

  const navigate = useNavigate();

  const handleMessageOwner = async() => {
    const entrepreneurId = pitch.entrepreneur?.id;
    const investorId = authUser?.user?.id; // Replace with actual logged-in user ID
    const pitchTitle = encodeURIComponent(pitch.title); // Ensure safe URL encoding
    const pitchImage = pitch.pitchImages[0];
    console.log(entrepreneurId,investorId,pitchTitle,pitchImage);

    // Current User Id
    try {
      await Service.CreateSendBirdUser(investorId, authUser?.user?.name, pitchImage).
        then(resp => {
          console.log(resp);
        })
    } catch (e) {}
    
    // Owner User Id
    try {
      await Service.CreateSendBirdUser(entrepreneurId, pitch?.entrepreneur?.name, pitchImage).
        then(resp => {
          console.log(resp);
        })

    } catch (e) {}

    //Create Channel
    try {
      await Service.CreateSendBirdChannel([investorId,entrepreneurId], pitchTitle).
      then(resp=>{
        console.log(resp);
        console.log("Channel Created");
        navigate('/?tab=messages', {
          state: {
            entrepreneurId,
            investorId,
            pitchTitle,
            pitchImage
          }
        });
      })
    } catch (e) {
      
    }

  };



  if (!pitch) {
    return <p className="text-white text-center mt-10">Pitch not found.</p>;
  }

  return (
    <div className="w-full bg-[#0A0A0A] flex flex-col text-white p-2">
      <Link to={'/'}>
        <img className="relative w-[120px] h-[30px] left-5 top-3 " src="/FullLogo.png" alt="logo" />
      </Link>
      <div className="p-9 mb-4">
        <div className="flex gap-x-4 items-center pb-3">
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

        <div className="flex items-start justify-between my-3">
          {/* Category Tag */}
          <span className="bg-[#CFB9FF] text-[#240C57] text-sm font-medium px-3 py-1 rounded-xl inline-block">
            {pitch.categoryName}
          </span>

          {/* Download Button */}
          <a
            href={pitch.projectFile}
            download
            className="bg-gradient-to-r from-[#D1B0D4] via-[#8B68AD] to-[#5A3592] cursor-pointer text-white text-sm px-6 py-2 rounded-md inline-block text-center"
          >
            Download Project File
          </a>

        </div>

        <div className="mt-8 flex gap-6">
          {/* Main Pitch Video */}
          <div className="w-4/7 ">
            <video
              src={pitch.pitchVideo || "default-video.mp4"}
              controls
              className="w-full h-90 object-cover rounded-lg"
            >
              Your browser does not support the video tag.
            </video>

          </div>

          {/* Right Section: Additional Images */}
          <div className="w-3/7 flex flex-col gap-4">
            <img
              src={selectedImage || pitch.pitchImages[0]}
              alt="Pitch Preview"
              className="w-full h-65 object-cover rounded-lg"
            />
            <div className="flex gap-2 items-center justify-center">
              {pitch.pitchImages.map((img, index) => (
                <img
                  key={index}
                  src={img || "default-image.jpg"}
                  alt={`Preview ${index}`}
                  className="w-24 h-20 object-cover rounded-lg cursor-pointer"
                  onClick={() => setSelectedImage(img)}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Description Section */}
        <div className="mt-6 bg-[#1A1A1A] p-6 rounded-lg">
          <h3 className="text-[20px]">Description:</h3>
          <p className="my-2 text-[#D9D9D9] ">{pitch.description}</p>
        </div>


        <div className="flex gap-5 items-center mt-5" >
          {/* Fundraising Info */}
          <div className="flex flex-col gap-2 bg-[#1E1E1E] p-4 rounded-lg w-[50%]">
            <div className="flex justify-between items-center">
              <p className="text-sm text-[#D9D9D9]">Fundraising Goal:</p>
              <p className="text-lg">{pitch.fundingGoal} coins</p>
            </div>
            <div className="flex justify-between items-center">
              <p className="text-sm text-[#D9D9D9]">Equity:</p>
              <p className="text-lg ">{pitch.equity}%</p>
            </div>
          </div>


          <div className="flex flex-col gap-2 bg-[#1E1E1E] p-8 rounded-lg w-[50%]">
            <div className="flex justify-around items-center">
              <Button name="Message the owner" className="w-[15rem]" handler={handleMessageOwner} />
              <Button name={"Invest"} className={"w-[15rem]"}></Button>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
};

export default InvestorPitch;
