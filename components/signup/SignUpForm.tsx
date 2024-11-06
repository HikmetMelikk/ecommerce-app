"use client";
import { signUp } from "@/app/(public)/signup/actions";
import Link from "next/link";
import { useActionState } from "react";
import { SubmitButton } from "../dashboard/SubmitButton";
import { Input } from "../ui/input";
import { Label } from "../ui/label";

export default function SignUpForm() {
	const hasFieldErrors = (
		errors: any
	): errors is { name?: string[]; email?: string[]; password?: string[] } => {
		return "name" in errors || "email" in errors || "password" in errors;
	};

	const [state, signUpAction, pending] = useActionState(signUp, undefined);

	return (
		<div className="flex items-center justify-center h-[97vh]">
			<form
				action={signUpAction}
				className="flex flex-col justify-center min-w-[30vw] min-h-[70vh] p-6 border rounded-md overflow-hidden m-auto bg-white gap-8">
				<h1 className="text-2xl font-bold text-center">
					Sign Up to E-Commerce Website
				</h1>

				<div className="gap-2 flex flex-col w-full">
					<Label htmlFor="name" className="text-xl ">
						Name
					</Label>
					<Input id="name" name="name" placeholder="Hikmet Fırat" />
					{state?.errors &&
						hasFieldErrors(state.errors) &&
						state.errors.name && (
							<p className="text-red-500 text-sm">{state.errors.name}</p>
						)}
				</div>

				<div className="gap-2 flex flex-col w-full">
					<Label htmlFor="email" className="text-xl ">
						Email
					</Label>
					<Input
						id="email"
						name="email"
						type="email"
						placeholder="hikmet@example.com"
					/>
					{state?.errors &&
						hasFieldErrors(state.errors) &&
						state.errors.email && (
							<p className="text-red-500 text-sm">{state.errors.email}</p>
						)}
				</div>

				<div className="gap-2 flex flex-col w-full">
					<Label htmlFor="password" className="text-xl ">
						Password
					</Label>
					<Input id="password" name="password" type="password" />
					{state?.errors &&
						hasFieldErrors(state.errors) &&
						state.errors.password && (
							<div>
								<p>Password must:</p>
								<ul>
									{state.errors.password.map((error: any) => (
										<li key={error} className="text-red-500 list-none text-sm">
											- {error}
										</li>
									))}
								</ul>
							</div>
						)}
				</div>
				<SubmitButton text="Sign Up" />
				<p className="text-muted-foreground text-sm text-center">
					Do you have an account?
					<Link href={`/login`} className="underline">
						Log In
					</Link>
				</p>
			</form>
		</div>
	);
}
