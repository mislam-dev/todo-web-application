import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Plus, Search } from "lucide-react";
import NoTodo from "./components/NoTodo";

const TodosContainer = () => {
  const todos = [1];

  return (
    <div>
      <div>
        <div className="p-8 bg-[#eef6ff] min-h-screen">
          {/* Title */}
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-4xl font-bold text-[#0d224a]">Todos</h1>
              <div className="h-[3px] w-20 bg-primary mt-1 rounded"></div>
            </div>
            {/* New Task */}
            <Button className="bg-primary hover:bg-[#3f5dea]">
              <Plus className="mr-2 h-4 w-4" /> New Task
            </Button>
          </div>

          {/* Search + Filter Row */}
          <div className="flex gap-3 mt-8 h-9 items-center">
            {/* Search box */}
            <div className="relative flex-1 flex h-full bg-white border-[#D1D5DB] rounded">
              <Input
                placeholder="Search your task here..."
                className="bg-transparent h-full flex-1 border-none rounded-none"
              />
              <Button className="h-full w-10">
                <Search className="" />
              </Button>
            </div>

            {/* Filter Button */}
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

          {/* Empty State Card */}
          <NoTodo />
        </div>
      </div>
    </div>
  );
};

export default TodosContainer;
