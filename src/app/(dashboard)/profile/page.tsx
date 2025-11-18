import { Card } from "@/components/ui/card";
import { ProfileContainer } from "@/features/profile";
import { ApiClient } from "@/lib/apiClient";
import { cookies } from "next/headers";

export default async function Profile() {
  const token = (await cookies()).get("access");
  const api = new ApiClient(token?.value || "");
  const authUser = await api.get("/users/me/");
  return (
    <div className="">
      <div>
        <div className="p-10 bg-[#eef6ff] min-h-screen">
          <Card className="bg-white rounded-2xl mt-6 p-8 border-0 shadow-none">
            <div className="">
              <h1 className="text-3xl font-semibold text-[#0d224a]">
                Account Information
              </h1>
              <div className="h-[3px] w-40 bg-primary mt-1 rounded"></div>
            </div>
            <ProfileContainer
              authUser={authUser?.data}
              token={token?.value || ""}
            />
          </Card>
        </div>
      </div>
    </div>
  );
}
