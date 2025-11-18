import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
export const formatDate = (date: string | Date) => {
  const d = new Date(date);

  return d.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
};

export function formatDateNumeric(
  dateInput?: string | Date,
  format: string = "DD/MM/YYYY"
): { formatted: string; day: string } {
  const date = dateInput ? new Date(dateInput) : new Date();

  if (isNaN(date.getTime())) {
    throw new Error("Invalid date provided");
  }

  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const year = date.getFullYear().toString();

  const formatted = format
    .replace("DD", day)
    .replace("MM", month)
    .replace("YYYY", year);

  const weekday = date.toLocaleDateString("en-US", { weekday: "long" });

  return { formatted, day: weekday };
}
