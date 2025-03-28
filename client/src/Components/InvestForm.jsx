import React, { useRef, useState } from "react";
import { Button as Btn } from "@/components/ui/button";
import Button from "./elements/Button";
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
import { backProject, loadProject, loadProjects } from "@/services/blockchain";
import { toast } from "sonner";
import { axiosInstance } from "@/lib/axios";

export default function DialogForm({ fundingGoal, id, equity }) {
  const { walletAddress, profile } = useSelector((store) => store.profileStore);
  const [open, setOpen] = useState(false);
  const emailRef = useRef(null);
  const telephoneRef = useRef(null);
  const equityRef = useRef(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (
        emailRef.current.value &&
        fundingGoal &&
        telephoneRef.current.value &&
        equityRef.current.value
      ) {
        const tx = await backProject(
          walletAddress,
          id,
          fundingGoal,
          profile?.user?.name,
          equityRef.current.value
        );
        const transactionData = {
          email: emailRef.current.value,
          transactionHash: tx.hash,
          telephoneNo: telephoneRef.current.value,
          equity: equityRef.current.value,
          senderWallet: walletAddress,
          status: "PaidOut",
        };
        const result = await axiosInstance.put("/transaction", transactionData);
        if (result.status === "success") {
          toast.success("Transaction completed!");
        } else {
          toast.error("Error in making transaction");
        }
      } else {
        toast.error("Fill all fields");
      }
    } catch (error) {
      toast.error("Error in making transaction");
    }
  };

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
              label="Email"
              placeholder="your@email.com"
              type="email"
              className="w-full"
              value={profile?.user?.email}
              ref={emailRef}
              required
            />

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
              label="Telephone"
              type="tel"
              placeholder="+92-XXXXXXXXXX"
              className="w-full"
              ref={telephoneRef}
              required
            />

            <InputField
              label="Equity (%)"
              placeholder="Enter percentage of equity you offer"
              type="text"
              value={equity}
              ref={equityRef}
              className="w-full"
              required
            />
          </div>
          <DialogFooter>
            <Btn type="submit" className={"cursor-pointer"}>
              Confirm Investment
            </Btn>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
