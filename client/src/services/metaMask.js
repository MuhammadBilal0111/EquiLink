const { ethereum } = window;

// function for the connectivity of metamask
const connectWallet = async () => {
  try {
    if (!ethereum) {
      // Code Of Toast on alert
      alert("Make sure you have Metamask installed!");
      return;
    }
    const account = await ethereum.request({ method: "eth_requestAccounts" });
    const accountAddress = account[0]?.toLowerCase(); // get the wallet address
    console.log("Metamask Address", accountAddress);
    // redux store to store the meta mask address
  } catch (error) {
    console.log(error);
    // Error Toast
  }
};
const isWallectConnected = async () => {
  try {
    // Code Of Toast on alert
    if (!ethereum) {
      alert("Please install Metamask!");
      return;
    }
    const account = ethereum.request({ method: "eth_accounts" });
    ethereum.on("chainChanged", () => {
      window.location.reload(); // reload the window
    }); // when the chain change from georli to ethereum mainnet

    ethereum.on("accountsChanged", async () => {
      const updatedAccounts = await ethereum.request({
        method: "eth_accounts",
      });
      console.log("connectedAccount", updatedAccounts[0]?.toLowerCase()); // instead of console the message use the redux to store the address
      await isWallectConnected(); // Re-run the function to update the UI
    });
    if (account.length > 0) {
      console.log("Metamask Address", account[0].toLowerCase()); // instead of console the error message use the redux
    } else {
      alert("Please connect wallet."); // Toast Code to show the error message
      console.log("No accounts found.");
    }
  } catch (error) {
    console.log(error);
    // Error message Toast
  }
};

export { connectWallet, isWallectConnected };
