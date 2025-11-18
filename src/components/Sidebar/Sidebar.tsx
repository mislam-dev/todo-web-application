import { Logout } from "@/features/auth/logout";
import { ApiClient } from "@/lib/apiClient";
import { cookies } from "next/headers";
import { Suspense } from "react";
import { Nav } from "./navigation";
import { User, UserLoading } from "./user";

const Sidebar = async () => {
  const token = (await cookies()).get("access");
  const axios = new ApiClient(token?.value || "");
  const authUserApi = axios?.get("/users/me/");
  return (
    <>
      <aside className="w-[340px] bg-[#0D224A] text-white flex flex-col justify-between py-6 pt-20">
        <div>
          <Suspense fallback={<UserLoading />}>
            <User authUserApi={authUserApi!} />
          </Suspense>
          <Nav />
        </div>

        <Logout />
      </aside>
    </>
  );
};

export default Sidebar;
