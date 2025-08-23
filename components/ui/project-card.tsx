import * as React from "react";
import { cn } from "@/lib/utils";

// Special Project Card
export function ProjectCard({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        "rounded-2xl p-2 bg-gradient-to-br from-slate-100 to-slate-50 dark:from-slate-800 dark:to-slate-900 border border-slate-200 dark:border-slate-700 shadow-xl hover:shadow-2xl transition",
        className
      )}
      {...props}
    />
  );
}
