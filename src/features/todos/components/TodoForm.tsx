"use client";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { zodResolver } from "@hookform/resolvers/zod";
import { Trash } from "lucide-react";
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
  setOpen?: React.Dispatch<React.SetStateAction<boolean>>;
  handler: (values: TodoSchema) => void;
  removeHandler: (id: string) => void;
  todo?: Todo;
}) {
  const { handler, todo, removeHandler: deleteHandler } = props;
  const form = useForm<TodoSchema>({
    resolver: zodResolver(todoSchema),
    defaultValues: {
      title: todo?.title || "",
      todo_date: todo?.todo_date || "",
      priority: todo?.priority || "moderate",
      description: todo?.description || "",
    },
  });

  const onSubmit = (data: TodoSchema) => {
    handler(data);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 mt-4">
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="font-medium text-sm">Title</FormLabel>
              <FormControl>
                <Input
                  placeholder="Task title..."
                  {...field}
                  className="border-[#D1D5DB]"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="todo_date"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="font-medium text-sm">Date</FormLabel>
              <FormControl>
                <Input type="date" {...field} className="border-[#D1D5DB]" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="priority"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="font-medium text-sm">Priority</FormLabel>
              <div className="flex items-center gap-6 mt-2">
                <div className="flex items-center gap-2 text-sm">
                  <span className="h-2 w-2 rounded-full bg-red-600"></span>
                  <span>Extreme</span>
                  <Checkbox
                    checked={field.value === "extreme"}
                    onCheckedChange={() => field.onChange("extreme")}
                  />
                </div>

                <div className="flex items-center gap-2 text-sm">
                  <span className="h-2 w-2 rounded-full bg-green-600"></span>
                  <span>Moderate</span>
                  <Checkbox
                    checked={field.value === "moderate"}
                    onCheckedChange={() => field.onChange("moderate")}
                  />
                </div>

                <div className="flex items-center gap-2 text-sm">
                  <span className="h-2 w-2 rounded-full bg-yellow-500"></span>
                  <span>Low</span>
                  <Checkbox
                    checked={field.value === "low"}
                    onCheckedChange={() => field.onChange("low")}
                  />
                </div>
              </div>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="font-medium text-sm">
                Task Description
              </FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Start writing here..."
                  {...field}
                  className="h-52 border-[#D1D5DB] resize-none"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="flex justify-between">
          <Button type="submit">Save</Button>
          <Button
            type="button"
            variant="destructive"
            onClick={() => {
              deleteHandler("id");
            }}
          >
            <Trash />
          </Button>
        </div>
      </form>
    </Form>
  );
}
