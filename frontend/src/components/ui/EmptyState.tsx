import { cn } from "@/utils/cn";

interface EmptyStateProps {
  icon?: string;
  title: string;
  description?: string;
  action?: { label: string; onClick: () => void };
  className?: string;
}

export function EmptyState({ icon = "📭", title, description, action, className }: EmptyStateProps) {
  return (
    <div className={cn("flex flex-col items-center justify-center py-16 px-6 text-center", className)}>
      <div className="text-5xl mb-4 opacity-60">{icon}</div>
      <h3 className="text-base font-semibold text-gray-700 dark:text-slate-300 mb-1">{title}</h3>
      {description && (
        <p className="text-sm text-gray-400 dark:text-slate-500 max-w-xs">{description}</p>
      )}
      {action && (
        <button onClick={action.onClick} className="btn-primary mt-4 text-sm">
          {action.label}
        </button>
      )}
    </div>
  );
}
