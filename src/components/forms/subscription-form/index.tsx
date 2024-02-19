"use client";
import * as React from "react";
import { Plan } from "@prisma/client";
import { useToast } from "@/components/ui/use-toast";
import {
  PaymentElement,
  useElements,
  useStripe,
} from "@stripe/react-stripe-js";
import { useState } from "react";
import { Button } from "@/components/ui/button";

interface Props {
  selectedPriceId: string | Plan;
}

const SubscriptionForm: React.FC<Props> = ({ selectedPriceId }) => {
  const { toast } = useToast();
  const elements = useElements();
  const stripeHook = useStripe();
  const [priceError, setPriceError] = useState("");

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    if (!selectedPriceId) {
      setPriceError("You need to select a plan to subscribe");
      return;
    }
    setPriceError("");
    event.preventDefault();
    if (!stripeHook || !elements) return;

    try {
      const { error } = await stripeHook.confirmPayment({
        elements,
        confirmParams: {
          return_url: `${process.env.NEXT_PUBLIC_URL}/agency`,
        },
      });

      if (error) {
        throw new Error();
      }
      toast({
        title: "Payment successfull",
        description: "Your payment has been successfully processed",
      });
    } catch (e) {
      console.log(e);
      toast({
        variant: "destructive",
        title: "Payment failed",
        description:
          "We couldn't process your payment. Please try a different card",
      });
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <small className={"text-destructive"}>{priceError}</small>
      <PaymentElement />
      <Button disabled={!stripeHook} className={"mt-4 w-full"}>
        Submit
      </Button>
    </form>
  );
};

export default SubscriptionForm;
