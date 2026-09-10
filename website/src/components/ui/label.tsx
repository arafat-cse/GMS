import * as React from "react";

import { cn } from "@/lib/utils";

function Label({ className, ...props }: React.LabelHTMLAttributes<HTMLLabelElement>) {
  return (
    <label
      className={cn(
        "text-xs font-bold uppercase tracking-wider text-muted-foreground",
        className
      )}
      {...props}
    />
  );
}

export { Label };
