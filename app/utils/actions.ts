"use server";

import prisma from "@/prisma/db";
import { parseWithZod } from "@conform-to/zod";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import Stripe from "stripe";
import { BannerSchema, ProductSchema } from "../auth/definitions";
import { getUser } from "../data/user";
import { Cart } from "./interfaces";
import { redis } from "./redis";
import { stripe } from "./stripe";

export async function createProduct(prevState: any, formData: FormData) {
	const user = await getUser();
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
			isFeatured: submission.value.isFeatured === true ? true : false,
		},
	});
	redirect("/dashboard/products");
}

export async function updateProduct(prevState: any, formData: FormData) {
	const user = await getUser();
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
	const user = await getUser();
	if (!user) {
		return redirect("/login");
	}
	await prisma.product.delete({
		where: {
			id: formData.get("productId") as string,
		},
	});
	redirect("/dashboard/products");
}

export async function createBanner(prevState: any, formData: FormData) {
	const user = await getUser();
	if (!user) {
		return redirect("/login");
	}

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
	const user = await getUser();
	if (!user) {
		return redirect("/login");
	}
	await prisma.banner.delete({
		where: {
			id: formData.get("bannerId") as string,
		},
	});
	redirect("/dashboard/banner");
}

export async function addItem(productId: string) {
	const user = await getUser();
	if (!user) {
		return redirect("/login");
	}

	const cart: Cart | null = await redis.get(`cart-${user.id}`);

	const selectedProduct = await prisma.product.findUnique({
		select: {
			id: true,
			name: true,
			price: true,
			image: true,
		},
		where: {
			id: productId,
		},
	});

	if (!selectedProduct) {
		throw new Error("No product found with this id!");
	}

	let myCart = {} as Cart;

	if (!cart || !cart.items) {
		myCart = {
			userId: user.id,
			items: [
				{
					price: selectedProduct.price,
					id: selectedProduct.id,
					imageString: selectedProduct.image[0],
					name: selectedProduct.name,
					quantity: 1,
				},
			],
		};
	} else {
		let itemFound = false;

		myCart.items = cart.items.map((item) => {
			if (item.id === productId) {
				itemFound = true;
				item.quantity += 1;
			}
			return item;
		});

		if (!itemFound) {
			myCart.items.push({
				price: selectedProduct.price,
				id: selectedProduct.id,
				imageString: selectedProduct.image[0],
				name: selectedProduct.name,
				quantity: 1,
			});
		}
	}

	await redis.set(`cart-${user.id}`, myCart);
	revalidatePath("/", "layout");
}

export async function deleteBagItem(formData: FormData) {
	const user = await getUser();
	if (!user) {
		return redirect("/login");
	}

	const productId = formData.get("productId");

	const cart: Cart | null = await redis.get(`cart-${user.id}`);

	if (cart && cart.items) {
		const updatedCart: Cart = {
			userId: user.id,
			items: cart.items.filter((item) => item.id !== productId),
		};
		await redis.set(`cart-${user.id}`, updatedCart);
	}
	revalidatePath("/bag");
}

export async function checkOut() {
	const user = await getUser();
	if (!user) {
		return redirect("/login");
	}

	const cart: Cart | null = await redis.get(`cart-${user.id}`);

	if (cart && cart.items) {
		const lineItems: Stripe.Checkout.SessionCreateParams.LineItem[] =
			cart.items.map((item) => ({
				price_data: {
					currency: "usd",
					unit_amount: item.price * 100,
					product_data: {
						name: item.name,
						images: [item.imageString],
					},
				},
				quantity: item.quantity,
			}));

		const session = await stripe.checkout.sessions.create({
			mode: "payment",
			line_items: lineItems,
			success_url: "http://localhost:3000/payment/success",
			cancel_url: "http://localhost:3000/payment/cancel",
			metadata: {
				userId: user.id,
			},
		});

		return redirect(session.url as string);
	}
}
