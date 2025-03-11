// import React, { useState } from "react";
// import { TbLayoutDashboardFilled } from "react-icons/tb";
// import { MdWallet } from "react-icons/md";
// import { BiSolidMessageSquareDetail } from "react-icons/bi";
// import { FaUser } from "react-icons/fa";
// import { IoMdCloseCircle } from "react-icons/io";
// import InputField from "./elements/InputField";
// import Button from "./elements/Button";

// const Profile = () => {
//   const [profileImage, setProfileImage] = useState(null);
//   const [cnicImages, setCnicImages] = useState([]);

//   console.log("ye profile image hai",profileImage, cnicImages)


//   const [formData, setFormData] = useState({
//     profileImage:"",
//     cnicFrontImage:"",
//     cnicBackImage:"",
//     name:"",
//     email:"",
//     cnicNo:"",
//     phone:"",
//     address:"",
//     city:"",
//   })
//   console.log(formData)


//   const handleProfileImageChange = (event) => {
//     if (event.target.files.length > 0) {
//       setProfileImage(URL.createObjectURL(event.target.files[0]));
//       setFormData({...formData, profileImage: event.target.files[0]})
//     }
//   };

//   const removeProfileImage = () => {
//     setProfileImage(null);
//   };

//   const handleCnicImageChange = (event) => {
//     if (event.target.files.length > 0) {
//       if (event.target.files.length > 2) {
//         alert("You can only upload a maximum of 2 images.");
//         event.target.value = ""; 
//         return;
//       }
//       setCnicImages([...cnicImages, ...Array.from(event.target.files).map(file => URL.createObjectURL(file))]);
//     }
//   };

//   const removeCnicImage = (index) => {
//     setCnicImages(cnicImages.filter((_, i) => i !== index));
//   };

//   return (
//     <div className="w-full bg-[#0A0A0A] flex text-white">
//       {/* Sidebar */}
//       <div className="w-1/5 bg-[#0A0A0A] border-r-1 border-r-[#3F3F3F] p-6 flex flex-col gap-6">
//         <img src="FullLogo.png" alt="Logo" className="w-[120px] h-[30px] ml-6" />
//         <div className="flex justify-center mt-24"> 
//           <nav className="flex flex-col gap-10">
//             <a href="#" className="hover:text-gray-300 flex items-center gap-8"><TbLayoutDashboardFilled size={22}/>Dashboard</a>
//             <a href="#" className="hover:text-gray-300 flex items-center gap-8"><MdWallet size={22}/>Wallet</a>
//             <a href="#" className="hover:text-gray-300 flex items-center gap-8"><BiSolidMessageSquareDetail size={22}/>Messages</a>
//             <a href="#" className="hover:text-gray-300 flex items-center gap-8"><FaUser size={22}/>Profile</a>
//           </nav>
//         </div>
//       </div>

//       {/* Main Content */}
//       <div className="w-4/5 p-8">
//         <div className="flex justify-end items-center">
//           <button className="bg-[#262626] border text-md border-[#222124] text-white px-8 py-1 rounded-xl">
//             Logout
//           </button>
//         </div>
//         <h2 className="text-2xl">Welcome, Simrah!</h2>

//         {/* Profile Section */}
//         <div className="flex flex-col justify-center items-center mt-8 gap-7 border-t border-t-[#3F3F3F] py-4">
//           <label htmlFor="upload-profile" className="relative">
//             <div className="w-30 h-30 rounded-full bg-gray-600 flex items-center justify-center cursor-pointer">
//               {profileImage ? (
//                 <>
//                   <img src={profileImage} alt="Profile" className="w-full h-full object-cover rounded-full"/>
//                   <IoMdCloseCircle className="absolute top-0 right-2 m-2 text-xl text-white cursor-pointer" onClick={removeProfileImage} />
//                 </>
//               ) : (
//                 <img src="Camera.png" alt="Camera" className="w-14" />
//               )}
//             </div>
//           </label>
//           <input type="file" id="upload-profile" className="hidden" onChange={handleProfileImageChange}/>
          
//           <div className="flex justify-around gap-x-14">
//             <InputField label="Full Name" placeholder="Enter your full name" className="w-100" value={formData.name} handler={(e)=>setFormData({...formData, name: e.target.value})}/>
//             <InputField label="Email Address" placeholder="Enter your email address" className="w-100" value={formData.email} handler={(e)=>setFormData({...formData, email: e.target.value})}/>
//           </div>
//           <div className="flex justify-around gap-x-14">
//             <InputField label="Phone Number" placeholder="Enter your phone number" className="w-100" value={formData.phone} handler={(e)=>setFormData({...formData, phone: e.target.value})}/>
//             <InputField label="CNIC Number" placeholder="Enter your CNIC number" className="w-100" value={formData.cnicNo} handler={(e)=>setFormData({...formData, cnicNo: e.target.value})}/>
//           </div>
//           <div className="flex justify-around gap-x-14">
//             <InputField label="Residential Address" placeholder="Enter your address" className="w-100" value={formData.address} handler={(e)=>setFormData({...formData, address: e.target.value})}/>
//             <InputField label="City" placeholder="Enter your city" className="w-100" value={formData.city} handler={(e)=>setFormData({...formData, city: e.target.value})}/>
//           </div>

//           {/* CNIC Upload */}
//           <div className="flex w-[90%] items-center justify-between">
//           <div>
//             <h2 className="text-sm mb-2">Upload CNIC</h2>
//             <div className="grid grid-cols-2 md:grid-cols-3 gap-5 items-center">
//               <label htmlFor="upload-cnic">
//                 <div className="border rounded-xl border-dotted border-primary bg-blue-100 h-[80px] w-[80px] cursor-pointer hover:shadow-md flex items-center justify-center">
//                   <h2 className="text-2xl text-primary">+</h2>
//                 </div>
//               </label>
//               <input type="file" multiple id="upload-cnic" className="hidden" onChange={handleCnicImageChange} />
//               {cnicImages.map((image, index) => (
//                 <div key={index} className="relative">
//                   <IoMdCloseCircle className="absolute top-0 right-0 m-2 text-xl text-white cursor-pointer" onClick={() => removeCnicImage(index)} />
//                   <img src={image} className="h-[80px] w-[80px] object-cover rounded-xl" alt="CNIC" />
//                 </div>
//               ))}
//             </div>
//           </div>
          
//           <Button name="Save Changes" className="h-9 mt-16" />
//           </div>
//         </div>

//         {/* Password Settings */}
//         <h3 className="text-lg ml-8 mt-14 mb-8">Password Settings</h3>
//         <div className="flex flex-col justify-center items-center gap-7">
//           <div className="flex justify-around gap-x-14">
//             <InputField label="Old Password" placeholder="Enter your old password" className="w-100" />
//             <InputField label="New Password" placeholder="Enter your new password" className="w-100" />
//           </div>
//           <div className="flex items-center gap-x-36">
//             <InputField label="Confirm New Password" placeholder="Re-enter new password" className="w-100" />
//             <Button name="Save Changes" className="h-9 mt-4" />
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Profile;






import React, { useEffect, useState } from "react";
import { TbLayoutDashboardFilled } from "react-icons/tb";
import { MdWallet } from "react-icons/md";
import { BiSolidMessageSquareDetail } from "react-icons/bi";
import { FaUser } from "react-icons/fa";
import { IoMdCloseCircle } from "react-icons/io";
import {axiosInstance} from "./../lib/axios.js";
import InputField from "./elements/InputField";
import Button from "./elements/Button";
import { toast } from "sonner";
import { useDispatch } from 'react-redux';
import { profileActions } from './../store/index.js';
import { useSelector } from "react-redux";

const Profile = () => {

  const dispatch = useDispatch()

  const {authUser} = useSelector((store)=>store.userStore);

  let link = ""

  const getProfile = async()=>{
    try{
      console.log(authUser, "from profile")
      const res = await axiosInstance.get(`/users/get-userProfile/${authUser.user.id}`,{
        headers: {
            "Content-Type": "multipart/form-data",
        },
    });
      let profile = res.data.data.at(-1)
      dispatch(profileActions.setProfile(profile))
      setProfileImage(res.data.data.at(-1).profileImage);
      setFormData({
        ...formData,
        phone: profile.contactNo,
        city: profile.city,
        address: profile.address,
        cnicNo: profile.cnicNo
      })

  }
  catch(err){
      console.log("error in getting profile:", err)              
  }
  }

  useEffect(()=>{
    getProfile()
    
  },[])

  const {profile} = useSelector((store)=>store.profileStore);
  console.log("user profile",profile)




  const [profileImage, setProfileImage] = useState(null);
  const [cnicImages, setCnicImages] = useState([]);
  const [cnicFiles, setCnicFiles] = useState([]); // To store actual file objects
  const [formData, setFormData] = useState({
    name: authUser.user.name,
    email: authUser.user.email,
    cnicNo:"",
    phone:"",
    address: "",
    city: "",
  });



  const handleProfileImageChange = (event) => {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      setProfileImage(URL.createObjectURL(file));
      setFormData((prev) => ({ ...prev, profileImage: file })); // Store actual file
    }
  };

  const removeProfileImage = () => {
    setProfileImage(null);
    setFormData((prev) => ({ ...prev, profileImage: null }));
  };

  const handleCnicImageChange = (event) => {
    if (event.target.files.length > 0) {
      if (event.target.files.length > 2) {
        alert("You can only upload a maximum of 2 images.");
        return;
      }
      const files = Array.from(event.target.files);
      setCnicFiles(files);
      setCnicImages(files.map((file) => URL.createObjectURL(file))); // Preview
    }
  };

  const removeCnicImage = (index) => {
    setCnicImages(cnicImages.filter((_, i) => i !== index));
    setCnicFiles(cnicFiles.filter((_, i) => i !== index));
  };

  const handleSubmit = async () => {
    console.log("button clicked");
    const data = new FormData();
    data.append("name", formData.name);
    data.append("email", formData.email);
    data.append("cnicNo", formData.cnicNo);
    data.append("phone", formData.phone);
    data.append("address", formData.address);
    data.append("city", formData.city);

    if (formData.profileImage) {
        data.append("profileImage", formData.profileImage);
    }

    // Ensure CNIC images exist and assign them separately
    if (cnicFiles.length > 0) {
        data.append("cnicFrontImage", cnicFiles[0]); // First image as Front CNIC
    }
    if (cnicFiles.length > 1) {
        data.append("cnicBackImage", cnicFiles[1]); // Second image as Back CNIC
    }

    try {
        const response = await axiosInstance.post("/users/create-userProfile", data, {
            headers: {
                "Content-Type": "multipart/form-data",
            },
        });

        console.log("Response:", response.data);
        dispatch(profileActions.setProfile(response.data.data))
        toast.success("Profile updated successfully!")

    } catch (error) {
      toast.error("Something went wrong")
      console.log(error)
    }
};


  return (
    <div className="w-full bg-[#0A0A0A] flex text-white">
      {/* Sidebar */}
      <div className="w-1/5 bg-[#0A0A0A] border-r-1 border-r-[#3F3F3F] p-6 flex flex-col gap-6">
        <img src="FullLogo.png" alt="Logo" className="w-[120px] h-[30px] ml-6" />
        <nav className="flex flex-col gap-10 mt-24">
          <a href="#" className="hover:text-gray-300 flex items-center gap-8">
            <TbLayoutDashboardFilled size={22} /> Dashboard
          </a>
          <a href="#" className="hover:text-gray-300 flex items-center gap-8">
            <MdWallet size={22} /> Wallet
          </a>
          <a href="#" className="hover:text-gray-300 flex items-center gap-8">
            <BiSolidMessageSquareDetail size={22} /> Messages
          </a>
          <a href="#" className="hover:text-gray-300 flex items-center gap-8">
            <FaUser size={22} /> Profile
          </a>
        </nav>
      </div>

      {/* Main Content */}
      <div className="w-4/5 p-8">
        <h2 className="text-2xl">Welcome, {authUser.user?.name || "Jhon"}</h2>

        {/* Profile Section */}
        <div className="flex flex-col justify-center items-center mt-8 gap-7 border-t border-t-[#3F3F3F] py-4">
          <label htmlFor="upload-profile" className="relative">
            <div className="w-30 h-30 rounded-full bg-gray-600 flex items-center justify-center cursor-pointer">
              {profileImage ? (
                <>
                  <img src={profileImage || profile.profileImage} alt="Profile" className="w-full h-full object-cover rounded-full" />
                  <IoMdCloseCircle className="absolute top-0 right-2 m-2 text-xl text-white cursor-pointer" onClick={removeProfileImage} />
                </>
              ) : (
                <img src="Camera.png" alt="Camera" className="w-14" />
              )}
            </div>
          </label>
          <input type="file" id="upload-profile" className="hidden" onChange={handleProfileImageChange} />

          <div className="grid grid-cols-2 gap-6">
            <InputField label="Full Name" value={formData.name} handler={(e) => setFormData({ ...formData, name: e.target.value })} />
            <InputField label="Email Address" value={formData.email} handler={(e) => setFormData({ ...formData, email: e.target.value })} />
          </div>

          <div className="grid grid-cols-2 gap-6">
            <InputField label="Phone Number" value={formData.phone} handler={(e) => setFormData({ ...formData, phone: e.target.value})} />
            <InputField label="CNIC Number" value={formData.cnicNo} handler={(e) => setFormData({ ...formData, cnicNo: e.target.value })} />
          </div>

          <div className="grid grid-cols-2 gap-6">
            <InputField label="Residential Address" value={formData.address} handler={(e) => setFormData({ ...formData, address: e.target.value })} />
            <InputField label="City" value={formData.city} handler={(e) => setFormData({ ...formData, city: e.target.value })} />
          </div>

          {/* CNIC Upload */}
          <div className="flex flex-col">
            <h2 className="text-sm mb-2">Upload CNIC</h2>
            <label htmlFor="upload-cnic">
              <div className="border rounded-xl border-dotted border-primary bg-blue-100 h-[80px] w-[80px] cursor-pointer hover:shadow-md flex items-center justify-center">
                <h2 className="text-2xl text-primary">+</h2>
              </div>
            </label>
            <input type="file" multiple id="upload-cnic" className="hidden" onChange={handleCnicImageChange} />
            <div className="grid grid-cols-2 gap-5">
              {cnicImages.map((image, index) => (
                <div key={index} className="relative">
                  <IoMdCloseCircle className="absolute top-0 right-0 m-2 text-xl text-white cursor-pointer" onClick={() => removeCnicImage(index)} />
                  <img src={image} className="h-[80px] w-[80px] object-cover rounded-xl" alt="CNIC" />
                </div>
              ))}
            </div>
          </div>
          {/* <Button name="Save Changes" className="h-9 mt-4" onClick={handleSubmit} /> */}
          <button name="Save Changes" className="h-9 mt-4 py-1.5 text-white text-center text-sm rounded-lg w-80 bg-gradient-to-r from-[#D1B0D4] via-[#8B68AD] to-[#5A3592] cursor-pointer" onClick={handleSubmit}>Save changes</button>
          <img src={profile.profileImage} className="w-40 h-40 z-10 relative" alt="" />
        </div>
      </div>
    </div>
  );
};

export default Profile;

