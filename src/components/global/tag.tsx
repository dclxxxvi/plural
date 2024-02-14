import React from "react";
import clsx from "clsx";
import { Check } from "lucide-react";

interface TagComponentProps {
  title: string;
  colorName: string;
  setSelectedColor?: (color: string) => void;
  selectedColor?: string;
}

const TagComponent: React.FC<TagComponentProps> = ({
  colorName,
  title,
  setSelectedColor,
  selectedColor,
}) => {
  return (
    <div
      className={clsx(
        "p-2 rounded-sm flex-shrink-0 text-xs cursor-pointer transition-all",
        {
          "bg-[#57acea]/10 text-[#57acea] hover:bg-[#57acea]/40":
            colorName === "BLUE",
          "bg-[#ffac7e]/10 text-[#ffac7e] hover:bg-[#ffac7e]/40":
            colorName === "ORANGE",
          "bg-rose-500/10 text-rose-500 hover:bg-rose-500/40":
            colorName === "ROSE",
          "bg-emerald-400/10 text-emerald-400 hover:bg-emerald-400/40":
            colorName === "GREEN",
          "bg-purple-400/10 text-purple-400 hover:bg-purple-400/40":
            colorName === "PURPLE",
          "border-[1px] border-[#57acea]": colorName === "BLUE" && !title,
          "border-[1px] border-[#ffac7e]": colorName === "ORANGE" && !title,
          "border-[1px] border-rose-500": colorName === "ROSE" && !title,
          "border-[1px] border-emerald-400": colorName === "GREEN" && !title,
          "border-[1px] border-purple-400": colorName === "PURPLE" && !title,
          "bg-[#57acea]/70":
            selectedColor === "BLUE" && selectedColor === colorName,
          "bg-[#ffac7e]/70":
            selectedColor === "ORANGE" && selectedColor === colorName,
          "bg-rose-500/70":
            selectedColor === "ROSE" && selectedColor === colorName,
          "bg-emerald-400/70":
            selectedColor === "GREEN" && selectedColor === colorName,
          "bg-purple-400/70":
            selectedColor === "PURPLE" && selectedColor === colorName,
        },
      )}
      key={colorName}
      onClick={() => {
        if (setSelectedColor) setSelectedColor(colorName);
      }}
    >
      {title}
    </div>
  );
};

export default TagComponent;
