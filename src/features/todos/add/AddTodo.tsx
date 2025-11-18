"use client";
import { TodoForm, TodoSchema } from "../components/TodoForm";

export const AddTodoContainer = () => {
  return (
    <div>
      <TodoForm
        handler={(values: TodoSchema) => {
          console.log({ values });
        }}
        removeHandler={(id: string) => {
          console.log({ id });
        }}
      />
    </div>
  );
};

export default AddTodoContainer;
