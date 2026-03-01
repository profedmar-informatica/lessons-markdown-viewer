import * as React from "react";
import * as RechartsPrimitive from "recharts";
// Removed direct import of TooltipPayload, LegendPayload as they are not directly exported

import { cn } from "@/lib/utils";

// Workaround for https://github.com/recharts/recharts/issues/3615
const CartesianAxis = RechartsPrimitive.CartesianAxis as any;

const ChartContext = React.createContext<{
  theme: Record<string, string>;
  set  : React.Dispatch<React.SetStateAction<Record<string, string>>>;
}>({
  theme: {},
  set  : () => {},
});

function useChart() {
  return React.useContext(ChartContext);
}

type ChartProps = React.ComponentProps<typeof RechartsPrimitive.ResponsiveContainer> & {
  config: Record<string, { label?: string; color?: string; icon?: React.ElementType }>;
  children?: React.ReactNode;
  id?: string; // Added id to ChartProps
};

const Chart = React.forwardRef<
  HTMLDivElement,
  ChartProps
>(({ config, className, children, id, ...props }, ref) => {
  const [theme, setTheme] = React.useState<Record<string, string>>(() => {
    const baseColor = "hsl(var(--chart-1))";

    return Object.entries(config).reduce(
      (acc, [key, value]: [string, { color?: string }]) => {
        acc[key] = value.color || baseColor;
        return acc;
      },
      {} as Record<string, string>
    );
  });

  return (
    <ChartContext.Provider value={{ theme, set: setTheme }}>
      <div
        ref={ref}
        className={cn("h-[400px] w-full", className)}
        {...(typeof id === 'string' ? { id } : {})}
        {...props}
      >
        <RechartsPrimitive.ResponsiveContainer {...props}>
          {children}
        </RechartsPrimitive.ResponsiveContainer>
      </div>
    </ChartContext.Provider>
  );
});
Chart.displayName = "Chart";

const ChartTooltip = RechartsPrimitive.Tooltip;

// Define a local interface for Recharts payload items
interface RechartsPayloadItem {
  value: any;
  name: string;
  dataKey: string;
  color?: string;
  payload: any;
  // Add other properties from the actual payload item if necessary
}

const ChartTooltipContent = React.forwardRef<
  HTMLDivElement,
  React.ComponentProps<typeof RechartsPrimitive.Tooltip> &
    React.ComponentPropsWithoutRef<"div"> & {
      hideLabel?: boolean;
      hideIndicator?: boolean;
      formatter?: (
        value: number,
        name: string,
        item: RechartsPayloadItem, // Using local interface
        index: number
      ) => string;
    }
>(
  (
    {
      active,
      payload,
      className,
      formatter,
      hideLabel = false,
      hideIndicator = false,
      labelFormatter,
      labelClassName,
      ...props
    },
    ref
  ) => {
    const { theme } = useChart();

    if (active && payload && payload.length) {
      return (
        <div
          ref={ref}
          className={cn(
            "grid min-w-[130px] items-center rounded-xl border border-border bg-background p-4 text-xs shadow-md",
            className
          )}
          {...props}
        >
          {!hideLabel && (
            <div className="border-b border-border pb-2 text-sm font-medium">
              {labelFormatter ? labelFormatter(payload[0].payload.label, payload) : payload[0].payload.label}
            </div>
          )}
          <div className="grid gap-1 pt-2">
            {payload.map((item, index) => {
              if (!item.color) {
                item.color = theme[item.dataKey as string] || "hsl(var(--chart-1))";
              }
              return (
                <div
                  key={`item-${index}`}
                  className="flex items-center justify-between gap-4"
                >
                  {item.name && (
                    <div className="flex items-center gap-2">
                      {!hideIndicator && (
                        <span
                          className="flex h-3 w-3 rounded-full"
                          style={{
                            backgroundColor: item.color,
                          }}
                        />
                      )}
                      {item.name}
                    </div>
                  )}
                  {item.value && (
                    <span className="text-muted-foreground">
                      {formatter
                        ? formatter(
                            item.value as number,
                            item.name as string,
                            item as RechartsPayloadItem, // Cast to local interface
                            index
                          )
                        : item.value}
                    </span>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      );
    }

    return null;
  }
);
ChartTooltipContent.displayName = "ChartTooltipContent";

const ChartLegend = React.forwardRef<
  HTMLDivElement,
  React.ComponentProps<typeof RechartsPrimitive.Legend> &
    React.ComponentPropsWithoutRef<"div"> & {
      itemClassName?: string;
      indicatorClassName?: string;
      formatter?: (
        value: string,
        entry: RechartsPayloadItem, // Using local interface
        index: number
      ) => string;
    }
>(
  (
    { className, itemClassName, indicatorClassName, formatter, ...props },
    ref
  ) => {
    const { theme, set: setTheme } = useChart();
    const [activeItems, setActiveItems] = React.useState<string[]>([]);

    const highlightStyle = (entry: RechartsPayloadItem) => { // Using local interface
      if (activeItems.length === 0) {
        return;
      }

      if (activeItems.includes(entry.value as string)) {
        return { filter: "grayscale(0%)", opacity: 1 };
      }

      return { filter: "grayscale(100%)", opacity: 0.2 };
    };

    return (
      <div
        ref={ref}
        className={cn(
          "flex flex-wrap items-center justify-center gap-2",
          className
        )}
        {...props}
      >
        {props.payload?.map((item, index) => {
          if (!item.color) {
            item.color = theme[item.dataKey as string] || "hsl(var(--chart-1))";
          }
          return (
            <div
              key={`item-${index}`}
              className={cn(
                "flex cursor-pointer items-center gap-1",
                itemClassName
              )}
              onClick={() => {
                if (activeItems.includes(item.value as string)) {
                  setActiveItems(activeItems.filter((i) => i !== item.value));
                  setTheme((prev) => ({
                    ...prev,
                    [item.dataKey as string]: item.color as string,
                  }));
                } else {
                  setActiveItems([...activeItems, item.value as string]);
                  setTheme((prev) => ({
                    ...prev,
                    [item.dataKey as string]: item.color as string,
                  }));
                }
              }}
            >
              <span
                className={cn(
                  "h-3 w-3 rounded-full",
                  indicatorClassName
                )}
                style={{
                  backgroundColor: item.color,
                  ...highlightStyle(item as RechartsPayloadItem), // Cast to local interface
                }}
              />
              {formatter ? formatter(item.value as string, item as RechartsPayloadItem, index) : item.value}
            </div>
          );
        })}
      </div>
    );
  }
);
ChartLegend.displayName = "ChartLegend";

export {
  Chart,
  ChartTooltip,
  ChartTooltipContent,
  ChartLegend,
  CartesianAxis,
};