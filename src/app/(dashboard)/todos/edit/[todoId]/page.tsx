import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { EditTodoContainer } from "@/features/todos/edit";
import Link from "next/link";

export default function Home() {
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
              <EditTodoContainer />
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
