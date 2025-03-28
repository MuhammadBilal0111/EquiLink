import { toast } from "sonner";
import { structuredProjects, generateSlug } from "@/lib/utils";
import { ethers, parseEther } from "ethers";
import address from "../../contract/artifacts/contractAddress.json";
import abi from "../../contract/artifacts/contracts/Genesis.sol/Genesis.json";
import { useDispatch } from "react-redux";
import { profileActions } from "@/store";

const contractAddress = address.address;
const contractAbi = abi.abi;
const { ethereum } = window;

export const connectWallet = async () => {
  try {
    if (!ethereum) {
      toast.error("Make sure you have metamask installed!");
      return;
    }
    const accounts = await ethereum.request({ method: "eth_requestAccounts" });
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

      // Update wallet connectedAccount when account changes
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

// getting ethereum contract
export const getEthereumContract = async (walletAddress) => {
  let connectedAccount;
  try {
    if (!walletAddress) {
      connectedAccount = await connectWallet();
    }
    if (!connectedAccount) {
      toast.error("Error connecting to MetaMask");
      throw new Error("MetaMask Connection Error: No connected account found");
    }
    const provider = new ethers.BrowserProvider(window.ethereum);
    const signer = await provider.getSigner();
    return new ethers.Contract(contractAddress, contractAbi, signer);
  } catch (error) {
    console.error("Failed to get Ethereum contract:", error);
    toast.error("Failed to get Ethereum contract:");
  }
};
// function to create the project
export const createProject = async ({
  connectedAccount,
  title,
  description,
  category,
  ownerName,
  equity,
  cost,
}) => {
  try {
    if (!ethereum) return toast.error("Please install Metamask");
    const contract = await getEthereumContract(connectedAccount);
    if (!contract) {
      ToastFailure("Failed to connect to the contract.");
      return;
    }
    equity = ethers.parseUnits(equity.toString(), 18); // Scale to 18 decimals
    cost = parseEther(cost);
    const slug = generateSlug(title);
    const tx = await contract.createProject(
      title,
      description,
      category,
      ownerName,
      slug,
      equity,
      cost
    );
    await tx.wait();
    const projects = await loadProjects(); // for testing
    return projects[projects.length - 1];
  } catch (error) {
    console.log(error);
    toast.error("Error in loading the data in contract");
  }
};
export const loadProjects = async (connectedAccount) => {
  try {
    if (!ethereum) return toast.error("Please install Metamask");
    const contract = await getEthereumContract(connectedAccount);
    console.log(contract);
    if (!contract) {
      toast.error("Failed to connect to the contract.");
      return;
    }
    const projects = await contract.getProjects();
    console.log("contract data", structuredProjects(projects));
    return structuredProjects(projects);
  } catch (error) {
    console.log(error);
    toast.error("Error in loading the data in contract");
  }
};
export const loadProject = async (connectedAccount, id) => {
  try {
    if (!ethereum) return toast.error("Please install Metamask");
    const contract = await getEthereumContract(connectedAccount);
    if (!contract) {
      ToastFailure("Failed to connect to the contract.");
      return;
    }
    const project = await contract.getProjectById(id);
    return structuredProjects([project])[0];
  } catch (error) {
    console.log(error);
    toast.error("Error in loading the data in contract");
  }
};

export const backProject = async (
  connectedAccount,
  id,
  amount,
  investorName,
  equity
) => {
  // Check if MetaMask is available
  if (!ethereum) return toast.error("Please install Metamask");
  const contract = await getEthereumContract(connectedAccount); // Assuming getEtheriumContract() returns a contract instance
  if (!contract) {
    toast.error("Failed to connect to the contract.");
    return;
  }
  amount = ethers.parseEther(amount.toString());
  equity = ethers.parseUnits(equity.toString(), 18);
  try {
    const tx = await contract.backProject(id, investorName, equity, {
      from: connectedAccount,
      value: amount,
    });

    console.log("Transaction Hash:", tx.hash); // Log transaction hash for debugging
    toast.success("Transaction Completed!");

    await tx.wait(); // Wait for the transaction to be mined
    return tx;
  } catch (error) {
    console.error("Error in backing project:", error);
    toast.error("An error occurred while backing the project.");
  }
};

// function to get all backers
export const getProjectBacker = async (connectedAccount, id) => {
  try {
    if (!ethereum) {
      toast.error("Please install Metamask");
      return;
    }
    const contract = await getEthereumContract(connectedAccount);
    if (!contract) {
      toast.error("Failed to connect to the contract.");
      return;
    }
    const backer = await contract?.getBacker(id);
    return structuredProjects([backer])[0];
  } catch (error) {
    console.log(error);
    toast.error("Error in Backing the project");
  }
};
