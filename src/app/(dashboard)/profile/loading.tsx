import { Skeleton } from "@/components/ui/skeleton";

const Loading = () => {
  return (
    <div>
      <div className="p-6 space-y-6">
        <div>
          <Skeleton className="h-6 w-48" />
        </div>

        {/* Profile photo section */}
        <div className="border rounded-lg p-6 w-full max-w-md space-y-4">
          <div className="flex flex-col items-center gap-4">
            <Skeleton className="h-28 w-28 rounded-full" />
            <Skeleton className="h-10 w-40 rounded-md" />
          </div>
        </div>

        {/* Form section */}
        <div className="border rounded-lg p-6 space-y-6">
          {/* First / Last name */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Skeleton className="h-4 w-32" />
              <Skeleton className="h-10 w-full rounded-md" />
            </div>
            <div className="space-y-2">
              <Skeleton className="h-4 w-32" />
              <Skeleton className="h-10 w-full rounded-md" />
            </div>
          </div>

          {/* Email */}
          <div className="space-y-2">
            <Skeleton className="h-4 w-24" />
            <Skeleton className="h-10 w-full rounded-md" />
          </div>

          {/* Address / Contact */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Skeleton className="h-4 w-24" />
              <Skeleton className="h-10 w-full rounded-md" />
            </div>

            <div className="space-y-2">
              <Skeleton className="h-4 w-32" />
              <Skeleton className="h-10 w-full rounded-md" />
            </div>
          </div>

          {/* Birthday */}
          <div className="space-y-2">
            <Skeleton className="h-4 w-24" />
            <Skeleton className="h-10 w-full rounded-md" />
          </div>

          {/* Buttons */}
          <div className="flex gap-4 pt-4">
            <Skeleton className="h-10 w-32 rounded-md" />
            <Skeleton className="h-10 w-32 rounded-md" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Loading;
