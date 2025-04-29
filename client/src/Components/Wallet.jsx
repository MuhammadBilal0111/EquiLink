import { FaEthereum } from "react-icons/fa";
import Button from "./elements/Button";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { profileActions } from "@/store";
import { connectWallet } from "@/services/blockchain";

function Wallet() {
  const dispatch = useDispatch();
  const { walletAddress } = useSelector((state) => state.profileStore);
  // wallet connection handler
  const handleWalletConnect = async () => {
    const walletAddress = await connectWallet();
    dispatch(profileActions.setWalletAddress(walletAddress));
    console.log(walletAddress);
  };
  return (
    <div className="flex min-h-screen items-center justify-center w-full  text-white">
      <div className="w-full max-w-md rounded-2xl p-8 shadow-lg">
        <div className="flex flex-col items-center space-y-10">
          <FaEthereum className="text-6xl text-blue-400" />
          <h1 className="text-2xl font-semibold">Connect Your Wallet</h1>
          <p className="text-gray-400 text-center">
            Securely connect your Metamask wallet to access blockchain features.
          </p>
          {walletAddress ? (
            <div className="w-full rounded-lg bg-gray-800 p-4 text-center text-lg font-medium text-green-400">
              Connected: {walletAddress.substring(0, 6)}...
              {walletAddress.slice(-4)}
            </div>
          ) : (
            <Button handler={handleWalletConnect} name={"Connect Wallet"} />
          )}
        </div>
      </div>
    </div>
  );
}
export default Wallet;
