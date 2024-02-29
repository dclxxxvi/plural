"use client";
import * as React from "react";
import { EditorElement, useEditor } from "@/providers/editor/editor-provider";
import { clsx } from "clsx";
import { Badge } from "@/components/ui/badge";
import { Trash } from "lucide-react";
import { EditorBtns } from "@/lib/constants";
import Link from "next/link";

interface Props {
  element: EditorElement;
}

const LinkComponent: React.FC<Props> = ({ element }) => {
  const { dispatch, state } = useEditor();
  const { styles, content } = element;

  const handleDragStart = (e: React.DragEvent, type: EditorBtns) => {
    if (type === null) return;
    e.dataTransfer.setData("componentType", type);
  };

  const handleDeleteElement = () => {
    dispatch({
      type: "DELETE_ELEMENT",
      payload: {
        elementDetails: element,
      },
    });
  };

  const handleOnClickBody = (e: React.MouseEvent) => {
    e.stopPropagation();
    dispatch({
      type: "CHANGE_CLICKED_ELEMENT",
      payload: {
        elementDetails: element,
      },
    });
  };

  //TODO: Make it draggable

  return (
    <div
      style={styles}
      className={clsx(
        "p-[2px] w-full m-[5px] relative text-[16px] transition-all",
        {
          "!border-blue-500": state.editor.selectedElement.id === element.id,
          "!border-solid": state.editor.selectedElement.id === element.id,
          "border-dashed border-[1px] border-slate-300": !state.editor.liveMode,
        },
      )}
      draggable
      onClick={handleOnClickBody}
      onDragStart={(e) => handleDragStart(e, "text")}
    >
      {state.editor.selectedElement.id === element.id &&
        !state.editor.liveMode && (
          <Badge className="absolute -top-[23px] -left-[1px] rounded-none rounded-t-lg">
            {element.name}
          </Badge>
        )}

      {!Array.isArray(content) &&
        (state.editor.liveMode || state.editor.previewMode) && (
          <Link href={content.href || "#"} target={"_blank"}>
            {content.innerText || content.href}
          </Link>
        )}

      {!Array.isArray(content) &&
        !state.editor.liveMode &&
        !state.editor.previewMode && (
          <span
            contentEditable={!state.editor.liveMode}
            onBlur={(e) => {
              const spanElement = e.target as HTMLSpanElement;
              dispatch({
                type: "UPDATE_ELEMENT",
                payload: {
                  elementDetails: {
                    ...element,
                    content: {
                      innerText: spanElement.innerText,
                    },
                  },
                },
              });
            }}
          >
            {!Array.isArray(content) && content.innerText}
          </span>
        )}

      {state.editor.selectedElement.id === element.id &&
        !state.editor.liveMode && (
          <div className="absolute bg-primary px-2.5 py-1 text-xs font-bold -top-[25px] -right-[1px] rounded-none rounded-t-lg !text-white">
            <Trash
              className="cursor-pointer"
              size={16}
              onClick={handleDeleteElement}
            />
          </div>
        )}
    </div>
  );
};

export default LinkComponent;
