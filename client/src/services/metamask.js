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
export const getEthereumContract = async (connectedAccount) => {
  try {
    if (!connectedAccount) {
      toast.error("Error connecting to MetaMask");
      throw new Error("MetaMask Connection Error: No connected account found");
    }

    const provider = new ethers.BrowserProvider(window.ethereum);
    const signer = await provider.getSigner();
    return new ethers.Contract(contractAddress, contractAbi, signer);
  } catch (error) {
    console.error("Failed to get Ethereum contract:", error);
    throw error;
  }
};

export const createProject = async ({
  connectedAccount,
  title,
  description,
  ownerName,
  equity,
  cost,
}) => {
  try {
    if (!ethereum) return toast.error("Please install Metamask");
    const contract = await getEthereumContract(connectedAccount);
    cost = parseEther(cost);
    const tx = await contract.createProject(
      title,
      description,
      slug,
      ownerName,
      equity,
      cost
    );
    await tx.wait();
    await loadProjects();
    return true;
  } catch (error) {
    console.log(error);
    toast.error(error.message);
  }
};
const loadProjects = async (connectedAccount) => {
  try {
    if (!ethereum) return toast.error("Please install Metamask");

    const contract = await getEthereumContract(connectedAccount);
    const projects = await contract.getProjects();
    return structuredProjects(projects);
  } catch (error) {
    console.log(error);
    toast.error(error.message);
  }
};
export const loadProject = async ({ connectedAccount, id }) => {
  try {
    if (!ethereum) return toast.error("Please install Metamask");
    const contract = await getEthereumContract(connectedAccount);

    const project = await contract.getProject(id);
    return structuredProjects([project])[0];
  } catch (error) {
    console.log(error);
    toast.error(error.message);
  }
};

export const backProject = async (connectedAccount, id, amount) => {
  // Check if MetaMask is available
  if (!ethereum) return toast.error("Please install Metamask");

  const contract = await getEthereumContract(connectedAccount); // Assuming getEtheriumContract() returns a contract instance
  const amount = ethers.parseEther(amount.toString());
  console.log("Amount in wei:", amount.toString()); // Debug the final amount in wei

  try {
    const tx = await contract.backProject(id, investorName, {
      from: connectedAccount,
      value: amount,
    });

    console.log("Transaction Hash:", tx.hash); // Log transaction hash for debugging
    await tx.wait(); // Wait for the transaction to be mined
    return true;
  } catch (error) {
    console.error("Error in backing project:", error);
    toast.error("An error occurred while backing the project.");
  }
};

const structuredProjects = (projects) =>
  projects.map((project) => ({
    id: Number(project[0]),
    owner: project[1]?.toLowerCase(),
    title: project[2],
    description: project[3],
    slug: project[4],
    cost: Number(project[5]) / 10 ** 18,
    raised: Number(project[6]) / 10 ** 18,
    timestamp: new Date(Number(project[7]) * 1000).getTime(),
    investorAddress: project[8]?.toLowerCase(),
    ownerName: project[9],
    investorName: project[10],
    equity: Number(project[11]),
  }));
