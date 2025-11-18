"use client";
export interface Todo {
  id: number;
  title: string;
  description: string;
  priority: "extreme" | "moderate" | "low";
  is_completed: boolean;
  position: number;
  todo_date: string;
  created_at: string;
  updated_at: string;
}

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ApiClient } from "@/lib/apiClient";
import { cn } from "@/lib/utils";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { GripVertical, Pencil, Trash2 } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

import { toast } from "sonner";

interface TodoCardProps {
  todo: Todo;
  token: string;
}

export function SingleTodoCard({ todo, token }: TodoCardProps) {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: todo.position });

  const router = useRouter();

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  const deleteHandler = async () => {
    try {
      const api = new ApiClient(token);
      await api.delete(`/todos/${todo.id}/`);
      toast.success("Todo deleted successfully");
      router.refresh();
    } catch (error) {
      console.log(error);
      toast.success("Todo deletion failed! Please try again later!");
    }
  };

  return (
    <Card
      ref={setNodeRef}
      style={style}
      className={cn(`border rounded shadow-sm`, {
        "border-red-200": todo.priority === "extreme",
        "border-green-200": todo.priority === "moderate",
        "border-yellow-200": todo.priority === "low",
      })}
      {...attributes}
    >
      <CardContent className="p-6">
        {/* Header */}
        <div className="flex justify-between items-start">
          <h2 className="font-medium text-[#0D224A]">{todo.title}</h2>

          <div className="flex items-center gap-1">
            <span
              className={cn(`text-sm py-[5px] px-2.5 rounded`, {
                "bg-red-100 text-red-600": todo.priority === "extreme",
                "bg-green-100 text-green-600": todo.priority === "moderate",
                "bg-yellow-100 text-yellow-600": todo.priority === "low",
              })}
            >
              {todo.priority.charAt(0).toUpperCase() + todo.priority.slice(1)}
            </span>

            <GripVertical
              className="h-4 w-4 text-gray-400 cursor-grab "
              {...listeners}
            />
          </div>
        </div>

        <p className="text-[#4B5563] mt-2 text-left text-sm ">
          {todo.description}
        </p>

        <div className="flex justify-between items-center mt-6">
          <p className="text-sm text-gray-700">Due {todo.todo_date}</p>

          <div className="flex items-center gap-2">
            <Link href={`/todos/edit/${todo.id}`}>
              <Button className="bg-primary hover:bg-[#3f5dea]">
                <Pencil />
              </Button>
            </Link>

            <Button
              size="icon"
              variant="secondary"
              className="h-8 w-8"
              onClick={deleteHandler}
            >
              <Trash2 className="h-4 w-4 text-red-500" />
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
