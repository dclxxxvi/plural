"use client";

import * as React from "react";
import { NotificationWithUser } from "@/lib/types";
import { useState } from "react";
import { twMerge } from "tailwind-merge";
import { UserButton } from "@clerk/nextjs";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Bell } from "lucide-react";
import { Notification, Role } from "@prisma/client";
import { Card } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ModeToggle } from "@/components/global/mode-toggle";

interface Props {
  notifications: NotificationWithUser | [];
  role?: Role;
  className?: string;
  subAccountId?: string;
}

const InfoBar: React.FC<Props> = ({
  notifications,
  role,
  className,
  subAccountId,
}) => {
  const [allNotifications, setAllNotifications] = useState(notifications);
  const [showAll, setShowAll] = useState(true);

  const handleClick = () => {
    if (!showAll) {
      setAllNotifications(notifications);
    } else {
      if (notifications?.length !== 0) {
        //@ts-ignore
        const notificationsBySubaccount =
          notifications?.filter((item) => item.subAccountId === subAccountId) ??
          [];
        setAllNotifications(notificationsBySubaccount);
      }
    }
    setShowAll((prev) => !prev);
  };

  return (
    <>
      <div
        className={twMerge(
          "fixed z-[20] md:left-[300px] left-0 right-0 top-0 p-4 bg-background/80 backdrop-blur-md flex  gap-4 items-center border-b-[1px]",
          className,
        )}
      >
        <div className={"flex items-center gap-2 ml-auto"}>
          <UserButton afterSignOutUrl={"/"} />
          <Sheet>
            <SheetTrigger>
              <div
                className={
                  "rounded-full w-8 h-8 bg-primary flex items-center justify-center text-white"
                }
              >
                <Bell size={17} />
              </div>
            </SheetTrigger>
            <SheetContent className={"mt-4 mr-4 pr-4 flex flex-col"}>
              <SheetHeader className={"text-left"}>
                <SheetTitle>Notifications</SheetTitle>
                <SheetDescription>
                  {role === "AGENCY_ADMIN" ||
                    (role === "AGENCY_OWNER" && (
                      <Card className={"flex items-center justify-between p-4"}>
                        Current Subaccount
                        <Switch onChangeCapture={handleClick} />
                      </Card>
                    ))}
                </SheetDescription>
              </SheetHeader>
              {allNotifications &&
                allNotifications.map((notification) => (
                  <div
                    key={notification.id}
                    className={"flex flex-col overflow-x-scroll text-ellipsis"}
                  >
                    <div className={"flex gap-2"}>
                      <Avatar>
                        <AvatarImage
                          src={notification.User.avatarUrl}
                          alt={"Profile Picture"}
                        />
                        <AvatarFallback className={"bg-primary"}>
                          {notification.User.name.slice(0, 2).toUpperCase()}
                        </AvatarFallback>
                      </Avatar>
                      <div className={"flex flex-col"}>
                        <p>
                          <span className={"font-bold"}>
                            {notification.notification.split("|")[0]}
                          </span>
                          <span className={"text-muted-foreground"}>
                            {notification.notification.split("|")[1]}
                          </span>
                          <span className={"font-bold"}>
                            {notification.notification.split("|")[2]}
                          </span>
                        </p>
                        <small className={"text-xs text-muted-foreground"}>
                          {new Date(
                            notification.createdAt,
                          ).toLocaleDateString()}
                        </small>
                      </div>
                    </div>
                  </div>
                ))}
              {allNotifications?.length === 0 && (
                <div
                  className={
                    "flex items-center justify-center mb-4 text-muted-foreground"
                  }
                >
                  You have no notifications
                </div>
              )}
            </SheetContent>
          </Sheet>
          <ModeToggle />
        </div>
      </div>
    </>
  );
};

export default InfoBar;
