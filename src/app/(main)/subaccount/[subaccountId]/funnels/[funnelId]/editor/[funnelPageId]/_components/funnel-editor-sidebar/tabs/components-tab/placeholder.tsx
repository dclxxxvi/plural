import * as React from "react";
import { EditorBtns } from "@/lib/constants";
import { PropsWithChildren } from "react";

interface Props {
  type: EditorBtns;
}

const Placeholder: React.FC<PropsWithChildren<Props>> = ({
  type,
  children,
}) => {
  const handleDragStart = (e: React.DragEvent) => {
    if (type === null) return;
    e.dataTransfer.setData("componentType", type);
  };

  return (
    <div
      draggable
      onDragStart={(e) => {
        handleDragStart(e);
      }}
      className="p-3 h-14 w-14 bg-muted rounded-lg flex items-center justify-center"
    >
      {children}
    </div>
  );
};

export default Placeholder;
