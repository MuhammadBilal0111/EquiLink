import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { FaCheckCircle } from "react-icons/fa";
import { Link } from "react-router-dom";

const Pitch = () => {
  const { id } = useParams();
  const { pitches } = useSelector((state) => state.pitchStore);

  const pitch = pitches.find((p) => p.id === parseInt(id));
  console.log(pitch);

  const [selectedImage, setSelectedImage] = useState(pitch.pitchImages[0]);


  if (!pitch) {
    return <p className="text-white text-center mt-10">Pitch not found.</p>;
  }

  return (
    <div className="w-full bg-[#0A0A0A] flex flex-col text-white p-2">
      <Link to={'/'}>
        <img className="relative w-[120px] h-[30px] left-5 top-3 " src="/FullLogo.png" alt="logo" />
      </Link>
      <div className="p-9 mb-4">
        <h1 className="text-3xl">{pitch.title}</h1>

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

          <div className="flex gap-40 bg-[#140F1B] border p-4 border-white rounded-lg w-[50%]">
            <div className="flex text-sm text-[#D9D9D9] flex-col gap-2">
              Investment status:
              <span className="text-base text-white flex items-center gap-2">
                {pitch.investorId ? (
                  <>
                    <FaCheckCircle size={22} /> Done
                  </>
                ) : (
                  "Not funded"
                )}
              </span>
            </div>
            {pitch.investorId ?
              <div className="flex flex-col gap-2 text-sm text-[#D9D9D9]">
                Invested by:
                <div className="flex gap-2">
                  <img
                    src={pitch.investorImage || "https://live.screendollars.com/wp-content/uploads/2021/10/TOM-CRUISE-3-scaled.jpg"}
                    alt={pitch.investorName}
                    className="w-8 h-8 rounded-full object-cover"
                  />
                  <p className="text-base text-white">Abdul Ahad</p>
                </div>

              </div>
              : null
            }
          </div>
        </div>


      </div>
    </div>
  );
};

export default Pitch;
