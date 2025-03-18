import React from "react";
import Button from "./elements/Button";
import { connectWallet } from "@/services/metaMask";
import { FaEthereum } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { profileActions } from "@/store";

const Wallet = () => {
  const dispatch = useDispatch();
  const { walletAddress } = useSelector((state) => state?.profileStore);
  console.log("wallet", walletAddress);

  const handleWalletConnection = async () => {
    const walletAddress = await connectWallet();
    dispatch(profileActions.setWalletAddress(walletAddress));
  };

  return (
    <div className="flex min-h-screen w-full items-center justify-center text-white">
      <div className="w-full max-w-md rounded-2xl p-8 shadow-lg">
        <div className="flex flex-col items-center space-y-6">
          <FaEthereum className="text-6xl text-blue-400" />
          <h1 className="text-2xl font-semibold">Connect Your Wallet</h1>
          <p className="text-gray-400 text-center">
            Securely connect your Metamask wallet to access blockchain features.
          </p>
          {walletAddress ? (
            <div className="w-full rounded-lg bg-gray-800 p-2 text-center text-lg font-medium text-green-400">
              Connected: {walletAddress?.substring(0, 9)}...
              {walletAddress?.slice(-4)}
            </div>
          ) : (
            <Button
              onClick={handleWalletConnection}
              name={"Connect Wallet"}
              handler={handleWalletConnection}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default Wallet;
