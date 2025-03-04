import React from 'react'
import { useRef } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios"
import InputField from "./elements/InputField";
import Button from "./elements/Button";
import { Link } from 'react-router-dom';
import InputRadio from './elements/InputRadio';

const Signup = () => {
    const navigate = useNavigate()

    const onSubmit = async () => {
        const data = { email: emailRef.current?.value, password: passwordRef.current?.value }
        console.log(data)
        try {
            // const res = await axios.post("http://localhost:5000/api/auth/login", data, {  headers: {
            //     "Content-Type": "application/json"
            // }})

            const res = { data: { status: "success", name: "ahad" } }
            if (res.data.status == "success") {
                console.log(res.data.name)
                navigate("/")
                console.log("here")
            }
        } catch (err) {
            console.log("Login failed", err)
        }
    }

    const emailRef = useRef(null)
    const passwordRef = useRef(null)

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
                    <Link>
                        <img
                            className="relative w-[120px] h-[30px] top-[25px] left-[40px]"
                            src="/FullLogo.png"
                            alt="logo"
                        />
                    </Link>
                </div>

                {/* main page */}
                <div className="flex m-5 gap-3 relative z-10">
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
                                <InputField label="Name" ref={emailRef} placeholder="Enter your full name" />
                                <InputField label="Email" ref={emailRef} placeholder="Enter your email" />
                                <InputField label="Phone" ref={passwordRef} placeholder="Enter your phone number" />
                                <InputField label="Password" ref={passwordRef} placeholder="Enter your password" />
                                <InputField label="Confirm Password" ref={passwordRef} placeholder="Re-enter your password" />
                                <InputRadio option1={"Entrepreneur"} option2={"Investor"} />
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

export default Signup