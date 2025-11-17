"use client";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { zodResolver } from "@hookform/resolvers/zod";
import { Trash } from "lucide-react";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Todo } from "./SingleTodo";

export const todoSchema = z.object({
  title: z.string().min(1, "Title is required"),
  todo_date: z.string().min(1, "Date is required"),
  priority: z.enum(["extreme", "moderate", "low"]),
  description: z.string().optional(),
});
export type TodoSchema = z.infer<typeof todoSchema>;

export function TodoForm(props: {
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  handler: (values: TodoSchema) => void;
  deleteHandler?: (id: string) => void;
  todo?: Todo;
}) {
  const { setOpen, handler, todo, deleteHandler } = props;
  const form = useForm<TodoSchema>({
    resolver: zodResolver(todoSchema),
    defaultValues: {
      title: "",
      todo_date: "",
      priority: "moderate",
      description: "",
    },
  });

  const { register, handleSubmit, setValue, watch } = form;

  const currentPriority = watch("priority");

  const onSubmit = (data: TodoSchema) => {
    handler(data);
  };

  useEffect(() => {
    if (todo) {
      form.setValue("title", todo.title);
      form.setValue("todo_date", todo.todo_date);
      form.setValue("priority", todo.priority);
      form.setValue("description", todo.description);
    }
  }, [todo, form]);

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 mt-4">
        <div className="space-y-2">
          <label className="font-medium text-sm">Title</label>
          <Input
            placeholder="Task title..."
            {...register("title")}
            className="border-[#D1D5DB]"
          />
        </div>

        <div className="space-y-2">
          <label className="font-medium text-sm">Date</label>
          <div className="relative">
            <Input
              type="date"
              {...register("todo_date")}
              className="border-[#D1D5DB]"
            />
          </div>
        </div>

        <div className="space-y-2">
          <label className="font-medium text-sm">Priority</label>

          <div className="flex items-center gap-6 mt-2">
            <div className="flex items-center gap-2 text-sm">
              <span className="h-2 w-2 rounded-full bg-red-600"></span>
              <span>Extreme</span>
              <Checkbox
                checked={currentPriority === "extreme"}
                onCheckedChange={() => setValue("priority", "extreme")}
              />
            </div>

            <div className="flex items-center gap-2 text-sm">
              <span className="h-2 w-2 rounded-full bg-green-600"></span>
              <span>Moderate</span>
              <Checkbox
                checked={currentPriority === "moderate"}
                onCheckedChange={() => setValue("priority", "moderate")}
              />
            </div>

            <div className="flex items-center gap-2 text-sm">
              <span className="h-2 w-2 rounded-full bg-yellow-500"></span>
              <span>Low</span>
              <Checkbox
                checked={currentPriority === "low"}
                onCheckedChange={() => setValue("priority", "low")}
              />
            </div>
          </div>
        </div>

        <div className="space-y-2">
          <label className="font-medium text-sm">Task Description</label>
          <Textarea
            placeholder="Start writing here..."
            {...register("description")}
            className="h-52 border-[#D1D5DB] resize-none"
          />
        </div>
        <div className="flex justify-between">
          <Button type="submit">Save</Button>
          <Button
            variant="destructive"
            onClick={() => {
              if (deleteHandler) {
                deleteHandler("id");
                return;
              }
              setOpen(false);
            }}
          >
            <Trash />
          </Button>
        </div>
      </form>
    </>
  );
}
