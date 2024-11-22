"use client";

import { Loader2, ShoppingBag } from "lucide-react";
import { useFormStatus } from "react-dom";
import { Button } from "../ui/button";

interface IButtonProps {
	text: string;
	variant?:
		| "link"
		| "default"
		| "destructive"
		| "outline"
		| "secondary"
		| "ghost"
		| null
		| undefined;
}

export function SubmitButton({ text, variant }: IButtonProps) {
	const { pending } = useFormStatus();
	return (
		<>
			{pending ? (
				<Button disabled variant={variant}>
					<Loader2 className="mr-2 h-4 w-4 animate-spin" />
					Please wait...
				</Button>
			) : (
				<Button variant={variant} type="submit" disabled={true}>
					{text}
				</Button>
			)}
		</>
	);
}

export function AddProductToShoppingBagButton() {
	const { pending } = useFormStatus();

	return (
		<>
			{pending ? (
				<Button disabled size="lg" className="w-full mt-5">
					<Loader2 className="mr-4 w-6 h-6 animate-spin" /> Please Wait
				</Button>
			) : (
				<Button size="lg" className="w-full mt-5" type="submit">
					<ShoppingBag className="mr-4 w-6 h-6" /> Add to cart
				</Button>
			)}
		</>
	);
}

export function DeleteButton() {
	const { pending } = useFormStatus();

	return (
		<>
			{pending ? (
				<button disabled className="font-medium text-primary text-end">
					Removing...
				</button>
			) : (
				<button type="submit" className="font-medium text-red-500 text-end ">
					Delete
				</button>
			)}
		</>
	);
}

export function CheckoutButton() {
	const { pending } = useFormStatus();

	return (
		<>
			{pending ? (
				<Button className="w-full mt-5 sm:mt-6" disabled>
					<Loader2 className="mr-4 w-6 h-6 animate-spin" /> Please Wait
				</Button>
			) : (
				<Button size="lg" className="w-full mt-5" type="submit">
					Checkout
				</Button>
			)}
		</>
	);
}
