import { ProductCard } from "@/components/ecommercefront/ProductCard";
import prisma from "@/prisma/db";
import { notFound } from "next/navigation";

async function getCategories(productCategory: string) {
	switch (productCategory) {
		case "all": {
			const data = await prisma.product.findMany({
				select: {
					name: true,
					image: true,
					price: true,
					id: true,
					description: true,
				},
				where: {
					status: "published",
				},
			});
			return {
				title: "All Products",
				data: data,
			};
		}
		case "men": {
			const data = await prisma.product.findMany({
				where: {
					status: "published",
					category: "men",
				},
				select: {
					name: true,
					image: true,
					price: true,
					id: true,
					description: true,
				},
			});
			return {
				title: "Products for Men",
				data: data,
			};
		}
		case "women": {
			const data = await prisma.product.findMany({
				where: {
					status: "published",
					category: "women",
				},
				select: {
					name: true,
					image: true,
					price: true,
					id: true,
					description: true,
				},
			});
			return {
				title: "Products for Women",
				data: data,
			};
		}
		case "kids": {
			const data = await prisma.product.findMany({
				where: {
					status: "published",
					category: "kids",
				},
				select: {
					name: true,
					image: true,
					price: true,
					id: true,
					description: true,
				},
			});
			return {
				title: "Products for Kids",
				data: data,
			};
		}
		default: {
			return notFound();
		}
	}
}

export default async function CategoriesPage({
	params,
}: {
	params: { name: string };
}) {
	const { data, title } = await getCategories(params.name);
	return (
		<section>
			<h1 className="font-semibold text-3xl my-5">{title}</h1>
			<div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
				{data.map((product) => (
					<ProductCard item={product} key={product.id} />
				))}
			</div>
		</section>
	);
}
