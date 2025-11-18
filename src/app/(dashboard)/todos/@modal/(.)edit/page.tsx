"use client";
import Modal from "@/components/Modal";
import { Button } from "@/components/ui/button";
import { DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { AddTodoContainer } from "@/features/todos/add";
import { useRouter } from "next/navigation";

export default function AddNewTodo() {
  const router = useRouter();

  return (
    <Modal>
      <div className="w-full mx-auto p-5">
        <DialogHeader>
          <div className="flex justify-between items-center">
            <DialogTitle className="text-xl font-semibold">
              Add New Task
            </DialogTitle>
            <Button
              variant={"ghost"}
              className="underline underline-offset-4 text-sm"
              onClick={() => router.back()}
            >
              Go Back
            </Button>
          </div>
          <div className="h-[3px] w-20 bg-primary mt-1"></div>
        </DialogHeader>

        <AddTodoContainer />
      </div>
    </Modal>
  );
}
