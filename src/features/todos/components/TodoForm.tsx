"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { DialogFooter } from "@/components/ui/dialog";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { z } from "zod";

export const taskSchema = z.object({
  title: z.string().min(1, "Title is required"),
  date: z.string().min(1, "Date is required"),
  priority: z.enum(["extreme", "moderate", "low"]),
  description: z.string().optional(),
});
export type TaskSchema = z.infer<typeof taskSchema>;

export function TodoForm(props: {
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  handler: (values: TaskSchema) => void;
}) {
  const { setOpen, handler } = props;
  const form = useForm<TaskSchema>({
    resolver: zodResolver(taskSchema),
    defaultValues: {
      title: "",
      date: "",
      priority: "moderate",
      description: "",
    },
  });

  const { register, handleSubmit, setValue, watch } = form;

  const currentPriority = watch("priority");

  const onSubmit = (data: TaskSchema) => {
    handler(data);
  };

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
              {...register("date")}
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

        <DialogFooter>
          <Button variant="outline" onClick={() => setOpen(false)}>
            Cancel
          </Button>
          <Button type="submit">Save</Button>
        </DialogFooter>
      </form>
    </>
  );
}
