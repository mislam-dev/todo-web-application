import { AddTodoContainer } from "@/features/todos/add";

export default function AddNewTodo() {
  return (
    <div className="w-[591px] mx-auto">
      <div className="p-8 bg-[#eef6ff]">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-4xl font-bold text-[#0d224a]">Add New Task</h1>
            <div className="h-[3px] w-20 bg-primary mt-1 rounded"></div>
          </div>
        </div>
        <div className="">
          <AddTodoContainer />
        </div>
      </div>
    </div>
  );
}
