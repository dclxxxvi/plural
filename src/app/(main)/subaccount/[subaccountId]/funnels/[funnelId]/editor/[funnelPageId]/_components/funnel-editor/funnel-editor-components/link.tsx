"use client";
import * as React from "react";
import {
  EditorElement as EditorElementType,
  useEditor,
} from "@/providers/editor/editor-provider";
import Link from "next/link";
import EditorElement from "@/app/(main)/subaccount/[subaccountId]/funnels/[funnelId]/editor/[funnelPageId]/_components/funnel-editor/funnel-editor-components/editor-element";

interface Props {
  element: EditorElementType;
}

const LinkComponent: React.FC<Props> = ({ element }) => {
  const { dispatch, state } = useEditor();
  const { content } = element;

  return (
    <EditorElement element={element}>
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
    </EditorElement>
  );
};

export default LinkComponent;
