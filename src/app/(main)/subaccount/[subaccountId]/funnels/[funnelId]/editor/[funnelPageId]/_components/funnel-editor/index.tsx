"use client";
import * as React from "react";
import { useEditor } from "@/providers/editor/editor-provider";
import { useEffect } from "react";
import { getFunnelPageDetails } from "@/lib/queries";
import { clsx } from "clsx";
import { Button } from "@/components/ui/button";
import { EyeOff } from "lucide-react";
import Recursive from "@/app/(main)/subaccount/[subaccountId]/funnels/[funnelId]/editor/[funnelPageId]/_components/funnel-editor/funnel-editor-components/recursive";

interface Props {
  funnelPageId: string;
  liveMode?: boolean;
}

const FunnelEditor: React.FC<Props> = ({ funnelPageId, liveMode }) => {
  const { dispatch, state } = useEditor();

  useEffect(() => {
    if (liveMode) {
      dispatch({
        type: "TOGGLE_LIVE_MODE",
        payload: { value: true },
      });
    }
  }, [liveMode, dispatch]);

  // TODO: make this more performant
  useEffect(() => {
    const fetchData = async () => {
      const response = await getFunnelPageDetails(funnelPageId);
      if (!response) return;

      dispatch({
        type: "LOAD_DATA",
        payload: {
          elements: response.content ? JSON.parse(response?.content) : "",
          withLive: !!liveMode,
        },
      });
    };
  }, [funnelPageId, dispatch]);

  const handleClick = () => {
    dispatch({
      type: "CHANGE_CLICKED_ELEMENT",
      payload: {},
    });
  };

  const handleUnpreview = () => {
    dispatch({
      type: "TOGGLE_PREVIEW_MODE",
    });
    dispatch({
      type: "TOGGLE_LIVE_MODE",
    });
  };

  return (
    <div
      className={clsx(
        "use-automation-zoom-in h-full overflow-scroll mr-[385px] bg-background transition-all rounded-md",
        {
          "!p-0 !mr-0":
            state.editor.previewMode === true || state.editor.liveMode === true,
          "!w-[850px]": state.editor.device === "Tablet",
          "!w-[420px]": state.editor.device === "Mobile",
          "w-full": state.editor.device === "Desktop",
        },
      )}
      onClick={handleClick}
    >
      {state.editor.previewMode && state.editor.liveMode && (
        <Button
          variant={"ghost"}
          size={"icon"}
          className={"w-6 h-6 bg-slate-600 p-[2px] fixed top-0 left-0 z-[100]"}
          onClick={handleUnpreview}
        >
          <EyeOff />
        </Button>
      )}
      {Array.isArray(state.editor.elements) &&
        state.editor.elements.map((childElement) => (
          <Recursive key={childElement.id} element={childElement} />
        ))}
    </div>
  );
};

export default FunnelEditor;
