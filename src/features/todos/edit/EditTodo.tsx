"use client";

import { useRouter } from "next/navigation";
import { Todo } from "../components/SingleTodo";
import { TodoForm, TodoSchema } from "../components/TodoForm";

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

export const EditTodoContainer = () => {
  const router = useRouter();
  return (
    <div>
      <TodoForm
        handler={(values: TodoSchema) => {
          console.log({ values });
        }}
        todo={todo}
        deleteHandler={() => {
          router.push("/todos");
        }}
      />
    </div>
  );
};

export default EditTodoContainer;
