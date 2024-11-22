import { z } from "zod";

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
