
import React, { useState, useRef } from "react";
import { Link } from "react-router";
import InputField from "./elements/InputField";
import Button from "./elements/Button";
import { IoMdCloseCircle } from "react-icons/io";
import TextArea from "./elements/TextArea";
import SelectField from "./elements/SelectField";
import axios from "axios";
import { axiosInstance } from "@/lib/axios";

const AddPitch = () => {
    const [imageFiles, setImageFiles] = useState([]);
    const [videoFile, setVideoFile] = useState(null);
    const [pdfFile, setPdfFile] = useState(null);

    // Refs for form fields
    const nameRef = useRef(null);
    // const categoryRef = useRef(null);
    const [category, setCategory] = useState("");
    const askForProjectRef = useRef(null);
    const equityRef = useRef(null);
    const projectDescriptionRef = useRef(null);

    const handleFileChange = (event, setFiles, multiple = false) => {
        const files = Array.from(event.target.files);
        setFiles(multiple ? (prev) => [...prev, ...files] : files[0]);
    };

    const removeFile = (index, setFiles) => {
        setFiles((prev) => prev.filter((_, i) => i !== index));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // console.log("Title:", nameRef.current.value);
        // // console.log("Category:", categoryRef.current.value);
        // console.log("Category:", category);
        // console.log("Funding Goal:", askForProjectRef.current.value);
        // console.log("Equity:", equityRef.current.value);
        // console.log("Description:", projectDescriptionRef.current.value);

        // console.log("PDF File:", URL.createObjectURL(pdfFile));
        // console.log("Video File:", URL.createObjectURL(videoFile));
        // imageFiles.forEach((image, index) => {
        //     console.log("Image Files:", URL.createObjectURL(image));
        // });

        // Gather form data
        const formData = new FormData();
        formData.append("title", nameRef.current.value);
        formData.append("category", category);
        formData.append("fundingGoal", askForProjectRef.current.value);
        formData.append("equity", equityRef.current.value);
        formData.append("description", projectDescriptionRef.current.value);

        formData.append("projectFile", pdfFile);
        formData.append("pitchVideo", videoFile);

        imageFiles.forEach((image, index) => {
            formData.append("pitchImages", image);
        });

        // const imageArray = [];

        // imageFiles.forEach((image) => {
        //     imageArray.push(URL.createObjectURL(image));
        // });



        // formData.append("projectFile", URL.createObjectURL(pdfFile));
        // formData.append("pitchVideo", URL.createObjectURL(videoFile));
        // formData.append("pitchImages", imageArray)



        for (let [key, value] of formData.entries()) {
            console.log(key, value);
        }

        
        try {
            const response = await axiosInstance.post("/startups/create-startup", formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            });
            console.log("Formdata after hit:", formData);

            console.log("Response:", response.data);
            console.log("Pitch submitted successfully!");
        } catch (error) {
            console.error("Error submitting pitch:", error);
            console.log("Error submitting pitch. Please try again.");
        }
    };

    return (
        <div className="w-full bg-[#0A0A0A] flex text-white p-2">
            <Link to={'/'}>
                <img className="relative w-[120px] h-[30px] left-5 top-3 " src="/FullLogo.png" alt="logo" />
            </Link>
            <div className="w-4/5 mt-2">
                <div className="flex flex-col items-center gap-2 justify-center border-b border-b-[#3F3F3F] my-12">
                    <h2 className="text-2xl">Add New Pitch</h2>
                    <p className="text-[#C5C5C5] text-sm mb-4">
                        Add an impressive pitch with video and images related to your idea to impress investors.
                    </p>
                </div>

                {/* Form Fields */}
                <form onSubmit={handleSubmit} className="flex flex-col gap-y-6">
                    <div className="flex gap-x-16">
                        <InputField
                            label="Name"
                            placeholder="Give unique name to your product idea"
                            className="w-115"
                            type="text"
                            ref={nameRef}
                        />
                        <SelectField
                            label="Category"
                            placeholder="Select category of your product"
                            className="w-115"
                            onChange={setCategory}
                        // ref={categoryRef}
                        />
                    </div>

                    <div className="flex gap-x-16">
                        <InputField
                            label="Ask for Project (coins)"
                            placeholder="Enter your ask for project"
                            className="w-115"
                            type="number"
                            ref={askForProjectRef}
                        />
                        <InputField
                            label="Equity (%)"
                            placeholder="Enter percentage of equity you offer"
                            className="w-115"
                            type="number"
                            ref={equityRef}
                        />
                    </div>

                    <div className="flex gap-x-16">
                        <TextArea
                            label="Project Description"
                            placeholder="Enter description for your project"
                            className="w-115"
                            ref={projectDescriptionRef}
                        />
                        {/* PDF Upload */}
                        <div>
                            <h2 className="text-sm mb-2">Upload Project File (PDF)</h2>
                            <label htmlFor="upload-pdf">
                                <div className="border rounded-xl border-dotted border-primary bg-[#262626] h-[80px] w-[80px] cursor-pointer flex items-center justify-center">
                                    <h2 className="text-4xl font-light text-white">+</h2>
                                </div>
                            </label>
                            <input type="file" id="upload-pdf" className="hidden" accept=".pdf" onChange={(e) => handleFileChange(e, setPdfFile)} />
                            {/* Display PDF File */}
                            {pdfFile && (
                                <div className="mt-2 flex items-center gap-2">
                                    <p className="text-sm">{pdfFile.name}</p>
                                    <IoMdCloseCircle className="text-xl text-white cursor-pointer" onClick={() => setPdfFile(null)} />
                                </div>
                            )}
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-12">
                        {/* Video Upload */}
                        <div>
                            <h2 className="text-sm mb-2">Pitch Video</h2>
                            <div className="flex gap-4 items-center">
                                <label htmlFor="upload-video">
                                    <div className="border rounded-xl border-dotted border-primary bg-[#262626] h-[80px] w-[80px] cursor-pointer flex items-center justify-center">
                                        <h2 className="text-4xl font-light text-white">+</h2>
                                    </div>
                                </label>
                                <input type="file" id="upload-video" className="hidden" accept="video/*" onChange={(e) => handleFileChange(e, setVideoFile)} />
                                {/* Display Video */}
                                {videoFile && (
                                    <div className="relative w-[140px] h-[90px]">
                                        <video className="w-full h-full rounded-xl" controls>
                                            <source src={URL.createObjectURL(videoFile)} type={videoFile.type} />
                                            Your browser does not support the video tag.
                                        </video>
                                        <IoMdCloseCircle className="absolute top-0 right-0 m-2 text-xl text-white cursor-pointer" onClick={() => removeFile(index, setVideoFiles)} />
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Images Upload */}
                        <div>
                            <h2 className="text-sm mb-2">Related Pictures</h2>
                            <div className="flex gap-4">
                                <label htmlFor="upload-images">
                                    <div className="border rounded-xl border-dotted border-primary bg-[#262626] h-[80px] w-[80px] cursor-pointer flex items-center justify-center">
                                        <h2 className="text-4xl font-light text-white">+</h2>
                                    </div>
                                </label>
                                <input type="file" multiple id="upload-images" className="hidden" accept="image/*" onChange={(e) => handleFileChange(e, setImageFiles, true)} />
                                {/* Display Images */}
                                {imageFiles.map((image, index) => (
                                    <div key={index} className="relative h-[80px] w-[80px]">
                                        <img src={URL.createObjectURL(image)} className="h-full w-full object-cover rounded-xl" alt="Related" />
                                        <IoMdCloseCircle className="absolute top-0 right-0 m-2 text-xl text-white cursor-pointer" onClick={() => removeFile(index, setImageFiles)} />
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Submit Button */}
                    <div className="my-12 flex justify-end">
                        <Button name="Submit Pitch" className="h-10" handler={handleSubmit} />
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AddPitch;


