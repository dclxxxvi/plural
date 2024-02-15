"use client";
import * as React from "react";
import { useModal } from "@/providers/modal-provider";
import { Button } from "@/components/ui/button";
import CustomModal from "@/components/global/custom-modal";
import ContactUserForm from "@/components/forms/contact-user-form";

interface Props {
  subaccountId: string;
}

const CreateContactButton: React.FC<Props> = ({ subaccountId }) => {
  const { setOpen } = useModal();

  const handleCreateContact = () => {
    setOpen(
      <CustomModal
        title={"Create or Update Contact Information"}
        subheading={"Contacts are like customers."}
      >
        <ContactUserForm subaccountId={subaccountId} />
      </CustomModal>,
    );
  };

  return <Button onClick={handleCreateContact}>Create Contact</Button>;
};

export default CreateContactButton;
