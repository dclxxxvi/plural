import * as React from "react";
import { currentUser } from "@clerk/nextjs";
import db from "@/lib/db";
import AgencyDetails from "@/components/forms/agency-details";
import UserDetails from "@/components/forms/user-details";

interface Props {
  params: {
    agencyId: string;
  };
}

const Page: React.FC<Props> = async ({ params }) => {
  const authUser = await currentUser();
  if (!authUser) {
    return null;
  }
  const userDetails = await db.user.findUnique({
    where: {
      email: authUser.emailAddresses[0].emailAddress,
    },
  });

  if (!userDetails) {
    return null;
  }

  const agencyDetails = await db.agency.findUnique({
    where: {
      id: params.agencyId,
    },
    include: {
      SubAccount: true,
    },
  });

  if (!agencyDetails) {
    return null;
  }

  const subAccounts = agencyDetails.SubAccount;

  return (
    <div className={"flex lg:!flex-row flex-col gap-4"}>
      <AgencyDetails data={agencyDetails} />
      <UserDetails
        type={"agency"}
        id={params.agencyId}
        subAccounts={subAccounts}
        userData={userDetails}
      />
    </div>
  );
};

export default Page;
