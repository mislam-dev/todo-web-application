import { Button } from "@/components/ui/button";
import { AllTodoLoader, AllTodos } from "@/features/todos";
import Filters from "@/features/todos/all/Filters";
import { Plus } from "lucide-react";
import Link from "next/link";
import { Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";

export default function TodoPage({
  searchParams,
}: {
  searchParams: Promise<Record<string, string>>;
}) {
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

        <Filters />
        <ErrorBoundary fallback={<>Failed to load</>}>
          <Suspense key={"todos-page"} fallback={<AllTodoLoader />}>
            <AllTodos searchParams={searchParams} />
          </Suspense>
        </ErrorBoundary>
      </div>
    </div>
  );
}
