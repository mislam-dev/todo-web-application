import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Search } from "lucide-react";
import { todo } from "node:test";
import { AllTodos } from "./components/AllTodos";
import NewTodo from "./components/NewTodo";
import NoTodo from "./components/NoTodo";

const TodosContainer = () => {
  const todos = [1];

  return (
    <>
      <div className="p-8 bg-[#eef6ff]">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-4xl font-bold text-[#0d224a]">Todos</h1>
            <div className="h-[3px] w-20 bg-primary mt-1 rounded"></div>
          </div>

          <NewTodo />
        </div>

        <div className="flex gap-3 mt-8 h-9 items-center">
          <div className="relative flex-1 flex h-full bg-white border-[#D1D5DB] rounded">
            <Input
              placeholder="Search your task here..."
              className="bg-transparent h-full flex-1 border-none rounded-none"
            />
            <Button className="h-full w-10">
              <Search className="" />
            </Button>
          </div>

          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                className="flex items-center gap-2 border-[#D1D5DB] bg-white"
              >
                Filter By ↕
              </Button>
            </PopoverTrigger>

            <PopoverContent className="w-52 p-4 shadow-lg border border-[#D1D5DB]">
              <p className="font-semibold text-sm mb-3 text-gray-700">Date</p>

              <div className="flex flex-col gap-2 text-sm text-gray-700">
                <label className="flex items-center gap-2">
                  <Checkbox /> Deadline Today
                </label>
                <label className="flex items-center gap-2">
                  <Checkbox /> Expires in 5 days
                </label>
                <label className="flex items-center gap-2">
                  <Checkbox /> Expires in 10 days
                </label>
                <label className="flex items-center gap-2">
                  <Checkbox /> Expires in 30 days
                </label>
              </div>
            </PopoverContent>
          </Popover>
        </div>
        {todos.length === 0 && (
          <Card className="mt-8 h-[65vh] flex items-center justify-center border-[#D1D5DB] bg-white">
            <CardContent className="text-center">
              <NoTodo />
            </CardContent>
          </Card>
        )}
        {todo.length > 0 && (
          <Card className="mt-8 h-[65vh]">
            <CardContent className="text-center">
              <AllTodos />
            </CardContent>
          </Card>
        )}
      </div>
    </>
  );
};

export default TodosContainer;
