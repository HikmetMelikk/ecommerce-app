import prisma from "@/prisma/db";
import Image from "next/image";
import {
	Carousel,
	CarouselContent,
	CarouselItem,
	CarouselNext,
	CarouselPrevious,
} from "../ui/carousel";

async function getData() {
	const data = prisma.banner.findMany({
		orderBy: {
			createdAt: "desc",
		},
	});
	return data;
}

export async function Hero() {
	const data = await getData();
	return (
		<Carousel>
			<CarouselContent>
				{data.map((banner) => (
					<CarouselItem key={banner.id}>
						<div className="relative h-[60vh] lg:h-[70vh]">
							<Image
								alt="Banner Image"
								src={banner.imageString}
								fill
								className="object-contain w-full h-full rounded-xl"
							/>
							<div className="absolute bottom-6 left-6 bg-opacity-75 bg-black text-white p-6 rounded-xl shadow-lg transition-transform hover:scale-105">
								<h1 className="text-xl lg:text-2xl font-bold">
									{banner.title}
								</h1>
							</div>
						</div>
					</CarouselItem>
				))}
			</CarouselContent>
			<CarouselPrevious className="ml-16" />
			<CarouselNext className="mr-16" />
		</Carousel>
	);
}
