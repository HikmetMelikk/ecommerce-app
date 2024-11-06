"use client";

import { useActionState } from "react";
import { login } from "../../app/(public)/login/actions";
import { SubmitButton } from "../dashboard/SubmitButton";
import { Input } from "../ui/input";
import { Label } from "../ui/label";

export function LoginForm() {
	const [state, loginAction] = useActionState(login, undefined);
	return (
		<div className="flex items-center justify-center h-[97vh]">
			<form
				action={loginAction}
				className="flex flex-col justify-center min-w-[30vw] min-h-[60vh] p-6 border rounded-md overflow-hidden m-auto bg-white gap-8">
				<h1 className="text-2xl font-bold text-center mb-6">
					Login to E-Commerce App
				</h1>

				<div className="gap-2 flex flex-col w-full">
					<Label className="text-xl">Email:</Label>
					<Input placeholder="Enter your e-mail" id="email" name="email" />
					{state?.errors?.email && (
						<p className="text-red-500 text-sm">{state.errors.email}</p>
					)}
				</div>

				<div className="gap-2 flex flex-col w-full">
					<Label className="text-xl">Password:</Label>
					<Input type="password" id="password" name="password" />
					{state?.errors?.password && (
						<p className="text-red-500 text-sm">{state.errors.password}</p>
					)}
				</div>

				<SubmitButton text="Log In" />
			</form>
		</div>
	);
}
