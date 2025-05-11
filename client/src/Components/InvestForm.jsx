import React, { useEffect, useState } from "react";
import { Button as Btn } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/Components/ui/dialog";
import InputField from "./elements/InputField";
import { useSelector } from "react-redux";
import { backProject, isWalletConnected } from "@/services/blockchain";
import { toast } from "sonner";
import { axiosInstance } from "@/lib/axios";
import { useParams } from "react-router";
import { Loader2 } from "lucide-react";

export default function InvestForm({
  fundingGoal,
  id,
  equity,
  entrepreneurId,
}) {
  const { profile } = useSelector((store) => store.profileStore);
  const { id: startupId } = useParams();
  const [open, setOpen] = useState(false);
  const [projectEquity, setProjectEquity] = useState(equity);
  const [walletAddress, setWalletAddress] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isCashLoading, setIsCashLoading] = useState(false);
  const [Eth_price, setEth_price] = useState(659987.61);

  useEffect(() => {
    const fetchWalletAddress = async () => {
      const address = await isWalletConnected();
      if (address) {
        setWalletAddress(address);
      }
    };
    fetchWalletAddress();
  }, []);
  const handleCashInvestment = async () => {
    try {
      const response = await axiosInstance.post("/orders/payments/checkout", {
        amount: fundingGoal * Eth_price,
        currency: "PKR",
        projectId: id,
      });
      console.log("Cash investment response:", response);
      if (response?.data?.data?.url) {
        window.location.href = response.data.data.url;
      } else {
        toast.error("Payment URL not received.");
      }
    } catch (err) {
      console.error("Cash investment error:", err);
      toast.error("Failed to initiate cash investment.");
    }
  };
  const handleCryptoSubmit = async (e) => {
    e.preventDefault();

    // Basic input validation
    if (!fundingGoal || !projectEquity) {
      toast.error("Please fill all fields.");
      return;
    }

    try {
      // Step 1: Perform blockchain transaction
      const tx = await backProject(
        walletAddress,
        id,
        fundingGoal,
        profile?.user?.name,
        projectEquity
      );
      console.log("Blockchain TX:", tx);

      // Step 2: Prepare transaction data for backend
      const transactionData = {
        id: +startupId,
        transactionHash: tx.hash,
        equity: projectEquity,
        walletAddress,
        status: "PaidOut",
      };
      console.log("Transaction Data:", transactionData);

      // Step 3: Send transaction data to backend
      const response = await axiosInstance.patch(
        "/startups/update-startup",
        transactionData
      );

      if (response?.data?.status === true) {
        setOpen(false);
        toast.success("Transaction completed!");
      } else {
        toast.error("Error in updating backend status.");
      }
    } catch (error) {
      console.error("Transaction error:", error);
      toast.error("Error in making transaction.");
    }
  };
  // console.log("id", id);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Btn className="outline-none py-1.5 text-white text-center text-sm rounded-lg bg-gradient-to-r from-[#D1B0D4] via-[#8B68AD] to-[#5A3592] cursor-pointer w-[15rem]">
          Confirm Invest
        </Btn>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] max-w-[90vw] bg-[#1a1919] text-gray-300 border-gray-700">
        <DialogHeader>
          <DialogTitle className="text-gray-300">
            Confirm Investment
          </DialogTitle>
          <DialogDescription className="text-gray-400">
            Please review and confirm your investment details.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleCryptoSubmit} className="w-full">
          <div className="grid gap-4 py-4 w-full">
            <InputField
              label="Investment Amount in Eth"
              type="text"
              placeholder="Eth"
              className="w-full"
              value={fundingGoal}
              disable={true}
              required
            />
            <InputField
              label="Investment Amount in PKR"
              type="text"
              placeholder="Pkr"
              className="w-full"
              value={fundingGoal * Eth_price}
              disable={true}
              required
            />
            <InputField
              label="Equity (%)"
              placeholder="Enter percentage of equity"
              type="text"
              value={projectEquity}
              handler={(e) => setProjectEquity(e.target.value)}
              className="w-full"
              required
            />
          </div>
          <DialogFooter>
            <div className="flex flex-col gap-2 w-full">
              <Btn
                type="submit"
                className="w-full bg-purple-700 hover:bg-purple-800 transition-colors cursor-pointer"
                disabled={isLoading}
              >
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Processing...
                  </>
                ) : (
                  "Invest with Crypto"
                )}
              </Btn>
              <Btn
                type="button"
                onClick={handleCashInvestment}
                className="w-full bg-green-600 hover:bg-green-700 transition-colors cursor-pointer"
                disabled={isCashLoading}
              >
                {isCashLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Processing...
                  </>
                ) : (
                  "Invest with Cash"
                )}
              </Btn>
            </div>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
