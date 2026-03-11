"use client";

import * as React from "react";
import { GripVertical } from "lucide-react";
import { PanelResizeHandle, PanelGroup, Panel } from "react-resizable-panels";

import { cn } from "@/lib/utils";

const ResizablePanelGroup = PanelGroup;
const ResizablePanel = Panel;

// Define as props para o nosso componente ResizableHandle
// Usa ComponentPropsWithoutRef para as props do nosso componente, conforme solicitado.
interface ResizableHandleProps extends React.ComponentPropsWithoutRef<typeof PanelResizeHandle> {
  withHandle?: boolean;
}

const ResizableHandle = React.forwardRef<
  React.ElementRef<typeof PanelResizeHandle>, // Tipo do ref
  ResizableHandleProps // Tipo das props do nosso componente (sem 'ref')
>(({ className, withHandle, ...props }, ref) => {
  // Cria um novo tipo que explicitamente inclui 'ref' para o PanelResizeHandle.
  // Isso contorna a possível falta da propriedade 'ref' na tipagem original da biblioteca.
  type PanelResizeHandleWithRef = React.ComponentType<
    React.ComponentProps<typeof PanelResizeHandle> & { ref?: React.Ref<React.ElementRef<typeof PanelResizeHandle>> }
  >;

  // Faz um cast do componente PanelResizeHandle para o nosso tipo com 'ref'
  const TypedPanelResizeHandle = PanelResizeHandle as PanelResizeHandleWithRef;

  return (
    <TypedPanelResizeHandle
      ref={ref} // 'ref' é agora corretamente tipado e passado
      className={cn(
        "relative flex w-px items-center justify-center bg-border after:absolute after:inset-y-0 after:left-1/2 after:w-1 after:-translate-x-1/2 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring focus-visible:ring-offset-1 data-[panel-group-direction=vertical]:h-px data-[panel-group-direction=vertical]:w-full data-[panel-group-direction=vertical]:after:left-0 data-[panel-group-direction=vertical]:after:h-1 data-[panel-group-direction=vertical]:after:w-full data-[panel-group-direction=vertical]:after:-translate-y-1/2 data-[panel-group-direction=vertical]:after:translate-x-0",
        className
      )}
      {...props} // Passa as demais props
    >
      {withHandle && (
        <div className="z-10 flex h-4 w-3 items-center justify-center rounded-sm border bg-border">
          <GripVertical className="h-2.5 w-2.5" />
        </div>
      )}
    </TypedPanelResizeHandle>
  );
});

ResizableHandle.displayName = "ResizableHandle";

export { ResizablePanelGroup, ResizablePanel, ResizableHandle };