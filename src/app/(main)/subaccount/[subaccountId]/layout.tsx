import * as React from "react";
import {
  getAuthUserDetails,
  getNotificationAndUser,
  verifyAndAcceptInvitation,
} from "@/lib/queries";
import Unauthorized from "@/components/unauthorized";
import { currentUser } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import Sidebar from "@/components/sidebar";
import InfoBar from "@/components/global/infobar";
import { Role } from "@prisma/client";

interface Props {
  children: React.ReactNode;
  params: {
    subaccountId: string;
  };
}

const Layout: React.FC<Props> = async ({ children, params }) => {
  const agencyId = await verifyAndAcceptInvitation();
  if (!agencyId) {
    return <Unauthorized />;
  }

  const user = await currentUser();
  if (!user) {
    return redirect("/");
  }

  let notifications: any = [];

  if (!user.privateMetadata.role) {
    return <Unauthorized />;
  } else {
    const allPermissions = await getAuthUserDetails();
    const hasPermission = allPermissions?.Permissions?.find(
      (permissions) =>
        permissions.access && permissions.subAccountId === params.subaccountId,
    );
    if (!hasPermission) {
      return <Unauthorized />;
    }

    const allNotifications = await getNotificationAndUser(agencyId);

    if (
      user.privateMetadata.role === "AGENCY_ADMIN" ||
      user.privateMetadata.role === "AGENCY_OWNER"
    ) {
      notifications = allNotifications;
    } else {
      const filteredNoti = allNotifications?.filter(
        (item) => item.subAccountId === params.subaccountId,
      );
      if (filteredNoti) notifications = filteredNoti;
    }
  }

  return (
    <div className="h-screen overflow-hidden">
      <Sidebar id={params.subaccountId} type="subaccount" />
      <div className="md:pl-[300px]">
        <InfoBar
          notifications={notifications}
          role={user.privateMetadata.role as Role}
          subAccountId={params.subaccountId as string}
        />
        <div className="relative">{children}</div>
      </div>
    </div>
  );
};

export default Layout;
