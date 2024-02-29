"use client";
import * as React from "react";
import { EditorElement, useEditor } from "@/providers/editor/editor-provider";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { EditorBtns } from "@/lib/constants";
import {
  CheckCircle2Icon,
  Contact2Icon,
  Link2Icon,
  TypeIcon,
} from "lucide-react";
import { clsx } from "clsx";
import NotFound from "next/dist/client/components/not-found-error";

const Icon = ({ elementType }: { elementType: EditorBtns }) => {
  switch (elementType) {
    case "text":
      return <TypeIcon className={"text-muted-foreground w-full h-full"} />;
    case "link":
      return <Link2Icon className={"text-muted-foreground w-full h-full"} />;
    case "contactForm":
      return <Contact2Icon className={"text-muted-foreground w-full h-full"} />;
    case "paymentForm":
      return (
        <CheckCircle2Icon className={"text-muted-foreground w-full h-full"} />
      );
    case "__body":
    case "container":
      return (
        <div className={"w-full h-full"}>
          <div className="border-dashed border-[1px] h-full border-muted-foreground/50 w-full" />
        </div>
      );
    default:
      return <NotFound className={"text-muted-foreground w-full h-full"} />;
  }
};

interface Props {
  element: EditorElement;
  selectedElement: EditorElement;
  handleClick: (element: EditorElement) => (e: React.MouseEvent) => void;
}

const RecursiveLayer = ({ element, selectedElement, handleClick }: Props) => {
  if (Array.isArray(element.content) && element.content.length > 0) {
    return (
      <Accordion type={"multiple"} className={""}>
        <AccordionItem
          onClick={handleClick(element)}
          value={element.id}
          className={"p-0 m-0"}
        >
          <AccordionTrigger className="!no-underline m-0 p-0 pr-2 hover:bg-gray-700/25 transition-all">
            <div className={"flex justify-center items-center gap-3 p-3"}>
              <div className={"w-5 h-5"}>
                <Icon elementType={element.type} />
              </div>
              <span className={"text-sm"}>{element.name}</span>
            </div>
          </AccordionTrigger>
          <AccordionContent className={"p-0"}>
            {element.content.map((el) => (
              <RecursiveLayer
                key={el.id}
                element={el}
                handleClick={handleClick}
                selectedElement={selectedElement}
              />
            ))}
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    );
  }

  return (
    <div
      className={clsx(
        "flex justify-start items-center gap-3 p-3 cursor-pointer hover:bg-gray-700/25 transition-all pl-5",
        {
          "hover:bg-gray-700/60 bg-gray-700/50 transition-all":
            selectedElement.id === element.id,
        },
      )}
      onClick={handleClick(element)}
    >
      <div className={"w-5 h-5"}>
        <Icon elementType={element.type} />
      </div>
      <span className={"text-sm"}>{element.name}</span>
    </div>
  );
};

const LayersTab: React.FC = () => {
  const { state, dispatch } = useEditor();

  const handleClick = (element: EditorElement) => (e: React.MouseEvent) => {
    e.stopPropagation();

    dispatch({
      type: "CHANGE_CLICKED_ELEMENT",
      payload: {
        elementDetails: element,
      },
    });
  };

  const selectedElement = state.editor.selectedElement;

  return (
    <RecursiveLayer
      selectedElement={selectedElement}
      element={state.editor.elements[0]}
      handleClick={handleClick}
    />
  );
};

export default LayersTab;
