import * as React from "react";
import { EditorBtns } from "@/lib/constants";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import TextPlaceholder from "@/app/(main)/subaccount/[subaccountId]/funnels/[funnelId]/editor/[funnelPageId]/_components/funnel-editor-sidebar/tabs/components-tab/text-placeholder";
import ContainerPlaceholder from "@/app/(main)/subaccount/[subaccountId]/funnels/[funnelId]/editor/[funnelPageId]/_components/funnel-editor-sidebar/tabs/components-tab/container-placeholder";
import VideoPlaceholder from "@/app/(main)/subaccount/[subaccountId]/funnels/[funnelId]/editor/[funnelPageId]/_components/funnel-editor-sidebar/tabs/components-tab/video-placeholder";

interface Props {}

const ComponentsTab: React.FC<Props> = ({}) => {
  const elements: {
    Component: React.ReactNode;
    label: string;
    id: EditorBtns;
    group: "layout" | "element";
  }[] = [
    {
      Component: <TextPlaceholder />,
      label: "Text",
      id: "text",
      group: "element",
    },
    {
      Component: <ContainerPlaceholder />,
      label: "Container",
      id: "container",
      group: "layout",
    },
    {
      Component: <VideoPlaceholder />,
      label: "Video",
      id: "video",
      group: "element",
    },
  ];

  return (
    <Accordion
      type={"multiple"}
      className={"w-full"}
      defaultValue={["Layout", "Elements"]}
    >
      <AccordionItem value={"Layout"} className={"px-6 py-0 border-y-[1px]"}>
        <AccordionTrigger className={"!no-underline"}>Layout</AccordionTrigger>
        <AccordionContent className={"flex flex-wrap gap-2"}>
          {elements
            .filter((el) => el.group === "layout")
            .map((el) => (
              <div
                key={el.id}
                className={"flex-col items-center justify-center flex"}
              >
                {el.Component}
                <span className={"text-muted-foreground"}>{el.label}</span>
              </div>
            ))}
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value={"Elements"} className={"px-6 py-0"}>
        <AccordionTrigger className={"!no-underline"}>
          Elements
        </AccordionTrigger>
        <AccordionContent className={"flex flex-wrap gap-2"}>
          {elements
            .filter((el) => el.group === "element")
            .map((el) => (
              <div
                key={el.id}
                className={"flex-col items-center justify-center flex"}
              >
                {el.Component}
                <span className={"text-muted-foreground"}>{el.label}</span>
              </div>
            ))}
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
};

export default ComponentsTab;
