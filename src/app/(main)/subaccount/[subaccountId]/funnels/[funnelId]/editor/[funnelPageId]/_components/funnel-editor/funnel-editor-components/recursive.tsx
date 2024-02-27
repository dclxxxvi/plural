import * as React from "react";
import { EditorElement } from "@/providers/editor/editor-provider";
import TextComponent from "@/app/(main)/subaccount/[subaccountId]/funnels/[funnelId]/editor/[funnelPageId]/_components/funnel-editor/funnel-editor-components/text-component";
import Container from "@/app/(main)/subaccount/[subaccountId]/funnels/[funnelId]/editor/[funnelPageId]/_components/funnel-editor/funnel-editor-components/container";
import VideoComponent from "@/app/(main)/subaccount/[subaccountId]/funnels/[funnelId]/editor/[funnelPageId]/_components/funnel-editor/funnel-editor-components/video";

interface Props {
  element: EditorElement;
}

const Recursive: React.FC<Props> = ({ element }) => {
  switch (element.type) {
    case "text":
      return <TextComponent element={element} />;
    case "__body":
      return <Container element={element} />;
    case "container":
      return <Container element={element} />;
    case "video":
      return <VideoComponent element={element} />;
    default:
      return null;
  }
};

export default Recursive;
