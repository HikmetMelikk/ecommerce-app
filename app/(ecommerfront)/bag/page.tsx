import { Button } from "@/components/ui/button";
import { ShoppingBag } from "lucide-react";
import Link from "next/link";

export default async function Bag() {
	return (
		<div className="max-w-2xl mx-auto mt-10 min-h-[55vh]">
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
		</div>
	);
}
