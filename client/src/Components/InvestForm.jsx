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
import { useNavigate, useParams } from "react-router";

export default function InvestForm({
  fundingGoal,
  id,
  equity,
  entrepreneurId,
}) {

  const navigate = useNavigate()
  const { profile } = useSelector((store) => store.profileStore);
  const { id: startupId } = useParams();
  const [open, setOpen] = useState(false);
  const [projectEquity, setProjectEquity] = useState(equity);
  const [walletAddress, setWalletAddress] = useState("");

  useEffect(() => {
    const fetchWalletAddress = async () => {
      const address = await isWalletConnected();
      if (address) {
        setWalletAddress(address);
      }
    };
    fetchWalletAddress();
  }, []);

  const handleSubmit = async (e) => {
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
        navigate('/')
      } else {
        toast.error("Error in updating backend status.");
      }
    } catch (error) {
      console.error("Transaction error:", error);
      toast.error("Error in making transaction.");
    }
  };
  console.log("id", id);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Btn className="outline-none py-1.5 text-white text-center text-sm rounded-lg bg-gradient-to-r from-[#D1B0D4] via-[#8B68AD] to-[#5A3592] cursor-pointer w-[15rem]">
          Confirm Invest
        </Btn>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] bg-[#1a1919] text-gray-300">
        <DialogHeader>
          <DialogTitle className="text-gray-300">Confirm Invest</DialogTitle>
          <DialogDescription className="text-gray-400">
            Please provide your contact and financial details below.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="w-full">
          <div className="grid gap-4 py-4 w-full">
            <InputField
              label="Cost"
              type="text"
              placeholder="Eth"
              className="w-full"
              value={fundingGoal}
              disable={true}
              required
            />

            <InputField
              label="Equity (%)"
              placeholder="Enter percentage of equity you offer"
              type="text"
              value={projectEquity}
              handler={(e) => setProjectEquity(e.target.value)}
              className="w-full"
              required
            />
          </div>
          <DialogFooter>
            <Btn type="submit" className="cursor-pointer">
              Confirm Investment
            </Btn>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
