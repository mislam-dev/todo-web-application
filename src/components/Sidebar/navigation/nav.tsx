"use client";
import { cn } from "@/lib/utils";
import { ClipboardCheck, User } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

type LinkItem = {
  value: string;
  url: string;
  Icon: React.ReactNode;
  activate: (currentPath: string) => boolean;
};

const links: LinkItem[] = [
  {
    value: "Todos",
    url: "/todos",
    Icon: <ClipboardCheck />,
    activate: (currentPath) => currentPath.startsWith("/todos"),
  },
  {
    value: "Account Information",
    url: "/profile",
    Icon: <User />,
    activate: (currentPath) => currentPath.startsWith("/profile"),
  },
];
export const Nav = () => {
  const pathname = usePathname() || "";
  return (
    <div>
      <nav className="space-y-2">
        {links.map((item) => {
          const isActive = item.activate(pathname);

          return (
            <div
              key={item.url}
              className="text-white"
              style={
                isActive
                  ? {
                      background:
                        "linear-gradient(90deg, #5272ff73 0%, #0D224A 75%)",
                    }
                  : {}
              }
            >
              <Link
                href={item.url}
                className={cn(
                  "flex items-center gap-3 py-[17px] px-14 text-[#8CA3CD]",
                  {
                    "text-white": isActive,
                  }
                )}
              >
                <span>{item.Icon}</span>
                <span>{item.value}</span>
              </Link>
            </div>
          );
        })}
      </nav>
    </div>
  );
};

export default Nav;
