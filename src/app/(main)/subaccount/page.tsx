import * as React from "react";
import { getAuthUserDetails, verifyAndAcceptInvitation } from "@/lib/queries";
import Unauthorized from "@/components/unauthorized";
import { redirect } from "next/navigation";

interface Props {
  searchParams: {
    state: string;
    code: string;
  };
}

const Page: React.FC<Props> = async ({ searchParams }) => {
  const agencyId = await verifyAndAcceptInvitation();

  if (!agencyId) {
    return <Unauthorized />;
  }

  const user = getAuthUserDetails();
  if (!user) return null;

  const getFirstSubaccountWithAccess = user.Permissions?.find(
    (permission) => permission.access === true,
  );

  if (searchParams.state) {
    const statePath = searchParams.state.split("___")[0];
    const stateSubaccountId = searchParams.state.split("___")[1];
    if (!stateSubaccountId) {
      return <Unauthorized />;
    }
    return redirect(
      `/subaccount/${stateSubaccountId}/${statePath}?code=${searchParams.code}`,
    );
  }

  if (getFirstSubaccountWithAccess) {
    return redirect(`/subaccount/${getFirstSubaccountWithAccess.subAccountId}`);
  }

  return <Unauthorized />;
};

export default Page;
