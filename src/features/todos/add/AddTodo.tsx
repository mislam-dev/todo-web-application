"use client";
import { Axios } from "@/lib/axios";

import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { TodoForm, TodoSchema } from "../components/TodoForm";

export const AddTodoContainer: React.FC<{ token: string }> = ({ token }) => {
  const router = useRouter();

  const addTodoHandler = async (values: TodoSchema) => {
    const formData = new FormData();
    Object.entries(values).forEach(([Key, value]) => {
      formData.append(Key, value);
    });
    const axios = Axios.getInstance(token)!;
    try {
      await axios.post("/todos/", formData);
      router.back();
      toast.success("Todo created successfully!");
    } catch (error) {
      toast.error("Something went wrong try again later!");
    }
  };
  return (
    <div>
      <TodoForm
        handler={addTodoHandler}
        removeHandler={(id: string) => {
          console.log({ id });
        }}
      />
    </div>
  );
};

export default AddTodoContainer;
