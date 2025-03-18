import React from 'react'
import { useRef } from "react";
import { useNavigate } from "react-router-dom";
import {axiosInstance} from "./../lib/axios.js"
import InputField from "./elements/InputField";
import Button from "./elements/Button";
import { Link } from 'react-router-dom';
import InputRadio from './elements/InputRadio';
import { useDispatch } from 'react-redux';
import { userActions } from './../store/index.js';
import { useState } from 'react';
import { toast, Toaster } from 'sonner';


const Signup = () => {

    const dispatch = useDispatch()

    const emailRef = useRef(null);
    const nameRef = useRef(null);
    const phoneRef = useRef(null);
    const passwordRef = useRef(null);
    const cPasswordRef = useRef(null);
    const [role, setRole] = useState("Entrepreneur"); // Default value


    const navigate = useNavigate()

    const onSubmit = async () => {

        const email = emailRef.current?.value
        const password = passwordRef.current?.value
        const contactNo =  phoneRef.current?.value
        const name = nameRef.current?.value

        if(!email || !password || !contactNo || !name){
            toast.error("Please fill all the fields")
            return;
        }
        const data = { email,password,name, role}

        if(data.password != cPasswordRef.current.value){
            console.log("Password and confirm Password are not same")
            toast.error("Password and Confirm Password do not match");
            return;
        }
        try {
            const res = await axiosInstance.post("/auth/signup", data)
            if (res.data.status === true) {
              dispatch(userActions.setUser(res.data.data));
              toast.success("Signed up successfully!")
              navigate('/home')
            } else {
            toast.error("Something went wrong");
            }
          } catch (err) {
            toast.error(err.message);
          }
    }

    return (
        <>
            <div className="relative bg-black w-full h-screen flex flex-col">
                {/* Background Image */}
                <img
                    src="/Style2.jpg"
                    alt="Background"
                    className="absolute top-[-150px] left-0 w-full h-[1000px]"
                />

                {/* LOGO */}
                <div className="z-10 relative">
                    <Link to="/">
                        <img
                            className="relative w-[120px] h-[30px] top-[25px] left-[40px]"
                            src="/FullLogo.png"
                            alt="logo"
                        />
                    </Link>
                </div>

                {/* main page */}
                <div className="flex mx-5 gap-3 relative z-10">
                    <div className="w-[60%]"></div>

                    {/* right side */}
                    <div className="relative w-[40%]">
                        {/* <img className="absolute z-1 max-h-[130vh] right-10" src="/BlurRectangle.png" alt="loginForm" /> */}
                        <img className="absolute z-2 right-15 max-h-[132vh]" src="Net2.png" alt="" />

                        <div className="absolute right-30 flex flex-col gap-2 items-center z-10 mt-18">
                            <div className='self-start mb-2'>
                                <img className="w-[50px] h-[40px]" src="/LOGO.png" alt="" />
                                <h1 className="font-poppins text-[30px] w-[300px] text-[#ffffff]">
                                    Let’s Create Account!
                                </h1>
                            </div>

                            <div className="flex flex-col mb-3">
                                <InputField label="Name" ref={nameRef} type="text" placeholder="Enter your full name" />
                                <InputField label="Email" ref={emailRef} type="email" placeholder="Enter your email" />
                                <InputField label="Phone" ref={phoneRef} type="tel" placeholder="Enter your phone number" />
                                <InputField label="Password" ref={passwordRef} type="password" placeholder="Enter your password" />
                                <InputField label="Confirm Password" ref={cPasswordRef} type="password" placeholder="Re-enter your password" />
                                <InputRadio option1="Entrepreneur" option2="Investor" setValue={setRole} />

                            </div>

                            <div className="w-full flex flex-col justify-center items-center gap-3">
                                <Button name="Signup" handler={onSubmit} className="w-full max-w-80 max-h-[2rem]" />
                                <p className='text-sm text-white'>Already have an account? <Link to={'/login'}>Login</Link></p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Signup;