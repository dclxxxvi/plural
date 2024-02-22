import * as React from "react";
import db from "@/lib/db";
import { redirect } from "next/navigation";
import EditorProvider from "@/providers/editor/editor-provider";
import FunnelEditorNavigation from "@/app/(main)/subaccount/[subaccountId]/funnels/[funnelId]/editor/[funnelPageId]/_components/funnel-editor-navigation";

interface Props {
  params: {
    subaccountId: string;
    funnelId: string;
    funnelPageId: string;
  };
}

const Page: React.FC<Props> = async ({ params }) => {
  const funnelPageDetails = await db.funnelPage.findFirst({
    where: {
      id: params.funnelPageId,
    },
  });

  if (!funnelPageDetails) {
    return redirect(
      `/subaccount/${params.subaccountId}/funnels/${params.funnelId}`,
    );
  }

  return (
    <div
      className={
        "fixed top-0 bottom-0 left-0 right-0 z-[20] bg-background overflow-hidden"
      }
    >
      <EditorProvider
        subaccountId={params.subaccountId}
        funnelId={params.funnelId}
        pageDetails={funnelPageDetails}
      >
        <FunnelEditorNavigation
          funnelId={params.funnelId}
          funnelPageDetails={funnelPageDetails}
          subaccountId={params.subaccountId}
        />
      </EditorProvider>
    </div>
  );
};

export default Page;
