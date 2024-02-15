import { StripeCustomerType } from "@/lib/types";
import { NextResponse } from "next/server";
import { stripe } from "@/lib/stripe";

export async function POST(req: Request) {
  const { address, email, name, shipping }: StripeCustomerType =
    await req.json();

  if (!email || !address || !name || !shipping) {
    return new NextResponse("Missing data", {
      status: 400,
    });
  }

  try {
    const customer = await stripe.customers.create({
      email,
      name,
      address,
      shipping,
    });

    return Response.json({ customerId: customer.id });
  } catch (e) {
    console.log("Error", e);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
