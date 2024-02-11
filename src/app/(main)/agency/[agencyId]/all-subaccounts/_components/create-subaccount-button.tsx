"use client";

import * as React from "react";
import { AgencySidebarOption, User, Agency, SubAccount } from "@prisma/client";
import { useModal } from "@/providers/modal-provider";
import { Button } from "@/components/ui/button";
import { twMerge } from "tailwind-merge";
import CustomModal from "@/components/global/custom-modal";
import SubaccountDetails from "@/components/forms/subaccount-details";
import { PlusCircleIcon } from "lucide-react";

interface Props {
  user: User & {
    Agency:
      | (
          | Agency
          | (null & {
              SubAccount: SubAccount[];
              SideBarOption: AgencySidebarOption[];
            })
        )
      | null;
  };
  id: string;
  className: string;
}

const CreateSubaccountButton: React.FC<Props> = ({ user, className, id }) => {
  const { setOpen } = useModal();
  const agencyDetails = user.Agency;

  if (!agencyDetails) return;

  const onClick = () => {
    setOpen(
      <CustomModal
        title={"Create a Subaccount"}
        subheading={"You can switch between"}
      >
        <SubaccountDetails
          agencyDetails={agencyDetails}
          userId={user.id}
          userName={user.name}
        />
      </CustomModal>,
    );
  };

  return (
    <Button
      className={twMerge("w-full flex gap-4", className)}
      onClick={onClick}
    >
      <PlusCircleIcon size={15} />
      Create Sub Account
    </Button>
  );
};

export default CreateSubaccountButton;
