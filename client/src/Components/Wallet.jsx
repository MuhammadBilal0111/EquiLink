import React from "react";
import Button from "./elements/Button";
import { connectWallet } from "@/services/metaMask";
import { useState } from "react";
import { FaEthereum } from "react-icons/fa";

const Wallet = () => {
  const [account, setAccount] = useState(null);
  const handleWalletConnection = async () => {
    const walletAddress = await connectWallet();
    setAccount(walletAddress);
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
          {account ? (
            <div className="w-full rounded-lg bg-gray-800 p-2 text-center text-lg font-medium text-green-400">
              Connected: {account.substring(0, 6)}...{account.slice(-4)}
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
