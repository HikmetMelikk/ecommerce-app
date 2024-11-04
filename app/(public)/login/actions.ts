"use server";

import prisma from "@/prisma/db";
import bcrypt from "bcrypt";
import { redirect } from "next/navigation";
import { LoginSchema } from "../../auth/definitions";
import { createSession, deleteSession } from "../../auth/session";

export async function login(prevState: any, formData: FormData) {
	const result = LoginSchema.safeParse(Object.fromEntries(formData));

	if (!result.success) {
		return {
			errors: result.error.flatten().fieldErrors,
		};
	}

	const { email, password } = result.data;

	// Find the user by email address in the database
	const user = await prisma.user.findUnique({
		where: {
			email: email,
		},
	});

	// If the user does not exist or the password is not set, return an error
	if (!user || !user.password) {
		return {
			errors: {
				email: ["Invalid email or password"],
			},
		};
	}

	// Compare the password with the hashed password in the database
	const passwordMatch = await bcrypt.compare(password, user.password);

	if (!passwordMatch) {
		return {
			errors: {
				email: ["Invalid email or password"],
			},
		};
	}

	await createSession(user.id);
	redirect("/dashboard");
}

export async function logout() {
	await deleteSession();
	redirect("/login");
}
