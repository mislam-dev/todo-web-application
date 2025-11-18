import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { AllTodoLoader, AllTodos } from "@/features/todos/components/AllTodos";
import { Axios } from "@/lib/axios";
import { Plus, Search } from "lucide-react";
import { cookies } from "next/headers";
import Link from "next/link";
import { Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";

export default async function TodoPage() {
  const token = (await cookies()).get("access");
  const axiosInstance = Axios.getInstance(token?.value || "");
  const todosApi = axiosInstance?.get("/todos");

  return (
    <div className="">
      <div className="p-8 bg-[#eef6ff]">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-4xl font-bold text-[#0d224a]">Todos</h1>
            <div className="h-[3px] w-20 bg-primary mt-1 rounded"></div>
          </div>

          <Button className="bg-primary hover:bg-[#3f5dea]">
            <Link
              href={"/todos/add"}
              className="flex w-full h-full items-center"
            >
              <Plus className="mr-2 h-4 w-4" /> New Task
            </Link>
          </Button>
        </div>

        <div className="flex gap-3 mt-8 h-9 items-center">
          <div className="relative flex-1 flex h-full bg-white border-[#D1D5DB] rounded">
            <Input
              placeholder="Search your task here..."
              className="bg-transparent h-full flex-1 border-none rounded-none"
            />
            <Button className="h-full w-10">
              <Search className="" />
            </Button>
          </div>

          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                className="flex items-center gap-2 border-[#D1D5DB] bg-white"
              >
                Filter By ↕
              </Button>
            </PopoverTrigger>

            <PopoverContent className="w-52 p-4 shadow-lg border border-[#D1D5DB]">
              <p className="font-semibold text-sm mb-3 text-gray-700">Date</p>

              <div className="flex flex-col gap-2 text-sm text-gray-700">
                <label className="flex items-center gap-2">
                  <Checkbox /> Deadline Today
                </label>
                <label className="flex items-center gap-2">
                  <Checkbox /> Expires in 5 days
                </label>
                <label className="flex items-center gap-2">
                  <Checkbox /> Expires in 10 days
                </label>
                <label className="flex items-center gap-2">
                  <Checkbox /> Expires in 30 days
                </label>
              </div>
            </PopoverContent>
          </Popover>
        </div>
        <ErrorBoundary fallback={<>Failed to load</>}>
          <Suspense fallback={<AllTodoLoader />}>
            <AllTodos todosApi={todosApi!} />
          </Suspense>
        </ErrorBoundary>
      </div>
    </div>
  );
}
