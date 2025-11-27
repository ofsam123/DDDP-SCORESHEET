import React from "react";
import * as ScrollAreaPrimitive from "@radix-ui/react-scroll-area";

function cn(...classes) {
  return classes.filter(Boolean).join(" ");
}

export const ScrollArea = React.forwardRef(
  ({ className, children, ...props }, ref) => (
    <ScrollAreaPrimitive.Root
      ref={ref}
      className={cn("relative overflow-hidden", className)}
      {...props}
    >
      {/* Viewport allows both vertical + horizontal scroll */}
      <ScrollAreaPrimitive.Viewport className="w-full h-full overflow-auto rounded-[inherit]">
        {/* Inline-block ensures wide content triggers horizontal scroll */}
        <div className="inline-block min-w-full">{children}</div>
      </ScrollAreaPrimitive.Viewport>

      {/* Scrollbars */}
      <ScrollBar orientation="vertical" />
      <ScrollBar orientation="horizontal" />
      <ScrollAreaPrimitive.Corner />
    </ScrollAreaPrimitive.Root>
  )
);

ScrollArea.displayName = "ScrollArea";

export const ScrollBar = React.forwardRef(
  ({ className, orientation = "vertical", ...props }, ref) => (
    <ScrollAreaPrimitive.ScrollAreaScrollbar
      ref={ref}
      orientation={orientation}
      className={cn(
        "flex touch-none select-none transition-colors",
        orientation === "vertical"
          ? "h-full w-2.5 border-l border-l-transparent p-[1px]"
          : "h-2.5 flex-col border-t border-t-transparent p-[1px]",
        className
      )}
      {...props}
    >
      <ScrollAreaPrimitive.ScrollAreaThumb className="flex-1 rounded-full bg-gray-500" />
    </ScrollAreaPrimitive.ScrollAreaScrollbar>
  )
);

ScrollBar.displayName = "ScrollBar";
