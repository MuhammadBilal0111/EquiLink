import React from 'react'

const TransactionBlock = () => {
  return (
    <div className='text-white mt-30 max-w-[70%] flex flex-col items-center'>
    <h2 className="text-5xl self-start font-poppins text-center mb-6">
        QUICK AND SECURE</h2>
    <h2 className="text-5xl self-center text-center mb-6">
        <span className="px-4 border border-white rounded-full">TRANSACTIONS</span>
    </h2>

     {/* Content Section */}
      <div className="flex flex-col justify-between items-center w-full max-w-6xl">

      <p className="text-sm text-[#cccccc] py-5">
        In Equilink, Web3 technology ensures no third-party involvement in transactions, making the 
        investment process more secure and efficient. Ensuring transparency and helping avoid malicious activities.  
      </p>

      {/* Right Video & Image */}
      <div className='w-full h-[28rem] mt-14 relative'>
      <video src="Transaction.mp4" className="w-full h-full object-cover rounded-lg shadow-lg" autoPlay loop muted />
      <img src="Coins.png" alt="coins" className="absolute top-96 w-40" />
      </div>
      
    </div>
     </div>
  )
}

export default TransactionBlock