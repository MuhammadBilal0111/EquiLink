import { Link } from "react-router";
import Button from "./elements/Button";
import Hero from "./elements/Hero";
import Blocks from "./elements/Blocks"
import CTO from "./elements/CTO"

const Landing = () => {
  return (
    <div className="relative bg-black h-screen w-full">
      <img
        src="/Style2.jpg"
        alt="Background"
        className="absolute top-28 left-0 w-full h-full"
      />

      {/* NAV */}
      <div className="z-10 relative flex h-20">
        <Link>
          <img
            className="relative w-[120px] h-[30px] top-[25px] left-[40px]"
            src="/FullLogo.png"
            alt="logo"
          />
        </Link>
        <Link to="/login">
          <Button
            name={"Login"}
            className={"absolute right-[40px] top-[25px] w-[120px] h-[30px"}
          />
        </Link>
      </div>


      {/* Main Page */}
      <div className="flex flex-col justify-center items-center bg-black font-poppins">
        <Hero/>
        <Blocks/>
        <CTO/>
      </div>
    </div>
  );
};

export default Landing;
