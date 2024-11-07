import Image from "next/image";
import Link from "next/link";
import { Button } from "../ui/button";
import {
	Carousel,
	CarouselContent,
	CarouselItem,
	CarouselNext,
	CarouselPrevious,
} from "../ui/carousel";
import { Skeleton } from "../ui/skeleton";

interface IProductCardProps {
	item: {
		id: string;
		name: string;
		description: string;
		price: number;
		image: string[];
	};
}

export function ProductCard({ item }: IProductCardProps) {
	return (
		<div className="rounded-lg ">
			<Carousel className="w-full mx-auto">
				<CarouselContent>
					{item.image.map((img, index) => (
						<CarouselItem key={index}>
							<div className="relative h-[330px]">
								<Image
									src={img}
									alt="Product Image"
									fill
									className="object-cover object-center w-full h-full rounded-lg"
								/>
							</div>
						</CarouselItem>
					))}
				</CarouselContent>
				<CarouselPrevious className="ml-16" />
				<CarouselNext className="mr-16" />
			</Carousel>

			<div className="flex justify-between items-center mt-2">
				<h1 className="font-semibold text-xl line-clamp-1">{item.name}</h1>
				<h3 className="inline-flex items-center rounded-md bg-primary/10 px-2 py-1 text-sm font-medium text-primary ring-1 ring-inset ring-primary/10">
					${item.price}
				</h3>
			</div>
			<p className="text-gray-600 text-sm mt-2 line-clamp-2">
				{item.description}
			</p>

			<Button className="w-full mt-5">
				<Link href={`/product/${item.id}`}>Learn More!</Link>
			</Button>
		</div>
	);
}

export function LoadingProductCart() {
	return (
		<div className=" flex flex-col">
			<Skeleton className="w-full h-[330px]" />
			<div className="flex flex-col mt-2 gap-y-2">
				<Skeleton className="h-4 w-full" />
				<Skeleton className="h-6 w-full" />
			</div>
			<Skeleton className="w-full h-10 mt-5" />
		</div>
	);
}
