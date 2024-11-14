import { z } from "zod";

import { object } from "zod";

export const SignInSchema = object({
	email: z.string().email({ message: "Invalid email address" }).trim(),
	password: z
		.string()
		.min(8, { message: "Password must be at least 8 characters" })
		.trim(),
});

export const SignUpSchema = object({
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
