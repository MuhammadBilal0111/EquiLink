import { Link } from "react-router";
import Button from "./Button";

const Hero = ()=>{
    return (
        <div className="flex flex-col text-white justify-center items-center gap-9 z-10 w-[800px] mt-12 font-poppins mb-10">
          <div className="flex gap-10 text-sm">
            <span className="p-2 px-10 border rounded-[20px]">
              Blockchain Based
            </span>
            <span className="p-2 px-10 border rounded-[20px]">
              Promoting Web 3.0
            </span>
          </div>

          <div className="text-6xl text-center">
            Equilink - A revolutionary Crowd Funding Platform
          </div>

          <div>
            <p className="text-[#dedddd] text-center text-sm">
            We provides a secure and decentralized ecosystem where entrepreneurs can pitch their ideas and raise funds directly from investors using blockchain technology.
            </p>
          </div>

          <div className="mb-10">
            <Link to="/login">
                <Button name={"Get Started"} className={"font-medium py-1"}></Button>
            </Link>
          </div>
          <div>
            {/* <img src="" alt="" /> */}
            <div className="flex h-[34rem] w-[55rem] justify-center" >
              <img src="DashboardSS.png" alt=""  className=" h-full object-cover"/>
            </div>
          </div>
        </div>
    )
}

export default Hero