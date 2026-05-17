import { cn } from "@/utils/cn";
import type { Category } from "@/types/content";

const COLOR_MAP: Record<string, string> = {
  "Web Development":      "bg-blue-100 text-blue-700 dark:bg-blue-500/20 dark:text-blue-300",
  "Mobile App Development":"bg-purple-100 text-purple-700 dark:bg-purple-500/20 dark:text-purple-300",
  "ReactJS":              "bg-cyan-100 text-cyan-700 dark:bg-cyan-500/20 dark:text-cyan-300",
  "Next.js":              "bg-gray-100 text-gray-700 dark:bg-gray-500/20 dark:text-gray-300",
  "Node.js":              "bg-green-100 text-green-700 dark:bg-green-500/20 dark:text-green-300",
  "Python":               "bg-yellow-100 text-yellow-700 dark:bg-yellow-500/20 dark:text-yellow-300",
  "DSA":                  "bg-red-100 text-red-700 dark:bg-red-500/20 dark:text-red-300",
  "Firebase":             "bg-orange-100 text-orange-700 dark:bg-orange-500/20 dark:text-orange-300",
  "Physics":              "bg-blue-100 text-blue-700 dark:bg-blue-500/20 dark:text-blue-300",
  "Chemistry":            "bg-green-100 text-green-700 dark:bg-green-500/20 dark:text-green-300",
  "Mathematics":          "bg-indigo-100 text-indigo-700 dark:bg-indigo-500/20 dark:text-indigo-300",
};

export function CategoryBadge({ category, className }: { category: string; className?: string }) {
  const style = COLOR_MAP[category] ?? "bg-gray-100 text-gray-600 dark:bg-gray-700 dark:text-gray-300";
  return (
    <span className={cn("badge text-[10px] sm:text-xs", style, className)}>
      {category}
    </span>
  );
}
