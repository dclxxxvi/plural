import * as React from "react";
import db from "@/lib/db";
import DataTable from "@/app/(main)/agency/[agencyId]/team/data-table";
import { Plus } from "lucide-react";
import { currentUser } from "@clerk/nextjs";
import { columns } from "@/app/(main)/agency/[agencyId]/team/columns";
import SendInvitation from "@/components/forms/send-invitation";

interface Props {
  params: {
    agencyId: string;
  };
}

const Page: React.FC<Props> = async ({ params }) => {
  const authUser = await currentUser();

  const teamMembers = await db.user.findMany({
    where: {
      Agency: {
        id: params.agencyId,
      },
    },
    include: {
      Agency: {
        include: {
          SubAccount: true,
        },
      },
      Permissions: {
        include: {
          SubAccount: true,
        },
      },
    },
  });

  if (!authUser) {
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

  return (
    <DataTable
      actionButtonText={
        <>
          <Plus size={15} />
          Add
        </>
      }
      modalChildren={<SendInvitation agencyId={params.agencyId} />}
      filterValue={"name"}
      columns={columns}
      data={teamMembers}
    ></DataTable>
  );
};

export default Page;
