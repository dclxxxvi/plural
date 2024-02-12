import * as React from "react";
import { getMedia } from "@/lib/queries";
import BlurPage from "@/components/global/blur-page";
import MediaComponent from "@/components/media";

interface Props {
  params: {
    subaccountId: string;
  };
}

const Page: React.FC<Props> = async ({ params }) => {
  const data = await getMedia(params.subaccountId);
  return (
    <BlurPage>
      <MediaComponent data={data} subaccountId={params.subaccountId} />
    </BlurPage>
  );
};

export default Page;
