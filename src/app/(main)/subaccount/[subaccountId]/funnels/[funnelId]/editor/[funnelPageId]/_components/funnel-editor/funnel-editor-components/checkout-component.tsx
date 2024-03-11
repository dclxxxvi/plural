"use client";
import * as React from "react";
import {
  EditorElement as EditorElementType,
  useEditor,
} from "@/providers/editor/editor-provider";
import { useRouter } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import { getFunnel, getSubaccountDetails } from "@/lib/queries";
import { toast } from "@/components/ui/use-toast";
import { EditorBtns } from "@/lib/constants";
import clsx from "clsx";
import { Badge } from "@/components/ui/badge";
import { Trash } from "lucide-react";
import {
  EmbeddedCheckout,
  EmbeddedCheckoutProvider,
} from "@stripe/react-stripe-js";
import { getStripe } from "@/lib/stripe/stripe-client";
import Loading from "@/components/global/loading";
import EditorElement from "@/app/(main)/subaccount/[subaccountId]/funnels/[funnelId]/editor/[funnelPageId]/_components/funnel-editor/funnel-editor-components/editor-element";

interface Props {
  element: EditorElementType;
}

const CheckoutComponent: React.FC<Props> = (props) => {
  const { dispatch, state, subaccountId, funnelId, pageDetails } = useEditor();
  const router = useRouter();
  const [clientSecret, setClientSecret] = useState("");
  const [livePrices, setLivePrices] = useState([]);
  const [subAccountConnectAccId, setSubAccountConnectAccId] = useState("");
  const options = useMemo(() => ({ clientSecret }), [clientSecret]);

  useEffect(() => {
    if (!subaccountId) return;
    const fetchData = async () => {
      const subaccountDetails = await getSubaccountDetails(subaccountId);
      if (subaccountDetails) {
        if (!subaccountDetails.connectAccountId) return;
        setSubAccountConnectAccId(subaccountDetails.connectAccountId);
      }
    };

    fetchData();
  }, [subaccountId]);

  useEffect(() => {
    if (funnelId) {
      const fetchData = async () => {
        const funnelData = await getFunnel(funnelId);
        setLivePrices(JSON.parse(funnelData?.liveProducts || "[]"));
      };

      fetchData();
    }
  }, [funnelId]);

  useEffect(() => {
    if (livePrices.length && subaccountId && subAccountConnectAccId) {
      const getClientSecret = async () => {
        try {
          const body = JSON.stringify({
            subAccountConnectAccId,
            prices: livePrices,
            subaccountId,
          });

          const response = await fetch(
            `${process.env.NEXT_PUBLIC_URL}api/stripe/create-checkout-session`,
            {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body,
            },
          );

          const responseJson = await response.json();
          if (!responseJson) throw new Error("something went wrong");
          if (responseJson.error) {
            throw new Error(responseJson.error);
          }
          if (responseJson.clientSecret) {
            setClientSecret(responseJson.clientSecret);
          }
        } catch (error) {
          toast({
            open: true,
            className: "z-[100000]",
            variant: "destructive",
            title: "Oppse!",
            description: error.message,
          });
        }
      };
      getClientSecret();
    }
  }, [livePrices, subaccountId, subAccountConnectAccId]);

  return (
    <EditorElement
      element={props.element}
      classValues={[
        "p-[2px] w-full m-[5px] relative text-[16px] transition-all flex items-center justify-center",
      ]}
    >
      <div className={"border-none transition-all w-full"}>
        <div className={"flex flex-col gap-4 w-full"}>
          {options.clientSecret && subAccountConnectAccId && (
            <div className={"text-white"}>
              <EmbeddedCheckoutProvider
                stripe={getStripe(subAccountConnectAccId)}
                options={options}
              >
                <EmbeddedCheckout />
              </EmbeddedCheckoutProvider>
            </div>
          )}

          {!options.clientSecret && (
            <div className={"flex items-center justify-center w-full h-40"}>
              <Loading />
            </div>
          )}
        </div>
      </div>
    </EditorElement>
  );
};

export default CheckoutComponent;
