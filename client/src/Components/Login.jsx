import React from 'react'
import { useRef } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios"
import { useDispatch } from 'react-redux';
import InputField from "./elements/InputField";
import Button from "./elements/Button";
import { Link } from 'react-router-dom';

const Login = () => {
    
    const navigate = useNavigate()
    const dispatch = useDispatch();

    const emailRef = useRef(null)
    const passwordRef = useRef(null)


    const onSubmit = async ()=>{
        const data = {email: emailRef.current?.value, password: passwordRef.current?.value}
        try {
            const res = await axios.post("http://localhost:5000/api/auth/login", data , {
              headers: { "Content-Type": "application/json" },
            });
            if (res.data.status === true) {
              dispatch(userActions.setUser(res.data.data.user)); // Dispatching user data to Redux store
              console.log(res.data)
              navigate('/')
            } else {
              console.log("error")
            }
          } catch (err) {
            console.log(err)
          }
    }

    return (
        <>
            <div className="relative bg-black h-screen w-full">
                {/* Background Image */}
                <img 
                    src="/Style1.jpg" 
                    alt="Background" 
                    className="absolute top-28 left-0 w-full h-full"
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
                        <img className="absolute z-1 max-h-[110vh] right-15" src="/BlurRectangle.png" alt="loginForm" />
                        <img className="absolute z-2 right-15 max-h-[110vh]" src="Net.jpg" alt="" />

                        <div className="absolute right-30 flex flex-col gap-8 items-center z-10 mt-24">
                            <div className='self-start'>
                                <img className="w-[50px] h-[40px]" src="/LOGO.png" alt="" />
                                <h1 className="font-poppins text-[30px] w-[300px] text-[#ffffff]">
                                    Login towards a revolutionary World!
                                </h1>
                            </div>

                            <div className="flex flex-col gap-1">
                                <InputField label="Email" ref={emailRef} placeholder="Enter your email" />
                                <InputField label="Password" ref={passwordRef} placeholder="Enter your password" />
                            </div>

                            <div className="w-full flex flex-col justify-center items-center gap-3">
                                <Button name="Login" handler={onSubmit} className="w-full max-w-80 max-h-[2rem]" />
                                <p className='text-sm text-white'>Don’t have an account? <Link to={'/signUp'}>Signup</Link></p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Login;
