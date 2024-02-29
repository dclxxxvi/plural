"use client";
import * as React from "react";
import { PricesList } from "@/lib/types";
import { useSearchParams } from "next/navigation";
import { useModal } from "@/providers/modal-provider";
import { useEffect } from "react";
import CustomModal from "@/components/global/custom-modal";
import SubscriptionFormWrapper from "@/components/forms/subscription-form/subscription-form-wrapper";

interface Props {
  prices: PricesList["data"];
  customerId: string;
  planExists: boolean;
}

const SubscriptionHelper: React.FC<Props> = ({
  prices,
  customerId,
  planExists,
}) => {
  const { setOpen } = useModal();
  const searchParams = useSearchParams();
  const plan = searchParams.get("plan");

  useEffect(() => {
    if (plan) {
      setOpen(
        <CustomModal
          title={"Upgrade Plan!"}
          subheading={"Get started today to get access to premium features"}
        >
          <SubscriptionFormWrapper
            customerId={customerId}
            planExists={planExists}
          />
        </CustomModal>,
        async () => ({
          plans: {
            defaultPriceId: plan ? plan : "",
            plans: prices,
          },
        }),
      );
    }
  }, []);

  return <div></div>;
};

export default SubscriptionHelper;
