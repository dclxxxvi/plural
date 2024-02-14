import * as React from "react";
import BlurPage from "@/components/global/blur-page";

interface Props {
  children: React.ReactNode;
}

const Layout: React.FC<Props> = ({ children }) => {
  return <BlurPage>{children}</BlurPage>;
};

export default Layout;
