"use client";
import { signup } from "@/app/(public)/signup/actions";
import styles from "@/app/(public)/signup/signup.module.css";
import Link from "next/link";
import { useActionState } from "react";

export default function SignUpForm() {
	const hasFieldErrors = (
		errors: any
	): errors is { name?: string[]; email?: string[]; password?: string[] } => {
		return "name" in errors || "email" in errors || "password" in errors;
	};

	const [state, signUpAction, pending] = useActionState(signup, undefined);

	return (
		<div className={styles.signUpContainer}>
			<form action={signUpAction} className="authFormStyle">
				<h1>Sign up website</h1>

				<div className={styles.formGroup}>
					<label htmlFor="name">Name</label>
					<input id="name" name="name" placeholder="Hikmet Fırat" />
					{state?.errors &&
						hasFieldErrors(state.errors) &&
						state.errors.name && (
							<p className={styles.error}>{state.errors.name}</p>
						)}
				</div>

				<div className={styles.formGroup}>
					<label htmlFor="email">Email</label>
					<input
						id="email"
						name="email"
						type="email"
						placeholder="hikmet@example.com"
					/>
					{state?.errors &&
						hasFieldErrors(state.errors) &&
						state.errors.email && (
							<p className={styles.error}>{state.errors.email}</p>
						)}
				</div>

				<div className={styles.formGroup}>
					<label htmlFor="password">Password</label>
					<input id="password" name="password" type="password" />
					{state?.errors &&
						hasFieldErrors(state.errors) &&
						state.errors.password && (
							<div>
								<p>Password must:</p>
								<ul>
									{state.errors.password.map((error: any) => (
										<li key={error} className={styles.error}>
											- {error}
										</li>
									))}
								</ul>
							</div>
						)}
				</div>
				<button disabled={pending} type="submit">
					{pending ? "Loading..." : "Sign up"}
				</button>
				<p>
					Do you have an account?{" "}
					<Link href={`/login`} className={styles.login}>
						Log In
					</Link>
				</p>
			</form>
		</div>
	);
}
