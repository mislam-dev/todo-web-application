import { Checkbox } from "@/components/ui/checkbox";
import Link from "next/link";

const Sidebar = () => {
  return (
    <>
      <aside className="w-[340px] bg-[#0d2240] text-white flex flex-col justify-between py-6 px-4">
        <div>
          <div className="flex flex-col items-center mb-8">
            <img
              src="/profile.jpg"
              alt="User"
              className="h-20 w-20 rounded-full object-cover mb-2"
            />
            <h3 className="font-semibold text-lg">amanuel</h3>
            <p className="text-sm text-gray-300">amanuel@gmail.com</p>
          </div>

          <nav className="space-y-2">
            <Link
              href="#"
              className="flex items-center gap-3 py-3 px-4 bg-[#153764] rounded-lg"
            >
              <Checkbox checked className="pointer-events-none" />
              <span>Todos</span>
            </Link>
            <Link
              href="#"
              className="flex items-center gap-3 py-3 px-4 hover:bg-[#153764] rounded-lg"
            >
              <span className="opacity-70">Account Information</span>
            </Link>
          </nav>
        </div>

        <button className="flex items-center gap-2 text-gray-300 hover:text-white">
          <span>Logout</span>
        </button>
      </aside>
    </>
  );
};

export default Sidebar;
