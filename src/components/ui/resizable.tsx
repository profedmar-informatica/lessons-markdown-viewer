import * as React from "react";
import { GripVertical } from "lucide-react";
import { PanelResizeHandle, PanelGroup, Panel } from "react-resizable-panels";

import { cn } from "@/lib/utils";

const ResizablePanelGroup = ({
  className,
  ...props
}: React.ComponentProps<typeof PanelGroup>) => (
  <PanelGroup
    className={cn(
      "flex h-full w-full data-[panel-group-direction=vertical]:flex-col",
      className
    )}
    {...props}
  />
);

const ResizablePanel = Panel;

interface ResizableHandleProps extends React.ComponentPropsWithoutRef<typeof PanelResizeHandle> {
  withHandle?: boolean;
}

const ResizableHandle = React.forwardRef<
  React.ElementRef<typeof PanelResizeHandle>,
  ResizableHandleProps
>(({ className, withHandle, ...props }, ref) => {
  // Usamos uma asserção de tipo para contornar o problema de inferência do TypeScript
  // com o 'ref' em componentes aninhados de forwardRef de bibliotecas externas.
  const PanelResizeHandleComponent = PanelResizeHandle as React.ComponentType<any>;

  return (
    <PanelResizeHandleComponent
      ref={ref} // Passa o ref diretamente
      className={cn(
        "relative flex w-px items-center justify-center bg-border after:absolute after:inset-y-0 after:left-1/2 after:w-1 data-[panel-group-direction=vertical]:h-px data-[panel-group-direction=vertical]:w-full data-[panel-group-direction=vertical]:after:left-0 data-[panel-group-direction=vertical]:after:top-1/2 data-[panel-group-direction=vertical]:after:h-1 data-[panel-group-direction=vertical]:after:w-full data-[panel-group-direction=vertical]:hover:h-[5px] hover:after:bg-border-foreground hover:bg-primary",
        className
      )}
      {...props} // Passa as props restantes
    >
      {withHandle && (
        <div className="z-10 flex h-4 w-3 items-center justify-center rounded-sm border bg-border">
          <GripVertical className="h-2.5 w-2.5" />
        </div>
      )}
    </PanelResizeHandleComponent>
  );
});
ResizableHandle.displayName = "ResizableHandle";

export { ResizablePanelGroup, ResizablePanel, ResizableHandle };