import * as React from "react";
import { getDomainContent } from "@/lib/queries";
import { notFound } from "next/navigation";
import FunnelEditor from "@/app/(main)/subaccount/[subaccountId]/funnels/[funnelId]/editor/[funnelPageId]/_components/funnel-editor";
import EditorProvider from "@/providers/editor/editor-provider";

interface Props {
  params: {
    domain: string;
    path: string;
  };
}

const Page: React.FC<Props> = async ({ params }) => {
  const domainData = await getDomainContent(params.domain.slice(0, -1));

  if (!domainData) {
    return notFound();
  }

  const pageData = domainData.FunnelPages.find((page) => !page.pathName);

  if (!pageData) return notFound();

  return (
    <EditorProvider
      subaccountId={domainData.subAccountId}
      pageDetails={pageData}
      funnelId={domainData.id}
    >
      <FunnelEditor funnelPageId={pageData.id} liveMode={true} />
    </EditorProvider>
  );
};

export default Page;
