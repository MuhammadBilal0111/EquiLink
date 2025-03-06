import Button from "./Button";
import { Link } from "react-router";

const CTO = () => {
  return (
    <div className="relative bg-[url('/BlueGradient.jpg')] bg-cover bg-center h-[25rem] w-full flex flex-col items-center justify-center gap-8 mt-60">
      <div className="relative text-white text-5xl z-10 font-poppins">
        Join our Blockchain Community!
      </div>
      <div className="text-center text-[#ADADAD] w-[50%]">
        Lorem ipsum is a dummy or placeholder text commonly used in graphic
        design, publishing, and web development.
      </div>
      <div>
        <Link to="/signup">
          <Button
            name={"Signup Today"}
            className={"w-[14rem] h-[2.5rem]"}
          ></Button>
        </Link>
      </div>
    </div>
  );
};

export default CTO;
