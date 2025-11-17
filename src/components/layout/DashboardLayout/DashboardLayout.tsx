import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Bell, Calendar, Search } from "lucide-react";
import Sidebar from "./Sidebar";

export default function DashboardLayout() {
  return (
    <div className="flex min-h-screen bg-[#eef5ff]">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <main className="flex-1 p-10">
        <header className="flex justify-between items-center mb-6">
          <div className="flex items-center gap-3">
            <img src="/logo.png" alt="Dreamy Software" className="h-10" />
            <span className="text-2xl font-semibold text-[#0d2240]">Todos</span>
          </div>

          <div className="flex items-center gap-4">
            <Bell className="h-6 w-6 text-[#0d2240]" />
            <div className="flex items-center gap-2 text-[#0d2240]">
              <Calendar className="h-5 w-5" />
              <span className="font-medium">Friday 07/11/2025</span>
            </div>
            <Button className="bg-[#4e6bff] hover:bg-[#3d57d9]">
              + New Task
            </Button>
          </div>
        </header>

        {/* Search + Filter */}
        <div className="flex items-center gap-4 mb-8">
          <div className="relative w-full max-w-xl">
            <Input placeholder="Search your task here..." className="pl-10" />
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-500" />
          </div>

          <Popover>
            <PopoverTrigger asChild>
              <Button variant="outline" className="flex items-center gap-2">
                Filter By ↕
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-48 p-4">
              <p className="font-semibold mb-2">Date</p>
              <div className="flex flex-col space-y-2">
                <label className="flex items-center gap-2 text-sm">
                  <Checkbox /> Deadline Today
                </label>
                <label className="flex items-center gap-2 text-sm">
                  <Checkbox /> Expires in 5 days
                </label>
                <label className="flex items-center gap-2 text-sm">
                  <Checkbox /> Expires in 10 days
                </label>
                <label className="flex items-center gap-2 text-sm">
                  <Checkbox /> Expires in 30 days
                </label>
              </div>
            </PopoverContent>
          </Popover>
        </div>

        {/* Empty State */}
        <Card className="border-dashed border-2 border-gray-300 bg-white h-[60vh] flex flex-col items-center justify-center">
          <CardContent className="text-center">
            <img
              src="/empty-tasks.png"
              alt="No tasks"
              className="h-32 mx-auto mb-4 opacity-70"
            />
            <p className="text-gray-600 text-lg">No todos yet</p>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
