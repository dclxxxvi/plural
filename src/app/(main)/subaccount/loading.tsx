import * as React from "react";
import Loading from "@/components/global/loading";

interface Props {}

const LoadingPage: React.FC<Props> = ({}) => {
  return (
    <div className={"h-screen w-screen flex justify-center items-center"}>
      <Loading />
    </div>
  );
};

export default LoadingPage;
