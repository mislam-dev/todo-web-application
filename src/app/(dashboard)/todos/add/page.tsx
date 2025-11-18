import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { AddTodoContainer } from "@/features/todos/add";
import { cookies } from "next/headers";
import Link from "next/link";

export default async function AddNewTodo() {
  const token = (await cookies()).get("access");
  return (
    <div className="w-[591px] mx-auto">
      <Card className="bg-white">
        <CardContent>
          <div>
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-semibold">Add New Task</h2>
              <Button
                variant={"ghost"}
                className="underline underline-offset-4 text-sm"
              >
                <Link href={"/todos"} className="w-full h-full">
                  Go Back
                </Link>
              </Button>
            </div>
            <div className="h-[3px] w-20 bg-primary mt-1"></div>
          </div>

          <AddTodoContainer token={token?.value || ""} />
        </CardContent>
      </Card>
    </div>
  );
}
