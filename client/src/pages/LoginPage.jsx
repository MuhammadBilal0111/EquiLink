import { useRef } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios"




const LoginPage = () => {

    const navigate = useNavigate()

    const onSubmit = async ()=>{
        const data = {email: emailRef.current?.value, password: passwordRef.current?.value}
        console.log(data)
        try{
            // const res = await axios.post("http://localhost:5000/api/auth/login", data, {  headers: {
            //     "Content-Type": "application/json"
            // }})

            const res = {data:{status:"success", name:"ahad"}}
            if(res.data.status == "success"){
                console.log(res.data.name)
                navigate("/")
                console.log("here")
            }
        }catch(err){
            console.log("Login failed", err)
        }
    }

    const emailRef = useRef(null)
    const passwordRef = useRef(null)

  return (
    <>

      <div className="bg-[url('/Style1.jpg')] bg-cover bg-center h-screen w-full">

        {/* LOGO */}
        <div className="z-10">
          <div>
            <img
              className="relative w-[160px] h-[40px] top-[15px] left-[15px]"
              src="/FullLogo.png"
              alt="logo"
            />
          </div>
        </div>


        {/* main page */}
        <div className="flex m-5 gap-3">
            <div className="w-[60%]"></div>

            {/* right side */}

            <div className="relative w-[40%]">
                <img className="absolute z-1 max-h-[90vh]" src="/BlurRectangle.png" alt="loginForm"/>
                {/* <img className="absolute z-2 max-h-[90vh]" src="Net.jpg" alt="" /> */}

                <img className="relative w-[50px] h-[40px] mt-15 z-10" src="/LOGO.png" alt="" />

                <div className="absolute flex flex-col gap-8 justify-center items-center z-10 mt-2">
                    <h1 className="font-poppins text-[30px] w-[300px] text-[#ffffff]">Login towards a revolutionary World!</h1>

                    <div className="flex flex-col gap-3 text-white text-sm">
                        <span>Email</span>
                        <input ref={emailRef} type="text" placeholder="Enter your email" className="bg-[#262626] rounded-[8px] h-[2rem] w-80 mb-5 p-3"/>

                        <span>Password</span>
                        <input ref={passwordRef} type="text" placeholder="Enter your password" className="bg-[#262626] rounded-[8px] h-[2rem] w-80 p-3"/>
                    </div>

                    <button className="absolute z-10 bg-red-500" onClick={()=>{onSubmit()}} >Login</button>
                </div>

            </div>
        </div>


      </div>
    </>
  );
};

export default LoginPage;
