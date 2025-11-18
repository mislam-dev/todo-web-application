"use client";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Search } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { useMemo, useState } from "react";

const Filters = () => {
  const router = useRouter();
  const params = useSearchParams();

  // Read todo_date from URL
  const todoDateFromURL = params.get("todo_date") || "";

  // Pre-calc known expected dates
  const dateMap = useMemo(() => {
    return {
      "0": getDateFromDays(0),
      "5": getDateFromDays(5),
      "10": getDateFromDays(10),
      "30": getDateFromDays(30),
    };
  }, []);

  // Which checkbox should be checked?
  const activeDays: number | null = (() => {
    if (todoDateFromURL === dateMap["0"]) return 0;
    if (todoDateFromURL === dateMap["5"]) return 5;
    if (todoDateFromURL === dateMap["10"]) return 10;
    if (todoDateFromURL === dateMap["30"]) return 30;
    return null;
  })();

  // Search input
  const [searchText, setSearchText] = useState(params.get("search") || "");

  const updateQuery = (key: string, value: string | null) => {
    const newParams = new URLSearchParams(params.toString());
    if (value) newParams.set(key, value);
    else newParams.delete(key);

    router.push(`/todos?${newParams.toString()}`);
  };

  const handleDateChange = (value: string | null) => {
    if (value === null) {
      updateQuery("todo_date", null);
      return;
    }

    const newDate = getDateFromDays(parseInt(value));
    updateQuery("todo_date", newDate);
  };

  const handleSearch = () => {
    updateQuery("search", searchText || null);
  };

  return (
    <div>
      <div className="flex gap-3 mt-8 h-9 items-center">
        {/* SEARCH */}
        <div className="relative flex-1 flex h-full bg-white border rounded border-[#D1D5DB]">
          <Input
            placeholder="Search your task here..."
            className="bg-transparent h-full flex-1 border-none rounded-none"
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSearch()}
          />
          <Button className="h-full w-10" onClick={handleSearch}>
            <Search />
          </Button>
        </div>

        {/* FILTERS */}
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

            <div className="flex flex-col gap-3">
              <DateFilterCheckbox
                label="Deadline Today"
                value={"0"}
                checked={activeDays === 0}
                onChange={handleDateChange}
              />

              <DateFilterCheckbox
                label="Expires in 5 days"
                value={"5"}
                checked={activeDays === 5}
                onChange={handleDateChange}
              />

              <DateFilterCheckbox
                label="Expires in 10 days"
                value={"10"}
                checked={activeDays === 10}
                onChange={handleDateChange}
              />

              <DateFilterCheckbox
                label="Expires in 30 days"
                value={"30"}
                checked={activeDays === 30}
                onChange={handleDateChange}
              />
            </div>
          </PopoverContent>
        </Popover>
      </div>
    </div>
  );
};

export default Filters;

interface DateFilterCheckboxProps {
  label: string;
  value: string; // number of days
  checked: boolean;
  onChange: (value: string | null) => void;
}

export const DateFilterCheckbox = ({
  label,
  value,
  checked,
  onChange,
}: DateFilterCheckboxProps) => {
  return (
    <label className="flex items-center gap-2 text-sm text-gray-700">
      <Checkbox
        checked={checked}
        onCheckedChange={(val) => onChange(val ? value : null)}
      />
      {label}
    </label>
  );
};

// Helper for date conversion
const getDateFromDays = (days: number) => {
  const d = new Date();
  d.setDate(d.getDate() + days);

  return d.toISOString().split("T")[0]; // YYYY-MM-DD
};
