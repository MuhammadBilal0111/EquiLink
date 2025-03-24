import React from 'react'

const Blockchain = () => {
  return (
    <div className='text-white mt-32 max-w-[70%] flex flex-col items-center'>
    <h2 className="text-5xl self-start font-poppins text-center mb-6">
        WE DO BLOCKCHAIN</h2>
    <h2 className="text-5xl self-center text-center mb-6">
        FOR <span className="px-4 border border-white rounded-full">INVESTMENT</span>
    </h2>

     {/* Content Section */}
      <div className="flex justify-between items-center w-full max-w-6xl">
      {/* Left Text & Logo */}
      <div className="w-2/6 absolute z-40">
        <img src="FullLogo.png" alt="EquiLink Logo" className="h-10 mb-14" />
        <p className="text-sm text-[#cccccc]">
          Web3 technology ensures no third-party involvement in transactions, making the 
          investment process more secure and efficient. It provides a secure and decentralized ecosystem where entrepreneurs can pitch their ideas and raise funds directly from investors using blockchain technology.
        </p>
      </div>

      {/* Right Video & Image */}
      <div className="relative w-5/6 left-[21rem]">
        <video src="BlockVid.mp4" className="w-full rounded-lg shadow-lg" autoPlay loop muted />
        <img src="QualityNet.png" alt="3D Cube" className="absolute top-10 left-40 w-96 opacity-90" />
      </div>
    </div>
     </div>
  )
}

export default Blockchain
