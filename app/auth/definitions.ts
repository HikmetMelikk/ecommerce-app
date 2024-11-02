import { z } from "zod";

export const SignupFormSchema = z.object({
	name: z
		.string()
		.min(2, { message: "Name must be at least 2 characters long." })
		.trim(),
	email: z.string().email({ message: "Please enter a valid email." }).trim(),
	password: z
		.string()
		.min(8, { message: "Be at least 8 characters long" })
		.regex(/[a-zA-Z]/, { message: "Contain at least one letter." })
		.regex(/[0-9]/, { message: "Contain at least one number." })
		.regex(/[^a-zA-Z0-9]/, {
			message: "Contain at least one special character.",
		})
		.trim(),
});

export const LoginSchema = z.object({
	email: z.string().email({ message: "Invalid email address" }).trim(),
	password: z
		.string()
		.min(8, { message: "Password must be at least 8 characters" })
		.trim(),
});

/**
 * Represents the state of a form, which can include errors and a message.
 *
 * @typedef {Object} FormState
 * @property {Object} [errors] - An optional object containing error messages for form fields.
 * @property {string[]} [errors.name] - An optional array of error messages related to the name field.
 * @property {string[]} [errors.email] - An optional array of error messages related to the email field.
 * @property {string[]} [errors.password] - An optional array of error messages related to the password field.
 * @property {string} [message] - An optional message, which could be used for general form feedback.
 */
export type FormState =
	| {
			errors?: {
				name?: string[];
				email?: string[];
				password?: string[];
			};
			message?: string;
	  }
	| undefined;

export type SessionPayload = {
	userId: string;
	expiresAt: Date;
};

export const ProductSchema = z.object({
	name: z
		.string()
		.min(2, { message: "Name must be at least 2 characters long." })
		.trim(),
	description: z
		.string()
		.min(2, { message: "Description must be at least 2 characters long." })
		.trim(),
	status: z.enum(["draft", "published", "archived"]),
	price: z.number().int().min(0),
	images: z.array(z.string()).min(1, "At least one image is required"),
	category: z.enum(["men", "women", "kids"]),
	isFeatured: z.boolean().optional(),
});

export const BannerSchema = z.object({
	title: z.string(),
	imageString: z.string(),
});
