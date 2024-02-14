import * as React from "react";
import {
  getLanesWithTicketAndTags,
  getPipelineDetails,
  updateLanesOrder,
  updateTicketsOrder,
} from "@/lib/queries";
import { redirect } from "next/navigation";
import db from "@/lib/db";
import { LaneDetail } from "@/lib/types";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import PipelineInfobar from "@/app/(main)/subaccount/[subaccountId]/pipelines/_components/pipeline-infobar";
import PipelineSettings from "@/app/(main)/subaccount/[subaccountId]/pipelines/_components/pipeline-settings";
import PipelineView from "@/app/(main)/subaccount/[subaccountId]/pipelines/_components/pipeline-view";

interface Props {
  params: {
    subaccountId: string;
    pipelineId: string;
  };
}

const Page: React.FC<Props> = async ({ params }) => {
  const pipelineDetails = await getPipelineDetails(params.pipelineId);

  if (!pipelineDetails) {
    return redirect(`/subaccount/${params.subaccountId}/pipelines`);
  }

  const pipelines = await db.pipeline.findMany({
    where: {
      subAccountId: params.subaccountId,
    },
  });

  const lanes = (await getLanesWithTicketAndTags(
    params.pipelineId,
  )) as LaneDetail[];

  return (
    <Tabs defaultValue={"view"} className={"w-full"}>
      <TabsList
        className={"bg-transparent border-b-2 h-16 w-full justify-between mb-4"}
      >
        <PipelineInfobar
          pipelineId={params.pipelineId}
          subaccountId={params.subaccountId}
          pipelines={pipelines}
        />
        <div>
          <TabsTrigger value={"view"} className={"!bg-transparent w-40"}>
            Pipeline View
          </TabsTrigger>
          <TabsTrigger value={"settings"} className={"!bg-transparent w-40"}>
            Settings
          </TabsTrigger>
        </div>
      </TabsList>
      <TabsContent value={"view"}>
        <PipelineView
          lanes={lanes}
          pipelineDetails={pipelineDetails}
          pipelineId={params.pipelineId}
          subaccountId={params.subaccountId}
          updateLanesOrder={updateLanesOrder}
          updateTicketsOrder={updateTicketsOrder}
        />
      </TabsContent>
      <TabsContent value={"settings"}>
        <PipelineSettings
          pipelineId={params.pipelineId}
          subaccountId={params.subaccountId}
          pipelines={pipelines}
        />
      </TabsContent>
    </Tabs>
  );
};

export default Page;
