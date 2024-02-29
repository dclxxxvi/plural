"use client";
import * as React from "react";
import { ProgressCircle } from "@tremor/react";

interface Props {
  value: number;
  description: React.ReactNode;
}

const CircleProgress: React.FC<Props> = ({ value = 0, description }) => {
  return (
    <div className={"flex gap-4 items-center"}>
      <ProgressCircle showAnimation value={value} radius={70} strokeWidth={20}>
        {value}%
      </ProgressCircle>
      <div>
        <b>Closing Rate</b>
        <p className={"text-muted-foreground"}>{description}</p>
      </div>
    </div>
  );
};

export default CircleProgress;
