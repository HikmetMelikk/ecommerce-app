import { addItem } from "@/app/utils/actions";
import { AddProductToShoppingBagButton } from "@/components/dashboard/SubmitButton";
import { FeaturedProducts } from "@/components/ecommercefront/FeaturedProducts";
import { ImageSlider } from "@/components/ecommercefront/ImageSlider";
import prisma from "@/prisma/db";
import { StarIcon } from "lucide-react";
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

export default async function ProductDetailPage(props: {
	params: Promise<{ id: string }>;
}) {
	const params = await props.params;
	const data = await getProductDetail(params.id);
	const addProductToShoppingCart = addItem.bind(null, data.id);

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
						{[...Array(5)].map((_, index) => (
							<StarIcon
								key={index}
								className="h-5 w-5 text-yellow-500 fill-yellow-500"
							/>
						))}
					</div>
					<p className="text-base text-gray-700 mt-6">{data.description}</p>
					<form action={addProductToShoppingCart}>
						<AddProductToShoppingBagButton />
					</form>
				</div>
			</div>

			<div className="mt-16">
				<FeaturedProducts />
			</div>
		</>
	);
}
