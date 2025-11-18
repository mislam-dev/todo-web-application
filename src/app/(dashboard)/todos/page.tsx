import TodosContainer from "@/features/todos/Todos";
import { Axios } from "@/lib/axios";
import { cookies } from "next/headers";

export default async function TodoPage() {
  const token = (await cookies()).get("access");
  const axiosInstance = Axios.getInstance(token?.value || "");
  const todosApi = axiosInstance?.get("/todos");

  return (
    <div className="">
      <TodosContainer todosApi={todosApi!} />
    </div>
  );
}
