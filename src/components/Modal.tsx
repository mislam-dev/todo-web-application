"use client";

import { useRouter } from "next/navigation";
import React from "react";
import { Dialog, DialogContent } from "./ui/dialog";

const Modal: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const router = useRouter();
  const handleClose = () => {
    router.back();
  };
  return (
    <div>
      <Dialog defaultOpen={true} open={true} onOpenChange={handleClose}>
        <DialogContent className="w-[591px] **:data-dialog-close:hidden ">
          {children}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Modal;
