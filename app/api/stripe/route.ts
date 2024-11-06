import { redis } from "@/app/utils/redis";
import { stripe } from "@/app/utils/stripe";
import prisma from "@/prisma/db";
import { headers } from "next/headers";

export async function POST(req: Request) {
	const body = await req.text();

	const signature = (await headers()).get("Stripe-Signature") as string;

	let event;

	try {
		event = stripe.webhooks.constructEvent(
			body,
			signature,
			process.env.STRIPE_WEBHOOK_SECRET as string
		);
	} catch (error: unknown) {
		return new Response("Webhook Error", { status: 400 });
	}

	switch (event.type) {
		case "checkout.session.completed": {
			const session = event.data.object;
			await prisma.order.create({
				data: {
					amount: session.amount_total as number,
					status: session.status as string,
					userId: session.metadata?.userId,
				},
			});
			await redis.del(`cart-${session.metadata?.userId}`);
			break;
		}
		default: {
			console.log(`Unhandled event type ${event.type}`);
		}
	}

	return new Response(null, { status: 200 });
}
