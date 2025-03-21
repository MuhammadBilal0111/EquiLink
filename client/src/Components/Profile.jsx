import React, { useEffect, useRef, useState } from "react";
import { IoMdCloseCircle } from "react-icons/io";
import { Loader2 } from "lucide-react";
import { axiosInstance } from "./../lib/axios.js";
import InputField from "./elements/InputField";
import Button from "./elements/Button";
import { toast } from "sonner";
import { useDispatch } from "react-redux";
import { profileActions } from "./../store/index.js";
import { useSelector } from "react-redux";

const Profile = () => {
  const dispatch = useDispatch();

  const { authUser } = useSelector((store) => store.userStore);

  const getProfile = async () => {
    try {
      const res = await axiosInstance.get(
        `/users/get-userProfile/${authUser.user.id}`,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      let profile = res.data.data[0];
      dispatch(profileActions.setProfile(profile));
      setProfileImage(res.data.data[0].profileImage);
      setFormData({
        ...formData,
        contactNo: profile.contactNo,
        city: profile.city,
        address: profile.address,
        cnicNo: profile.cnicNo,
      });
    } catch (err) {
      console.log("error in getting profile:", err);
    }
  };

  useEffect(() => {
    getProfile();
  }, []);

  const { profile } = useSelector((store) => store.profileStore);

  const [haveProfile, setHaveProfile] = useState(
    JSON.parse(localStorage.getItem("haveProfile")) || false
  );

  // Update localStorage whenever haveProfile changes
  useEffect(() => {
    localStorage.setItem("haveProfile", JSON.stringify(haveProfile));
  }, [haveProfile]);

  
  const [isUpdatingProfile, setisUpdatingProfile] = useState(false);
  const [profileImage, setProfileImage] = useState(null);
  const [cnicImages, setCnicImages] = useState([]);
  const [cnicFiles, setCnicFiles] = useState([]); // To store actual file objects
  const [formData, setFormData] = useState({
    name: authUser.user.name,
    email: authUser.user.email,
    cnicNo: "",
    contactNo: "",
    address: "",
    city: "",
  });

  const oldPassword = useRef(null);
  const newPassword = useRef(null);
  const confirmPassword = useRef(null);

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
    data.append("contactNo", formData.contactNo);
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
      setisUpdatingProfile(true);
      const response = await axiosInstance.post(
        "/users/create-userProfile",
        data,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      dispatch(profileActions.setProfile(response.data.data[0]));
      toast.success("Profile updated successfully!");
      setHaveProfile(true);
    } catch (error) {
      toast.error("Something went wrong");
      setisUpdatingProfile(false);
      console.log(error);
    } finally {
      setisUpdatingProfile(false);
    }
  };

  const handleUpdates = async () => {};

  const handlePasswordChange = async () => {
    if (newPassword.current.value != confirmPassword.current.value) {
      toast.error("Password and confirm password must be same");
      return;
    }
    const data = {
      email: authUser.user?.email,
      oldPassword: oldPassword.current.value,
      newPassword: newPassword.current.value,
    };
    try {
      const res = await axiosInstance.post("/auth/change-password", data);
      console.log(res.data);
      if (res.data.status == true) {
        toast.success("Password reset successfully");
        oldPassword.current.value = null;
        newPassword.current.value = null;
        confirmPassword.current.value = null;
      }
    } catch (err) {
      toast.error("Something went wrong");
    }
  };

  if (isUpdatingProfile) {
    return (
      <div className="m-auto">
        <Loader2 size={50}></Loader2>
      </div>
    );
  }

  return (
    <>
      {/* Main Content */}
      <div className="w-4/5 p-8">
        <div className="flex justify-end items-center">
          <button className="bg-[#262626] border text-md border-[#222124] text-white px-8 py-1 rounded-xl">
            Logout
          </button>
        </div>
        <h2 className="text-2xl">Welcome, {authUser.user?.name || "Jhon"}!</h2>
        {/* Profile Section */}
        <div className="flex flex-col justify-center items-center mt-8 gap-7 border-t border-t-[#3F3F3F] py-4">
          <label htmlFor="upload-profile" className="relative">
            <div className="w-30 h-30 rounded-full bg-gray-600 flex items-center justify-center cursor-pointer">
              {profileImage ? (
                <>
                  <img
                    src={profileImage || profile.profileImage}
                    alt="Profile"
                    className="w-full h-full object-cover rounded-full"
                  />
                  <IoMdCloseCircle
                    className="absolute top-0 right-2 m-2 text-xl text-white cursor-pointer"
                    onClick={removeProfileImage}
                  />
                </>
              ) : (
                <img src="Camera.png" alt="Camera" className="w-14" />
              )}
            </div>
          </label>
          <input
            type="file"
            id="upload-profile"
            className="hidden"
            onChange={handleProfileImageChange}
          />

          <div className="flex justify-around gap-x-14">
            <InputField
              label="Full Name"
              placeholder="Enter your full name"
              className="w-100"
              value={formData.name}
              handler={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
            />
            <InputField
              label="Email Address"
              placeholder="Enter your email address"
              className="w-100"
              value={formData.email}
              handler={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
            />
          </div>
          <div className="flex justify-around gap-x-14">
            <InputField
              label="Phone Number"
              placeholder="Enter your phone number"
              className="w-100"
              value={formData.contactNo}
              handler={(e) =>
                setFormData({ ...formData, contactNo: e.target.value })
              }
            />
            <InputField
              label="CNIC Number"
              placeholder="Enter your CNIC number"
              className="w-100"
              value={formData.cnicNo}
              handler={(e) =>
                setFormData({ ...formData, cnicNo: e.target.value })
              }
            />
          </div>
          <div className="flex justify-around gap-x-14">
            <InputField
              label="Residential Address"
              placeholder="Enter your address"
              className="w-100"
              value={formData.address}
              handler={(e) =>
                setFormData({ ...formData, address: e.target.value })
              }
            />
            <InputField
              label="City"
              placeholder="Enter your city"
              className="w-100"
              value={formData.city}
              handler={(e) =>
                setFormData({ ...formData, city: e.target.value })
              }
            />
          </div>

          {/* CNIC Upload */}
          <div className="flex w-[90%] items-center justify-between">
            <div>
              <h2 className="text-sm mb-2">Upload CNIC</h2>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-5 items-center">
                <label htmlFor="upload-cnic">
                  <div className="border rounded-xl border-dotted border-primary bg-blue-100 h-[80px] w-[80px] cursor-pointer hover:shadow-md flex items-center justify-center">
                    <h2 className="text-2xl text-primary">+</h2>
                  </div>
                </label>
                <input
                  type="file"
                  multiple
                  id="upload-cnic"
                  className="hidden"
                  onChange={handleCnicImageChange}
                />
                {cnicImages.map((image, index) => (
                  <div className="relative w-[80px] h-[80px]">
                    <img
                      src={image}
                      className="h-full w-full object-cover rounded-xl"
                      alt="CNIC"
                    />
                    <IoMdCloseCircle
                      className="absolute top-[-8px] right-[-8px] text-xl text-white cursor-pointer"
                      onClick={() => removeCnicImage(index)}
                    />
                  </div>
                ))}
              </div>
            </div>
            {haveProfile === false ? (
              <Button
                name="Save Changes"
                className="h-9 mt-4"
                handler={handleSubmit}
              />
            ) : (
              <Button
                name="Update Changes"
                className="h-9 mt-4"
                handler={handleUpdates}
              />
            )}
          </div>
        </div>
        {/* Password Settings */}
        <h3 className="text-lg ml-8 mt-14 mb-8">Password Settings</h3>
        <div className="flex flex-col justify-center items-center gap-7">
          <div className="flex justify-around gap-x-14">
            <InputField
              label="Old Password"
              placeholder="Enter your old password"
              className="w-100"
              ref={oldPassword}
            />
            <InputField
              label="New Password"
              placeholder="Enter your new password"
              className="w-100"
              ref={newPassword}
            />
          </div>
          <div className="flex items-center gap-x-36">
            <InputField
              label="Confirm New Password"
              placeholder="Re-enter new password"
              className="w-100"
              ref={confirmPassword}
            />
            <Button
              name="Save Changes"
              className="h-9 mt-4"
              handler={handlePasswordChange}
            />
          </div>
        </div>
          
      </div>
          
    </>
  );
};

export default Profile;
