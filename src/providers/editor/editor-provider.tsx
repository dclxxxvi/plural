"use client";
import { EditorBtns } from "@/lib/constants";
import { EditorAction } from "@/providers/editor/editor-actions";
import { FunnelPage } from "@prisma/client";
import React, { createContext, Dispatch, useContext, useReducer } from "react";
export type DeviceTypes = "Desktop" | "Mobile" | "Tablet";

export type EditorElement = {
  id: string;
  styles: React.CSSProperties;
  name: string;
  type: EditorBtns;
  content: EditorElement[] | {};
};

export type Editor = {
  liveMode: boolean;
  elements: EditorElement[];
  selectedElement: EditorElement;
  device: DeviceTypes;
  previewMode: boolean;
  funnelPageId: string;
};

export type HistoryState = {
  history: Editor[];
  currentIndex: number;
};

export type EditorState = {
  editor: Editor;
  history: HistoryState;
};

const initialElement = {
  id: "",
  content: [],
  name: "",
  styles: {},
  type: null,
};

const initialEditorState: EditorState["editor"] = {
  elements: [
    {
      content: [],
      id: "__body",
      name: "Body",
      styles: {},
      type: "__body",
    },
  ],
  selectedElement: { ...initialElement },
  device: "Desktop",
  previewMode: false,
  liveMode: false,
  funnelPageId: "",
};

const initialHistoryState: EditorState["history"] = {
  history: [initialEditorState],
  currentIndex: 0,
};

const initialState: EditorState = {
  editor: initialEditorState,
  history: initialHistoryState,
};

const addAnElement = (
  elements: EditorElement[],
  action: EditorAction,
): EditorElement[] => {
  if (action.type !== "ADD_ELEMENT") {
    throw Error(
      "You sent the wrong action type to the Add Element editor State",
    );
  }

  return elements.map((el) => {
    if (el.id === action.payload.containerId && Array.isArray(el.content)) {
      return {
        ...el,
        content: [...el.content, action.payload.elementDetails],
      };
    } else if (el.content && Array.isArray(el.content)) {
      return {
        ...el,
        content: addAnElement(el.content, action),
      };
    }
    return el;
  });
};

const updateAnElement = (
  elements: EditorElement[],
  action: EditorAction,
): EditorElement[] => {
  if (action.type !== "UPDATE_ELEMENT") {
    throw Error(
      "You sent the wrong action type to the Update Element editor State",
    );
  }

  return elements.map((el) => {
    if (el.id === action.payload.elementDetails.id) {
      return {
        ...el,
        ...action.payload.elementDetails,
      };
    } else if (el.content && Array.isArray(el.content)) {
      return {
        ...el,
        content: updateAnElement(el.content, action),
      };
    }
    return el;
  });
};

const deleteAnElement = (
  elements: EditorElement[],
  action: EditorAction,
): EditorElement[] => {
  if (action.type !== "DELETE_ELEMENT") {
    throw Error(
      "You sent the wrong action type to the Delete Element editor State",
    );
  }

  return elements.filter((el) => {
    if (el.id === action.payload.elementDetails.id) {
      return false;
    } else if (el.content && Array.isArray(el.content)) {
      el.content = deleteAnElement(el.content, action);
    }
    return true;
  });
};

const editorReducer = (
  state: EditorState = initialState,
  action: EditorAction,
): EditorState => {
  switch (action.type) {
    case "TOGGLE_PREVIEW_MODE": {
      return {
        ...state,
        editor: {
          ...state.editor,
          previewMode: !state.editor.previewMode,
        },
      };
    }
    case "UPDATE_ELEMENT": {
      const updatedElements = updateAnElement(state.editor.elements, action);
      const updatedElementIsSelected =
        state.editor.selectedElement.id === action.payload.elementDetails.id;
      const updatedEditorStateWithUpdate = {
        ...state.editor,
        elements: updatedElements,
        selectedElement: updatedElementIsSelected
          ? action.payload.elementDetails
          : { ...initialElement },
      };

      const updatedHistoryWithUpdate = [
        ...state.history.history.slice(0, state.history.currentIndex + 1),
        { ...updatedEditorStateWithUpdate },
      ];

      return {
        ...state,
        editor: updatedEditorStateWithUpdate,
        history: {
          ...state.history,
          history: updatedHistoryWithUpdate,
          currentIndex: updatedHistoryWithUpdate.length - 1,
        },
      };
    }
    case "DELETE_ELEMENT": {
      const updatedElementsAfterDelete = deleteAnElement(
        state.editor.elements,
        action,
      );
      const updatedEditorStateAfterDelete = {
        ...state.editor,
        elements: updatedElementsAfterDelete,
        selectedElement: { ...initialElement },
      };

      const updatedHistoryAfterDelete = [
        ...state.history.history.slice(0, state.history.currentIndex + 1),
        { ...updatedEditorStateAfterDelete },
      ];

      return {
        ...state,
        editor: updatedEditorStateAfterDelete,
        history: {
          ...state.history,
          history: updatedHistoryAfterDelete,
          currentIndex: updatedHistoryAfterDelete.length - 1,
        },
      };
    }
    case "CHANGE_CLICKED_ELEMENT": {
      return {
        ...state,
        editor: {
          ...state.editor,
          selectedElement: action.payload.elementDetails || {
            ...initialElement,
          },
        },
        history: {
          ...state.history,
          history: [
            ...state.history.history.slice(0, state.history.currentIndex + 1),
            { ...state.editor },
          ],
          currentIndex: state.history.currentIndex + 1,
        },
      };
    }

    case "CHANGE_DEVICE": {
      return {
        ...state,
        editor: {
          ...state.editor,
          device: action.payload.device,
        },
      };
    }
    case "TOGGLE_LIVE_MODE": {
      return {
        ...state,
        editor: {
          ...state.editor,
          liveMode: action.payload
            ? action.payload.value
            : !state.editor.liveMode,
        },
      };
    }
    case "REDO": {
      if (state.history.currentIndex < state.history.history.length - 1) {
        const nextIndex = state.history.currentIndex + 1;
        const nextEditorState = { ...state.history.history[nextIndex] };
        return {
          ...state,
          editor: nextEditorState,
          history: {
            ...state.history,
            currentIndex: nextIndex,
          },
        };
      }

      return state;
    }
    case "UNDO":
      if (state.history.currentIndex > 0) {
        const prevIndex = state.history.currentIndex - 1;
        const prevEditorState = { ...state.history.history[prevIndex] };
        return {
          ...state,
          editor: prevEditorState,
          history: {
            ...state.history,
            currentIndex: prevIndex,
          },
        };
      }
      return state;
    case "LOAD_DATA": {
      return {
        ...initialState,
        editor: {
          ...initialState.editor,
          elements: action.payload.elements || initialEditorState.elements,
          liveMode: Boolean(action.payload.withLive),
        },
      };
    }
    case "SET_FUNNELPAGE_ID": {
      const { funnelPageId } = action.payload;
      const updatedEditorStateWithFunnelPageId = {
        ...state.editor,
        funnelPageId,
      };

      const updatedHistoryWithFunnelPageId = [
        ...state.history.history.slice(0, state.history.currentIndex + 1),
        { ...updatedEditorStateWithFunnelPageId },
      ];

      return {
        ...state,
        editor: updatedEditorStateWithFunnelPageId,
        history: {
          ...state.history,
          history: updatedHistoryWithFunnelPageId,
          currentIndex: updatedHistoryWithFunnelPageId.length - 1,
        },
      };
    }
    case "ADD_ELEMENT": {
      const updatedEditorState = {
        ...state.editor,
        elements: addAnElement(state.editor.elements, action),
      };

      const updatedHistory = [
        ...state.history.history.slice(0, state.history.currentIndex + 1),
        { ...updatedEditorState },
      ];

      return {
        ...state,
        editor: updatedEditorState,
        history: {
          ...state.history,
          history: updatedHistory,
          currentIndex: updatedHistory.length - 1,
        },
      };
    }
    default: {
      return state;
    }
  }
};

//TODO: local storage state saving setup

export type EditorContextData = {
  device: DeviceTypes;
  previewMode: boolean;
  setPreviewMode: (previewMode: boolean) => void;
  setDevice: (device: DeviceTypes) => void;
};

export const EditorContext = createContext<{
  state: EditorState;
  dispatch: Dispatch<EditorAction>;
  subaccountId: string;
  funnelId: string;
  pageDetails: FunnelPage | null;
}>({
  state: initialState,
  dispatch: () => undefined,
  subaccountId: "",
  funnelId: "",
  pageDetails: null,
});

type EditorProps = {
  children: React.ReactNode;
  subaccountId: string;
  funnelId: string;
  pageDetails: FunnelPage;
};

export const EditorProvider = (props: EditorProps) => {
  const { subaccountId, funnelId, pageDetails, children } = props;
  //@ts-ignore
  const [state, dispatch] = useReducer(
    editorReducer,
    initialState,
    () => initialState,
  );

  return (
    <EditorContext.Provider
      value={{
        state,
        dispatch,
        subaccountId,
        funnelId,
        pageDetails,
      }}
    >
      {children}
    </EditorContext.Provider>
  );
};

export const useEditor = () => {
  const context = useContext(EditorContext);
  if (!context) {
    throw new Error("useEditor Hook must be used within the editor Provider");
  }
  return context;
};

export default EditorProvider;
