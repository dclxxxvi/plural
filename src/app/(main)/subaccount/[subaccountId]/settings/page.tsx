import * as React from "react";
import { currentUser } from "@clerk/nextjs";
import db from "@/lib/db";
import BlurPage from "@/components/global/blur-page";
import SubAccountDetails from "@/components/forms/subaccount-details";
import UserDetails from "@/components/forms/user-details";

interface Props {
  params: {
    subaccountId: string;
  };
}

const Page: React.FC<Props> = async ({ params }) => {
  const authUser = await currentUser();
  if (!authUser) return;

  const userDetails = await db.user.findUnique({
    where: {
      email: authUser.emailAddresses[0].emailAddress,
    },
  });
  if (!userDetails) return;

  const subAccount = await db.subAccount.findUnique({
    where: { id: params.subaccountId },
  });
  if (!subAccount) return;

  const agencyDetails = await db.agency.findUnique({
    where: { id: subAccount.agencyId },
    include: {
      SubAccount: true,
    },
  });
  if (!agencyDetails) return;
  const subAccounts = agencyDetails.SubAccount;

  return (
    <BlurPage>
      <div className={"flex lg:!flex-row flex-col gap-4"}>
        <SubAccountDetails
          agencyDetails={agencyDetails}
          userId={userDetails.id}
          userName={userDetails.name}
          details={subAccount}
        />
        <UserDetails
          id={params.subaccountId}
          type={"subaccount"}
          subAccounts={subAccounts}
          userData={userDetails}
        />
      </div>
    </BlurPage>
  );
};

export default Page;
