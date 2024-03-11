import * as React from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { elements } from "@/app/(main)/subaccount/[subaccountId]/funnels/[funnelId]/editor/[funnelPageId]/_components/funnel-editor-sidebar/tabs/components-tab/elements";

const ComponentsTab: React.FC = () => {
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
