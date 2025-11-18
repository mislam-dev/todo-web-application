import { Skeleton } from "@/components/ui/skeleton";
import { AxiosResponse } from "axios";
import Image from "next/image";
import { use } from "react";

type User = {
  id: number;
  email: string;
  first_name: string;
  last_name: string;
  address: string;
  contact_number: string;
  birthday: string;
  profile_image: string;
  bio: string;
};

export const User: React.FC<{ authUserApi: Promise<AxiosResponse> }> = ({
  authUserApi,
}) => {
  const res = use(authUserApi);
  const user = res?.data;
  if (!user) throw new Error("Auth user data fetched failed!");
  return (
    <>
      <div className="flex flex-col items-center mb-8">
        <div className="h-20 w-20 rounded-full overflow-hidden mb-3">
          <Image
            src={user?.profile_image}
            alt="User"
            className="w-full h-full object-cover "
            width={80}
            height={80}
          />
        </div>
        <h3 className="font-semibold text-white">
          {user?.last_name} {user?.last_name}
        </h3>
        <p className="text-sm text-white">{user?.email}</p>
      </div>
    </>
  );
};

export default User;

export const UserLoading = () => {
  return (
    <div className="flex flex-col items-center mb-8">
      <div className="h-20 w-20 rounded-full overflow-hidden mb-3">
        <Skeleton className="h-20 w-20 rounded-full" />
      </div>
      <div className="space-y-1">
        <Skeleton className="h-4 w-32 rounded-full" />
        <Skeleton className="h-4 w-48 rounded-full" />
      </div>
    </div>
  );
};
