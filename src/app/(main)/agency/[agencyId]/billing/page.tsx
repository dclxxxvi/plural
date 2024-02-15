import * as React from "react";
import { stripe } from "@/lib/stripe";
import { addOnProducts, pricingCards } from "@/lib/constants";
import db from "@/lib/db";
import { Separator } from "@/components/ui/separator";

interface Props {
  params: {
    agencyId: string;
  };
}

const Page: React.FC<Props> = async ({ params }) => {
  // TODO: Create the add on products
  const addOns = await stripe.products.list({
    ids: addOnProducts.map((product) => product.id),
    expand: ["data.default_price"],
  });

  const agencySubscription = await db.agency.findUnique({
    where: {
      id: params.agencyId,
    },
    select: {
      customerId: true,
      Subscription: true,
    },
  });

  const prices = await stripe.prices.list({
    product: process.env.NEXT_PLURA_PRODUCT_ID,
    active: true,
  });

  const currentPlanDetails = pricingCards.find(
    (c) => c.priceId === agencySubscription?.Subscription?.priceId,
  );

  const charges = await stripe.charges.list({
    limit: 50,
    customer: agencySubscription?.customerId,
  });

  const allCharges = [
    ...charges.data.map((charge) => ({
      description: charge.description,
      id: charge.id,
      date: `${new Date(charge.created * 1000).toLocaleTimeString()} ${new Date(charge.created * 1000).toLocaleDateString()}`,
      status: "Paid",
      amount: `${charge.amount / 100}`,
    })),
  ];

  return (
    <>
      <h1 className={"text-4xl p-4"}>Billing</h1>
      <Separator className={"mb-6"} />
    </>
  );
};

export default Page;
