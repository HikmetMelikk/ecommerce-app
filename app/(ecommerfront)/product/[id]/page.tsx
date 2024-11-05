import { FeaturedProducts } from "@/components/ecommercefront/FeaturedProducts";
import { ImageSlider } from "@/components/ecommercefront/ImageSlider";
import { Button } from "@/components/ui/button";
import prisma from "@/prisma/db";
import { ShoppingBag, StarIcon } from "lucide-react";
import { notFound } from "next/navigation";

async function getProductDetail(productId: string) {
	const data = await prisma.product.findUnique({
		where: {
			id: productId,
		},
		select: {
			price: true,
			image: true,
			description: true,
			name: true,
			id: true,
		},
	});

	if (!data) {
		return notFound();
	}
	return data;
}

export default async function ProductDetailPage({
	params,
}: {
	params: { id: string };
}) {
	const data = await getProductDetail(params.id);
	return (
		<>
			<div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-start lg:gap-x-12 py-6 ">
				<ImageSlider images={data.image} />
				<div>
					<h1 className="text-3xl font-extrabold tracking-tight text-gray-900">
						{data.name}
					</h1>
					<p className="text-3xl mt-2 text-gray-900">${data.price}</p>
					<div className="mt-3 flex items-center gap-1">
						<StarIcon className="h-4 w-4 text-yellow-500 fill-yellow-500" />
						<StarIcon className="h-4 w-4 text-yellow-500 fill-yellow-500" />
						<StarIcon className="h-4 w-4 text-yellow-500 fill-yellow-500" />
						<StarIcon className="h-4 w-4 text-yellow-500 fill-yellow-500" />
						<StarIcon className="h-4 w-4 text-yellow-500 fill-yellow-500" />
					</div>

					<p className="text-base text-gray-700 mt-6">{data.description}</p>
					<Button size="lg" className="w-full mt-5">
						<ShoppingBag className="mr-4 w-6 h-6" /> Add to cart
					</Button>
				</div>
			</div>
			<FeaturedProducts />
		</>
	);
}
