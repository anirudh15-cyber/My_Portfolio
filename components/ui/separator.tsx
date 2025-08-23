import * as React from "react";

export function Separator({ className }: { className?: string }) {
  return <div className={["h-px w-full bg-neutral-200 dark:bg-neutral-800", className].filter(Boolean).join(" ")} />;
}
