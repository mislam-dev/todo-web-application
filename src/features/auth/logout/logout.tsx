"use client";
import { cn } from "@/lib/utils";
import axios from "axios";
import { LogOut } from "lucide-react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export const Logout = () => {
  const router = useRouter();
  const logoutHandler = async () => {
    try {
      await axios.post("/api/logout");
      router.push("/auth/login");
    } catch (error) {
      toast.error("Failed to logout!");
    }
  };
  return (
    <div>
      <div className="text-white">
        <p
          className={cn(
            "flex items-center gap-3 py-[17px] px-14 text-[#8CA3CD] cursor-pointer"
          )}
          onClick={logoutHandler}
        >
          <span>
            <LogOut />
          </span>
          <span>Logout</span>
        </p>
      </div>
    </div>
  );
};

export default Logout;
