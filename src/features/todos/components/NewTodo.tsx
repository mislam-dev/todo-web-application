"use client";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Plus } from "lucide-react";
import { useState } from "react";
import { TaskSchema, TodoForm } from "./TodoForm";
const NewTodo = () => {
  const [open, setOpen] = useState(true);
  return (
    <div>
      <Button
        onClick={() => setOpen((p) => !p)}
        className="bg-primary hover:bg-[#3f5dea]"
      >
        <Plus className="mr-2 h-4 w-4" /> New Task
      </Button>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="w-[591px] **:data-dialog-close:hidden ">
          <DialogHeader>
            <div className="flex justify-between items-center">
              <DialogTitle className="text-xl font-semibold">
                Add New Task
              </DialogTitle>
              <Button
                variant={"ghost"}
                className="underline underline-offset-4 text-sm"
              >
                Go Back
              </Button>
            </div>
            <div className="h-[3px] w-20 bg-primary mt-1"></div>
          </DialogHeader>

          {/* Modal Body */}
          <TodoForm
            setOpen={setOpen}
            handler={(values: TaskSchema) => {
              console.log({ values });
            }}
          />
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default NewTodo;
