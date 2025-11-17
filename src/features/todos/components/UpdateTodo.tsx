"use client";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Pencil } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { Todo } from "./SingleTodo";
import { TodoForm, TodoSchema } from "./TodoForm";

const todo: Todo = {
  id: 1,
  title: "Backend Infrastructure",
  description: "Upgrading backend infrastructure for better performance",
  priority: "extreme",
  is_completed: true,
  position: 1,
  todo_date: "2025-11-15",
  created_at: "2025-11-09T18:52:41.723930Z",
  updated_at: "2025-11-09T18:54:52.241995Z",
};

export const UpdateTodo = () => {
  const [open, setOpen] = useState(false);
  return (
    <div>
      <Button
        onClick={() => setOpen((p) => !p)}
        className="bg-primary hover:bg-[#3f5dea]"
      >
        <Pencil />
      </Button>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="w-[591px] **:data-dialog-close:hidden ">
          <DialogHeader>
            <div className="flex justify-between items-center">
              <DialogTitle className="text-xl font-semibold">
                Update Task
              </DialogTitle>
              <Button
                variant={"ghost"}
                className="underline underline-offset-4 text-sm"
                onClick={() => setOpen((p) => !p)}
              >
                Go Back
              </Button>
            </div>
            <div className="h-[3px] w-20 bg-primary mt-1"></div>
          </DialogHeader>

          {/* Modal Body */}
          <TodoForm
            setOpen={setOpen}
            handler={(values: TodoSchema) => {
              console.log("update task", { values });
            }}
            todo={todo}
            deleteHandler={() => {
              toast.success("delete");
            }}
          />
        </DialogContent>
      </Dialog>
    </div>
  );
};
