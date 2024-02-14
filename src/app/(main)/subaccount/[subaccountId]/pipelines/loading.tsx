import * as React from "react";
import LoadingPage from "@/components/global/loading-page";

interface Props {}

const Loading: React.FC<Props> = ({}) => {
  return (
    <div className={"-mt-8 h-screen"}>
      <LoadingPage />
    </div>
  );
};

export default LoadingPage;
