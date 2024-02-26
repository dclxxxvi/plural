"use client";
import * as React from "react";
import { useEffect, useState } from "react";
import { getMedia } from "@/lib/queries";
import { GetMediaFiles } from "@/lib/types";
import MediaComponent from "@/components/media";

interface Props {
  subaccountId: string;
}

const MediaBucketTab: React.FC<Props> = ({ subaccountId }) => {
  const [data, setData] = useState<GetMediaFiles>(null);

  useEffect(() => {
    const fetchData = async () => {
      const response = await getMedia(subaccountId);
      setData(response);
    };

    fetchData();
  }, [subaccountId]);

  return (
    <div className={"h-[900px] overflow-scroll p-4"}>
      <MediaComponent data={data} subaccountId={subaccountId} />
    </div>
  );
};

export default MediaBucketTab;
