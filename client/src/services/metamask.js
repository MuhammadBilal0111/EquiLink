import { toast } from "sonner";
import { useDispatch } from "react-redux";
import { profileActions } from "@/store";

const { ethereum } = window;

export const connectWallet = async () => {
  try {
    if (!ethereum) {
      toast.error("Make sure you have metamask installed!");
      return;
    }
    const accounts = await ethereum.request({ method: "eth_requestAccounts" });
    toast.success("Wallet has been successfully connected!");
    return accounts[0]?.toLowerCase();
  } catch (error) {
    toast.error("Error in connecting MetaMask");
    console.log(error);
  }
};

// function for connecting the wallet
export const isWalletConnected = async () => {
  const dispatch = useDispatch();
  try {
    if (!ethereum) {
      toast.error("Please install MetaMask");
      return;
    }

    const accounts = await ethereum.request({ method: "eth_accounts" });

    if (accounts.length === 0) {
      toast.error("Please connect your wallet.");
      console.log("No accounts found.");
      return;
    }

    const walletAddress = accounts[0].toLowerCase();
    dispatch(profileActions.setWalletAddress(walletAddress));

    console.log("Connected Wallet:", walletAddress);

    // Ensure event listeners are added only once
    if (!ethereum._eventsAdded) {
      ethereum._eventsAdded = true; // Flag to prevent duplicate listeners

      // Reload the page on network change
      ethereum.on("chainChanged", () => {
        window.location.reload();
      });

      // Update wallet address when account changes
      ethereum.on("accountsChanged", async (newAccounts) => {
        if (newAccounts.length) {
          const newWalletAddress = newAccounts[0].toLowerCase();
          dispatch(profileActions.setWalletAddress(newWalletAddress));
          console.log("Wallet changed to:", newWalletAddress);
        } else {
          dispatch(profileActions.setWalletAddress(null));
          toast.error("Wallet disconnected.");
        }
      });
    }
  } catch (error) {
    toast.error("Error connecting to MetaMask");
    console.error("MetaMask Connection Error:", error);
  }
};
