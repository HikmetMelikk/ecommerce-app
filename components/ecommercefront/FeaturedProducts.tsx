import prisma from "@/prisma/db";
import { ProductCard } from "./ProductCard";

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

export async function FeaturedProducts() {
	const featuredProducts = await getFeaturedProducts();
	return (
		<>
			<h2 className="text-2xl font-extrabold tracking-tight">Featured Items</h2>
			<div className="mt-5 grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
				{featuredProducts.map((product) => (
					<ProductCard key={product.id} item={product} />
				))}
			</div>
		</>
	);
}
