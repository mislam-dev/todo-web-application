import { cn } from "@/lib/utils";
import { ClipboardCheck, LogOut, User } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

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
    activate: (currentPath) => currentPath === "/todos",
  },
  {
    value: "Account Information",
    url: "/profile",
    Icon: <User />,
    activate: (currentPath) => currentPath === "/profile",
  },
];

const Sidebar = () => {
  return (
    <>
      <aside className="w-[340px] bg-[#0D224A] text-white flex flex-col justify-between py-6 pt-20">
        <div>
          <div className="flex flex-col items-center mb-8">
            <div className="h-20 w-20 rounded-full overflow-hidden mb-3">
              <Image
                src="https://images.pexels.com/photos/3866555/pexels-photo-3866555.png"
                alt="User"
                className="w-full h-full object-cover "
                width={80}
                height={80}
              />
            </div>

            <h3 className="font-semibold text-white">amanuel</h3>
            <p className="text-sm text-white">amanuel@gmail.com</p>
          </div>
          <nav className="space-y-2">
            {links.map((item) => {
              const isActive = item.activate("/todos");

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

        <div className="text-white">
          <Link
            className={cn(
              "flex items-center gap-3 py-[17px] px-14 text-[#8CA3CD]"
            )}
            href={"/"}
          >
            <span>
              <LogOut />
            </span>
            <span>Logout</span>
          </Link>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
