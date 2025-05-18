import { Link } from "react-router-dom";
import Tilt from "react-parallax-tilt";
import Button from "./Button";

const Hero = () => {
  return (
    <div className="flex flex-col text-white justify-center items-center gap-9 z-10 w-[800px] mt-12 font-poppins mb-10">
      <div className="flex gap-10 text-sm">
        <span className="p-2 px-10 border rounded-[20px]">Blockchain Based</span>
        <span className="p-2 px-10 border rounded-[20px]">Promoting Web 3.0</span>
      </div>

      <div className="text-6xl text-center">
        EquiLink - A Revolutionary Crowdfunding Platform
      </div>

      <div>
        <p className="text-[#dedddd] text-center text-sm">
          We provide a secure and decentralized ecosystem where entrepreneurs can pitch their ideas and raise funds directly from investors using blockchain technology.
        </p>
      </div>

      <div className="mb-10">
        <Link to="/login">
          <Button name={"Get Started"} className={"font-medium py-1"} />
        </Link>
      </div>

      <div>
        <Tilt tiltMaxAngleX={15} tiltMaxAngleY={15} scale={1.05} transitionSpeed={450}>
          <div className="flex h-[34rem] w-[55rem] justify-center">
            <img src="DashboardSS.png" alt="Dashboard Screenshot" className="h-full object-cover rounded-lg shadow-lg" />
          </div>
        </Tilt>
      </div>
    </div>
  );
};

export default Hero;
