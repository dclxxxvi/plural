import * as React from "react";
import { EditorBtns } from "@/lib/constants";
import Image from "next/image";

interface Props {}

const CheckoutPlaceholder: React.FC<Props> = ({}) => {
  const handleDragStart = (e: React.DragEvent, type: EditorBtns) => {
    if (type === null) return;
    e.dataTransfer.setData("componentType", type);
  };

  return (
    <div
      draggable
      onDragStart={(e) => {
        handleDragStart(e, "paymentForm");
      }}
      className="h-14 w-14 bg-muted rounded-lg flex items-center justify-center"
    >
      <Image
        src={"/stripelogo.png"}
        alt={"stripe logo"}
        className={"object-cover"}
        height={40}
        width={40}
      />
    </div>
  );
};

export default CheckoutPlaceholder;
