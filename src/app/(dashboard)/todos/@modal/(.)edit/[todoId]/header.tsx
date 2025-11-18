"use client";
import { Button } from "@/components/ui/button";
import { DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { useRouter } from "next/navigation";

const Header = () => {
  const router = useRouter();
  return (
    <>
      <DialogHeader>
        <div className="flex justify-between items-center">
          <DialogTitle className="text-xl font-semibold">
            Update Todo
          </DialogTitle>
          <Button
            variant={"ghost"}
            className="underline underline-offset-4 text-sm"
            onClick={() => router.back()}
          >
            Go Back
          </Button>
        </div>
        <div className="h-[3px] w-20 bg-primary mt-1"></div>
      </DialogHeader>
    </>
  );
};

export default Header;
