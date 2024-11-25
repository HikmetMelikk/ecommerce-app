"use server";

import prisma from "@/prisma/db";
import { parseWithZod } from "@conform-to/zod";
import { redirect } from "next/navigation";

import { BannerSchema, ProductSchema } from "./definitions";

export async function createProduct(prevState: any, formData: FormData) {
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
			isFeatured: submission.value.isFeatured === true ? true : false,
		},
	});
	redirect("/dashboard/products");
}

export async function updateProduct(prevState: any, formData: FormData) {
	const submission = parseWithZod(formData, {
		schema: ProductSchema,
	});
	if (submission.status !== "success") {
		return submission.reply();
	}

	const flattenUrls = submission.value.images.flatMap((urlString) =>
		urlString.split(",").map((url) => url.trim())
	);
	const productId = formData.get("productId") as string;
	await prisma.product.update({
		where: {
			id: productId,
		},
		data: {
			name: submission.value.name,
			description: submission.value.description,
			status: submission.value.status,
			price: submission.value.price,
			image: flattenUrls,
			category: submission.value.category,
			isFeatured: submission.value.isFeatured === true ? true : false,
		},
	});
	redirect("/dashboard/products");
}

export async function deleteProduct(formData: FormData) {
	await prisma.product.delete({
		where: {
			id: formData.get("productId") as string,
		},
	});
	redirect("/dashboard/products");
}

export async function createBanner(prevState: any, formData: FormData) {
	const submission = parseWithZod(formData, {
		schema: BannerSchema,
	});

	if (submission.status !== "success") {
		return submission.reply();
	}

	await prisma.banner.create({
		data: {
			title: submission.value.title,
			imageString: submission.value.imageString,
		},
	});
	redirect("/dashboard/banner");
}

export async function deleteBanner(formData: FormData) {
	await prisma.banner.delete({
		where: {
			id: formData.get("bannerId") as string,
		},
	});
	redirect("/dashboard/banner");
}
