import prisma from "@/prisma/db";
import { Suspense } from "react";
import { LoadingProductCart, ProductCard } from "./ProductCard";

async function getFeaturedProducts() {
	const data = await prisma.product.findMany({
		where: {
			status: "published",
		},
		select: {
			id: true,
			name: true,
			description: true,
			image: true,
			price: true,
		},
		orderBy: {
			createdAt: "desc",
		},
	});
	return data;
}

export function FeaturedProducts() {
	return (
		<>
			<h2 className="text-2xl font-extrabold tracking-tight">Featured Items</h2>
			<Suspense fallback={<LoadingRows />}>
				<LoadFeaturedProducts />
			</Suspense>
		</>
	);
}

async function LoadFeaturedProducts() {
	const data = await getFeaturedProducts();

	return (
		<div className="mt-5 grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
			{data.map((product) => (
				<ProductCard key={product.id} item={product} />
			))}
		</div>
	);
}

function LoadingRows() {
	return (
		<div className="mt-5 grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
			<LoadingProductCart />
			<LoadingProductCart />
			<LoadingProductCart />
		</div>
	);
}
