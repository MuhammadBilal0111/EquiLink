const Blocks = () => {
  return (
    <div className="bg-black text-white p-8 mt-24 flex flex-col items-center">
      {/* Heading */}
      
      <div className="flex flex-col max-w-[70%]">
      <h2 className="text-5xl self-start font-poppins text-center mb-6">
        PITCH YOUR <span className="px-4 border border-white rounded-full">IDEAS</span>
      </h2>
      <p className="text-[#cccccc] text-sm py-6">
          Through short videos, pictures, and descriptions, e-commerce startups can showcase their vision, while investors can explore and invest in these businesses securely, bypassing traditional intermediaries.
      </p>
      </div>

      {/* Image with proper alignment */}
      <img src="PitchSS.jpg" alt="Pitch" className="h-[28rem] rounded-2xl mt-6" />
    </div>
  );
};

export default Blocks;

