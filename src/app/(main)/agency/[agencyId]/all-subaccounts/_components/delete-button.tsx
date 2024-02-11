"use client";
import * as React from "react";
import { useRouter } from "next/navigation";
import {
  deleteSubAccount,
  getSubaccountDetails,
  saveActivityLogsNotification,
} from "@/lib/queries";

interface Props {
  subaccountId: string;
}

const DeleteButton: React.FC<Props> = ({ subaccountId }) => {
  const router = useRouter();

  const onClick = async () => {
    const response = await getSubaccountDetails(subaccountId);

    await saveActivityLogsNotification({
      agencyId: undefined,
      description: `Deleted a subaccount | ${response?.name}`,
      subaccountId: subaccountId,
    });

    await deleteSubAccount(subaccountId);
    router.refresh();
  };

  return <div onClick={onClick}>Delete Sub Account</div>;
};

export default DeleteButton;
