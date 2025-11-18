import Modal from "@/components/Modal";
import { EditTodoContainer } from "@/features/todos/edit";
import { ApiClient } from "@/lib/apiClient";
import { cookies } from "next/headers";
import Header from "./header";

export default async function EditTodo({
  params,
}: {
  params: Promise<{ todoId: string }>;
}) {
  const token = (await cookies()).get("access");
  const { todoId } = await params;
  const axios = new ApiClient(token?.value || "");
  const todo = await axios.get(`/todos/${todoId}`);
  return (
    <Modal>
      <div className="w-full mx-auto p-5">
        <Header />
        <EditTodoContainer token={token?.value || ""} todo={todo?.data} />
      </div>
    </Modal>
  );
}
