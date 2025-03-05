const Blocks = () => {
  return (
    <div className="bg-black text-white p-10 mt-36">
      <h2 className="text-5xl font-poppins text-center mb-25">
        Our Motivation for Revolution
      </h2>

      <div className="flex justify-center items-center">
      <div className="grid grid-cols-3 grid-rows-3 gap-3 w-3/4 relative">
        <div className="col-span-2 row-span-2 border-2 border-black h-40"><img src="/Pitch.jpg" alt="" /></div>
        <div className="row-span-3 border-2 border-black">
            <video className="absolute top-20 right-[15px] w-[50] h-[150px] object-cover" autoPlay muted loop src="/BlockVid.mp4"></video>
            <img className="" src="/BlockBg.jpg" alt="" />
        </div>
        <div className="border-2 border-black h-20"><img src="/FogBlock.jpg" alt="" /></div>
        <div className="border-2 border-black h-20"><img src="PaymentPic.jpg" alt="" /></div>
      </div>
    </div>
    </div>
  );
};

export default Blocks;
