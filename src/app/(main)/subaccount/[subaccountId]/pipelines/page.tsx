import * as React from "react";
import db from "@/lib/db";
import { redirect } from "next/navigation";

interface Props {
  params: {
    subaccountId: string;
  };
}

const Page: React.FC<Props> = async ({ params }) => {
  const pipelineExists = await db.pipeline.findFirst({
    where: {
      subAccountId: params.subaccountId,
    },
  });

  if (pipelineExists) {
    return redirect(
      `/subaccount/${params.subaccountId}/pipelines/${pipelineExists.id}`,
    );
  }

  try {
    const response = await db.pipeline.create({
      data: { name: "First Pipeline", subAccountId: params.subaccountId },
    });

    return redirect(
      `/subaccount/${params.subaccountId}/pipelines/${response.id}`,
    );
  } catch (error) {
    console.log(error);
  }
};

export default Page;
