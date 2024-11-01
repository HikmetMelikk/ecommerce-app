"use client";

import React, { useActionState } from "react";
import { useFormStatus } from "react-dom";
import { login } from "../../app/(public)/login/actions";
import styles from "../../app/(public)/login/login.module.css";

export function LoginForm() {
	const [state, loginAction] = useActionState(login, undefined);
	return (
		<div className={styles.loginContainer}>
			<form action={loginAction} className="authFormStyle">
				<h1>Login to app</h1>
				<div className={styles.formGroup}>
					<label>Email:</label>
					<input placeholder="Enter your e-mail" id="email" name="email" />
					{state?.errors?.email && (
						<p className={styles.errorText}>{state.errors.email}</p>
					)}
				</div>

				<div className={styles.formGroup}>
					<label>Password:</label>
					<input type="password" id="password" name="password" />
					{state?.errors?.password && (
						<p className={styles.errorText}>{state.errors.password}</p>
					)}
				</div>

				<SubmitButton />
			</form>
		</div>
	);
}
function SubmitButton() {
	const { pending } = useFormStatus();

	return (
		<button disabled={pending} type="submit">
			Login
		</button>
	);
}
