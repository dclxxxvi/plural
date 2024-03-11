"use client";
import * as React from "react";
import {
  EditorElement as EditorElementType,
  useEditor,
} from "@/providers/editor/editor-provider";
import EditorElement from "@/app/(main)/subaccount/[subaccountId]/funnels/[funnelId]/editor/[funnelPageId]/_components/funnel-editor/funnel-editor-components/editor-element";

interface Props {
  element: EditorElementType;
}

const VideoComponent: React.FC<Props> = ({ element }) => {
  const { dispatch, state } = useEditor();
  const { content, styles } = element;

  return (
    <EditorElement
      element={element}
      classValues={[
        "p-[2px] w-full m-[5px] relative text-[16px] transition-all flex items-center justify-center",
      ]}
    >
      {!Array.isArray(content) && (
        <iframe
          width={styles.width || "560"}
          height={styles.height || "315"}
          src={content.src}
          title="YouTube video player"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        />
      )}
    </EditorElement>
  );
};

export default VideoComponent;
