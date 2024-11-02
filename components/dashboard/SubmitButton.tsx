"use client";

import { Loader2 } from "lucide-react";
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
				<Button variant={variant} type="submit">
					{text}
				</Button>
			)}
		</>
	);
}
