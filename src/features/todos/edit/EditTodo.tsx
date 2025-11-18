"use client";

import { Axios } from "@/lib/axios";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Todo } from "../components/SingleTodo";
import { TodoForm, TodoSchema } from "../components/TodoForm";

export const EditTodoContainer: React.FC<{ token: string; todo: Todo }> = ({
  todo,
  token,
}) => {
  const router = useRouter();
  const updateTodoHandler = async (values: TodoSchema) => {
    const formData = new FormData();
    Object.entries(values).forEach(([Key, value]) => {
      formData.append(Key, value);
    });
    const axios = Axios.getInstance(token)!;
    try {
      await axios.patch(`/todos/${todo.id}/`, formData);
      router.back();
      toast.success("Todo updated successfully!");
    } catch (error) {
      toast.error("Something went wrong try again later!");
    }
  };
  return (
    <div>
      <TodoForm
        handler={updateTodoHandler}
        todo={todo}
        removeHandler={() => {
          router.push("/todos");
        }}
      />
    </div>
  );
};

export default EditTodoContainer;
