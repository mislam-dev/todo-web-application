import Modal from "@/components/Modal";
import { AddTodoContainer } from "@/features/todos/add";
import { cookies } from "next/headers";
import Header from "./header";

export default async function AddNewTodo() {
  const token = (await cookies()).get("access");

  return (
    <Modal>
      <div className="w-full mx-auto p-5">
        <Header />

        <AddTodoContainer token={token?.value || ""} />
      </div>
    </Modal>
  );
}
