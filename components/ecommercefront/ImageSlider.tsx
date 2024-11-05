"use client";
import { cn } from "@/lib/utils";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import { Button } from "../ui/button";

interface IImageSliderProps {
	images: string[];
}

export function ImageSlider({ images }: IImageSliderProps) {
	const [mainImageIndex, setMainImageIndex] = useState(0);

	function handlePrevClick() {
		setMainImageIndex((prevIndex) =>
			prevIndex === 0 ? images.length - 1 : prevIndex - 1
		);
	}

	function handleNextClick() {
		setMainImageIndex((prevIndex) =>
			prevIndex === images.length - 1 ? 0 : prevIndex + 1
		);
	}

	function handleImageClick(index: number) {
		setMainImageIndex(index);
	}
	return (
		<div className="grid gap-6 md:gap-3 items-start">
			<div className="relative overflow-hidden rounded-lg">
				<Image
					width={600}
					height={600}
					src={images[mainImageIndex]}
					alt="Product Image"
					className="object-cover w-full h-[600px]"
				/>

				<div className="absolute inset-0 flex items-center justify-between px-4">
					<Button onClick={handlePrevClick} variant="ghost" size="icon">
						<ChevronLeft className="w-6 h-6" />
					</Button>
					<Button onClick={handleNextClick} variant="ghost" size="icon">
						<ChevronRight className="w-6 h-6" />
					</Button>
				</div>
			</div>

			<div className="grid grid-cols-5 gap-4">
				{images.map((img, index) => (
					<div
						key={index}
						className={cn(
							index === mainImageIndex
								? "border-2 border-primary"
								: "border border-gray-200",
							"relative over rounded-lg cursor-pointer"
						)}>
						<Image
							onClick={() => handleImageClick(index)}
							width={100}
							height={100}
							src={img}
							alt="Product Image"
							className="object-cover w-full h-[100px] rounded-lg"
						/>
					</div>
				))}
			</div>
		</div>
	);
}
