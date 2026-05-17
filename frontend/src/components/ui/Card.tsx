import { cn } from "@/utils/cn";

interface CardProps {
  children: React.ReactNode;
  className?: string;
  glass?: boolean;
}

export function Card({ children, className, glass }: CardProps) {
  return (
    <div
      className={cn(
        "rounded-2xl border border-gray-100 shadow-sm p-4 sm:p-6",
        glass ? "bg-white/70 backdrop-blur-md" : "bg-white",
        className
      )}
    >
      {children}
    </div>
  );
}

export function StatCard({
  label,
  value,
  icon,
  color = "blue",
}: {
  label: string;
  value: string | number;
  icon: string;
  color?: "blue" | "green" | "purple" | "orange";
}) {
  const colors = {
    blue:   "bg-blue-50   text-blue-700",
    green:  "bg-green-50  text-green-700",
    purple: "bg-purple-50 text-purple-700",
    orange: "bg-orange-50 text-orange-700",
  };

  return (
    <Card className="flex items-center gap-3 sm:gap-4 p-4 sm:p-5">
      <div className={cn("text-xl sm:text-3xl p-2 sm:p-3 rounded-xl shrink-0", colors[color])}>
        {icon}
      </div>
      <div className="min-w-0">
        <p className="text-xl sm:text-2xl font-bold text-gray-800">{value}</p>
        <p className="text-xs sm:text-sm text-gray-500 truncate">{label}</p>
      </div>
    </Card>
  );
}
