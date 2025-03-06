const Blocks = () => {
  return (
    <div className="bg-black text-white p-10 mt-36">
      <h2 className="text-5xl font-poppins text-center mb-25">
        Our Motivation for Revolution
      </h2>

      <div className="flex justify-center items-center">
        <div className="grid grid-cols-3 grid-rows-3 gap-x-3 w-3/4 relative">
          <div className="col-span-2 row-span-2 border-2 border-black h-40"><img src="/Pitch.jpg" alt="" /></div>
          <div className="row-span-3 border-2 border-black">
            <div className="absolute top-8 right-8 w-62 h-62 overflow-hidden">
              <video className="w-full h-full object-cover" autoPlay muted loop src="/BlockVid.mp4"></video>
            </div>
            <img className="" src="/BlockBg.jpg" alt="" />
          </div>
          <img src="/FogBlock.jpg" className="h-40 w-76" alt="" />
          <img src="PaymentPic.jpg" className="h-40" alt="" />
        </div>
      </div>
    </div>
  );
};

export default Blocks;
