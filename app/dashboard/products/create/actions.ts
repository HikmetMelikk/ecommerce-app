"use server";

import prisma from "@/prisma/db";
import { parseWithZod } from "@conform-to/zod";
import { redirect } from "next/navigation";
import { ProductSchema } from "../../../auth/definitions";
import { getUser } from "../../../data/user";

export async function createProduct(prevState: unknown, formData: FormData) {
	const user = getUser();
	if (!user) {
		return redirect("/login");
	}
	const submission = parseWithZod(formData, {
		schema: ProductSchema,
	});
	if (submission.status !== "success") {
		return submission.reply();
	}

	const flattenUrls = submission.value.images.flatMap((urlString) =>
		urlString.split(",").map((url) => url.trim())
	);

	await prisma.product.create({
		data: {
			name: submission.value.name,
			description: submission.value.description,
			status: submission.value.status,
			price: submission.value.price,
			image: flattenUrls,
			category: submission.value.category,
			isFeatured: submission.value.isFeatured,
		},
	});
	redirect("/dashboard/products");
}
