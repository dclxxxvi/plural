import * as React from "react";
import { EditorBtns } from "@/lib/constants";
import Placeholder from "@/app/(main)/subaccount/[subaccountId]/funnels/[funnelId]/editor/[funnelPageId]/_components/funnel-editor-sidebar/tabs/components-tab/placeholder";
import { Contact2Icon, Link2Icon, TypeIcon, Video } from "lucide-react";
import Image from "next/image";

export const elements: {
  Component: React.ReactNode;
  label: string;
  id: EditorBtns;
  group: "layout" | "element";
}[] = [
  {
    Component: (
      <Placeholder type={"container"}>
        <div className="border-dashed border-[1px] h-full rounded-sm bg-muted border-muted-foreground/50 w-full" />
      </Placeholder>
    ),
    label: "Container",
    id: "container",
    group: "layout",
  },
  {
    Component: (
      <Placeholder type={"2Col"}>
        <div className="h-full rounded-sm bg-muted border-muted-foreground/50 w-full flex flex-row gap-0.5">
          <div className="border-dashed border-[1px] h-full bg-muted border-muted-foreground/50 w-full" />
          <div className="border-dashed border-[1px] h-full bg-muted border-muted-foreground/50 w-full" />
        </div>
      </Placeholder>
    ),
    label: "2 Columns",
    id: "container",
    group: "layout",
  },
  {
    Component: (
      <Placeholder type={"3Col"}>
        <div className="h-full rounded-sm bg-muted border-muted-foreground/50 w-full flex flex-row gap-0.5">
          <div className="border-dashed border-[1px] h-full bg-muted border-muted-foreground/50 w-full" />
          <div className="border-dashed border-[1px] h-full bg-muted border-muted-foreground/50 w-full" />
          <div className="border-dashed border-[1px] h-full bg-muted border-muted-foreground/50 w-full" />
        </div>
      </Placeholder>
    ),
    label: "3 Columns",
    id: "container",
    group: "layout",
  },
  {
    Component: (
      <Placeholder type={"text"}>
        <TypeIcon className={"w-full h-full text-muted-foreground"} />
      </Placeholder>
    ),
    label: "Text",
    id: "text",
    group: "element",
  },
  {
    Component: (
      <Placeholder type={"video"}>
        <Video className={"w-full h-full text-muted-foreground"} />
      </Placeholder>
    ),
    label: "Video",
    id: "video",
    group: "element",
  },
  {
    Component: (
      <Placeholder type={"link"}>
        <Link2Icon className={"w-full h-full text-muted-foreground"} />
      </Placeholder>
    ),
    label: "Link",
    id: "link",
    group: "element",
  },
  {
    Component: (
      <Placeholder type={"contactForm"}>
        <Contact2Icon className={"w-full h-full text-muted-foreground"} />
      </Placeholder>
    ),
    label: "Contact",
    id: "contactForm",
    group: "element",
  },
  {
    Component: (
      <Placeholder type={"paymentForm"}>
        <Image
          src={"/stripelogo.png"}
          alt={"stripe logo"}
          className={"object-cover"}
          height={100}
          width={100}
        />
      </Placeholder>
    ),
    label: "Checkout",
    id: "paymentForm",
    group: "element",
  },
];
