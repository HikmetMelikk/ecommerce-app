"use client";

import { Loader2 } from "lucide-react";
import { useFormStatus } from "react-dom";
import { Button } from "../ui/button";

//TODO: Make this component reusable by passing the text to display on the button
export function SubmitButton() {
	const { pending } = useFormStatus();
	return (
		<>
			{pending ? (
				<Button disabled>
					<Loader2 className="mr-2 h-4 w-4 animate-spin" />
					Please wait...
				</Button>
			) : (
				<Button type="submit">Create Product</Button>
			)}
		</>
	);
}
