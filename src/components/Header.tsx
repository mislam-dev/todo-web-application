import logo from "@/images/logo.png";
import { formatDateNumeric } from "@/lib/utils";
import { Bell, Calendar } from "lucide-react";
import Image from "next/image";
import { Button } from "./ui/button";
const Header = () => {
  return (
    <div className="items-center flex">
      <header className="w-full flex justify-between items-center bg-white h-[88px] px-20">
        <div className="flex items-center gap-3">
          <Image src={logo} alt="Dreamy Software" />
        </div>

        <div className="flex items-center gap-4">
          <Button className="h-[34px] w-[34px] rounded-xl text-white">
            <Bell />
          </Button>
          <Button className="h-[34px] w-[34px] rounded-xl text-white">
            <Calendar />
          </Button>
          <div className=" text-[#0d2240]">
            <p>{formatDateNumeric().day} </p>
            <p>{formatDateNumeric().formatted}</p>
          </div>
        </div>
      </header>
    </div>
  );
};

export default Header;
