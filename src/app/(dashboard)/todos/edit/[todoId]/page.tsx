import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { EditTodoContainer } from "@/features/todos/edit";
import { Axios } from "@/lib/axios";
import { cookies } from "next/headers";
import Link from "next/link";

export default async function EditTodo({
  params,
}: {
  params: Promise<{ todoId: string }>;
}) {
  const token = (await cookies()).get("access");
  const { todoId } = await params;
  const axios = Axios.getInstance(token?.value || "")!;
  const todo = await axios.get(`/todos/${todoId}`);
  return (
    <div className="">
      <div className="w-[591px] mx-auto">
        <Card>
          <CardContent>
            <div>
              <div className="flex justify-between items-center">
                <h2 className="text-xl font-semibold">Update Task</h2>
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
            <div className="">
              <EditTodoContainer todo={todo.data} token={token?.value || ""} />
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
