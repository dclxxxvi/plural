import * as React from "react";
import { EditorElement, useEditor } from "@/providers/editor/editor-provider";
import { ClassValue, clsx } from "clsx";
import { Badge } from "@/components/ui/badge";
import { Trash } from "lucide-react";
import { PropsWithChildren } from "react";

interface Props {
  element: EditorElement;
  classValues?: ClassValue[];
}

const EditorElement: React.FC<PropsWithChildren<Props>> = ({
  element,
  children,
  classValues = [],
}) => {
  const { state, dispatch } = useEditor();
  const { id, styles, type } = element;

  const handleOnClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    dispatch({
      type: "CHANGE_CLICKED_ELEMENT",
      payload: {
        elementDetails: element,
      },
    });
  };

  const handleDragStart = (e: React.DragEvent) => {
    e.stopPropagation();
    if (type === null) return;
    e.dataTransfer.setData("componentType", type);
    e.dataTransfer.setData("elementId", element.id);
  };

  const handleDeleteElement = () => {
    dispatch({
      type: "DELETE_ELEMENT",
      payload: {
        elementDetails: element,
      },
    });
  };

  return (
    <div
      draggable
      style={styles}
      className={clsx(
        "p-[2px] w-full m-[5px] relative text-[16px] transition-all",
        {
          "!border-blue-500": state.editor.selectedElement.id === id,
          "!border-solid": state.editor.selectedElement.id === id,
          "border-dashed border-[1px] border-slate-300": !state.editor.liveMode,
        },
        ...classValues,
      )}
      onClick={handleOnClick}
      onDragStart={(e) => handleDragStart(e)}
    >
      <Badge
        className={clsx(
          "absolute -top-[23px] -left-[1px] rounded-none rounded-t-lg hidden",
          {
            block:
              state.editor.selectedElement.id === element.id &&
              !state.editor.liveMode,
          },
        )}
      >
        {element.name}
      </Badge>
      {children}
      {state.editor.selectedElement.id === element.id &&
        !state.editor.liveMode && (
          <div className="absolute bg-primary px-2.5 py-1 text-xs font-bold -top-[25px] -right-[1px] rounded-none rounded-t-lg ">
            <Trash size={16} onClick={handleDeleteElement} />
          </div>
        )}
    </div>
  );
};

export default EditorElement;
