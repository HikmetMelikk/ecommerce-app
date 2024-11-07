import { getUser } from "@/app/data/user";
import { checkOut, deleteBagItem } from "@/app/utils/actions";
import { Cart } from "@/app/utils/interfaces";
import { redis } from "@/app/utils/redis";
import {
	CheckoutButton,
	DeleteButton,
} from "@/components/dashboard/SubmitButton";
import { Button } from "@/components/ui/button";
import { ShoppingBag } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { redirect } from "next/navigation";

export default async function Bag() {
	const user = await getUser();

	if (!user) {
		return redirect("/login");
	}

	const cart: Cart | null = await redis.get(`cart-${user.id}`);
	let totalPrice = 0;
	const cartIsEmpty = !cart || !cart.items || cart.items.length === 0;

	if (!cartIsEmpty) {
		cart.items.forEach((item) => {
			totalPrice += item.price * item.quantity;
		});
	}

	return (
		<div className="max-w-2xl mx-auto mt-10 min-h-[55vh]">
			{cartIsEmpty ? (
				<div className="flex min-h-[400px] flex-col items-center justify-center rounded-lg border-dashed p-8 text-center mt-20">
					<div className="flex h-20 w-20 items-center justify-center rounded-full bg-primary/10">
						<ShoppingBag className="h-10 w-10 text-primary" />
					</div>
					<h2 className="mt-6 text-xl font-semibold">
						You don&apos;t have any products in your bag.
					</h2>
					<p className="mb-8 mt-6 text-center text-sm leading-6 text-muted-foreground max-w-sm mx-auto">
						You currently don&apos;t have any products in your bag. Please add
						some.
					</p>
					<Button asChild>
						<Link href="/">Shop Now</Link>
					</Button>
				</div>
			) : (
				<div className="flex flex-col gap-y-10">
					{cart.items.map((item) => (
						<div key={item.id} className="flex">
							<div className="w-24 h-24 sm:w-32 sm:h-32 relative">
								<Image
									className="rounded-md object-cover"
									src={item.imageString}
									alt="Product image"
									fill
								/>
							</div>
							<div className="ml-5 flex justify-between w-full font-medium">
								<p>{item.name}</p>
								<div className="flex flex-col h-full justify-between">
									<div className="flex items-center gap-x-2">
										<p>{item.quantity}x</p>
										<p>${item.price}</p>
									</div>
									<form action={deleteBagItem} className="text-end">
										<input type="hidden" name="productId" value={item.id} />
										<DeleteButton />
									</form>
								</div>
							</div>
						</div>
					))}
					<div className="mt-10">
						<div className="flex items-center justify-between font-medium">
							<p>Subtotal:</p>
							<p>${new Intl.NumberFormat("en-US").format(totalPrice)}</p>
						</div>
						<form action={checkOut}>
							<CheckoutButton />
						</form>
					</div>
				</div>
			)}
		</div>
	);
}
