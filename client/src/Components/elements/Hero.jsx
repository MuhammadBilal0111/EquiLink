import { Link } from "react-router";
import Button from "./Button";

const Hero = ()=>{
    return (
        <div className="flex flex-col text-white justify-center items-center gap-9 z-10 w-[800px] mt-20 font-poppins mb-10">
          <div className="flex gap-10 text-sm text-[#9C9C9C] border-b-[#9c9c9c]">
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
            <p className="text-[#CCCCCC] text-center text-sm">
              Lorem ipsum is a dummy or placeholder text commonly used in
              graphic design, publishing, and web development to fill empty
              spaces in a layout that does not yet have content.
            </p>
          </div>

          <div className="mb-10">
            <Link to="/signup">
                <Button name={"Get Started"} className={"font-bold"}></Button>
            </Link>
          </div>
          <div>
            {/* <img src="" alt="" /> */}
            <div className="bg-gray-300 h-[30rem] w-[60rem] rounded-2xl" ></div>
          </div>
        </div>
    )
}

export default Hero