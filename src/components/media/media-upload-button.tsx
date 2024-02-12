"use client";
import * as React from "react";
import { useModal } from "@/providers/modal-provider";
import { Button } from "@/components/ui/button";
import CustomModal from "@/components/global/custom-modal";
import UploadMediaForm from "@/components/forms/upload-media";

interface Props {
  subaccountId: string;
}

const MediaUploadButton: React.FC<Props> = ({ subaccountId }) => {
  const { isOpen, setOpen, setClose } = useModal();

  return (
    <Button
      onClick={() => {
        setOpen(
          <CustomModal
            title={"Upload Media"}
            subheading={"Upload a file to your media bucket"}
          >
            <UploadMediaForm subaccountId={subaccountId}></UploadMediaForm>
          </CustomModal>,
        );
      }}
    >
      Upload
    </Button>
  );
};

export default MediaUploadButton;
