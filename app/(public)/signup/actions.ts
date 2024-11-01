"use server";
import bcrypt from "bcrypt";

import prisma from "@/prisma/db";
import { SignupFormSchema } from "../../auth/definitions";
import { createSession } from "../../auth/session";

export async function signup(state: any, form: FormData) {
	//1 Validate the form data
	const validationFields = SignupFormSchema.safeParse({
		name: form.get("name"),
		email: form.get("email"),
		password: form.get("password"),
	});

	if (!validationFields.success) {
		return {
			errors: validationFields.error.flatten().fieldErrors,
		};
	}
	const { name, email, password } = validationFields.data;

	//2 Create a new user
	const hashedPassword = await bcrypt.hash(password, 12);
	const data = await prisma.user.create({
		data: {
			name: name,
			email: email,
			password: hashedPassword,
		},
		select: {
			id: true,
		},
	});
	const user = data.id;

	if (!user) {
		return {
			errors: {
				message: ["An error occurred while creating the user."],
			},
		};
	}
	await createSession(data.id);
}
