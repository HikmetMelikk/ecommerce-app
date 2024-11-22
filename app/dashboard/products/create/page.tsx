"use client";
import { categories } from "@/app/utils/categories";
import { ProductSchema } from "@/app/utils/definitions";
import { SubmitButton } from "@/components/dashboard/SubmitButton";
import { Button } from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { useForm } from "@conform-to/react";
import { parseWithZod } from "@conform-to/zod";
import { ChevronLeft } from "lucide-react";
import Link from "next/link";
import { useActionState, useState } from "react";
import { createProduct } from "../../../utils/actions";

export default function ProductCreate() {
	const [images] = useState<string[]>([]);
	const [lastResult, formAction] = useActionState(createProduct, undefined);
	const [form, fields] = useForm({
		lastResult,
		onValidate({ formData }) {
			return parseWithZod(formData, { schema: ProductSchema });
		},
		shouldValidate: "onBlur",
		shouldRevalidate: "onInput",
	});

	// const handleDeleteImage = (index: number) => {
	// 	setImages(images.filter((_, i) => i !== index));
	// };
	return (
		<form id={form.id} onSubmit={form.onSubmit} action={formAction}>
			<div className="flex items-center gap-4">
				<Button variant="outline" size="icon">
					<Link href="/dashboard/products">
						<ChevronLeft />
					</Link>
				</Button>
				<h1 className="font-bold text-xl tracking-tight">New Product</h1>
			</div>
			<Card className="mt-5">
				<CardHeader>
					<CardTitle>Product Title</CardTitle>
					<CardDescription>You can create your product</CardDescription>
				</CardHeader>
				<CardContent>
					<div className="flex flex-col gap-6">
						<div className="flex flex-col gap-3">
							<Label>Name</Label>
							<Input
								key={fields.name.key}
								name={fields.name.name}
								defaultValue={fields.name.initialValue}
								type="text"
								className="w-full"
								placeholder="Product Name"
							/>
							<p className="text-red-500">{fields.name.errors}</p>
						</div>
						<div className="flex flex-col gap-3">
							<Label>Description</Label>
							<Textarea
								key={fields.description.key}
								name={fields.description.name}
								defaultValue={fields.description.value}
								placeholder="Write your description here"
							/>
							<p className="text-red-500">{fields.description.errors}</p>
						</div>

						<div className="flex flex-col gap-3">
							<Label>Price</Label>
							<Input
								key={fields.price.key}
								name={fields.price.name}
								defaultValue={fields.price.value}
								type="number"
								placeholder="$55"
							/>
							<p className="text-red-500">{fields.price.errors}</p>
						</div>

						<div className="flex flex-col gap-3">
							<Label>Featured Product</Label>
							<Switch
								key={fields.isFeatured.key}
								name={fields.isFeatured.name}
								defaultValue={fields.isFeatured.value}
							/>
						</div>
						<p className="text-red-500">{fields.isFeatured.errors}</p>

						<div className="flex flex-col gap-3">
							<Label>Status</Label>
							<Select
								key={fields.status.key}
								name={fields.status.name}
								defaultValue={fields.status.initialValue}>
								<SelectTrigger>
									<SelectValue placeholder="Select Status" />
								</SelectTrigger>
								<SelectContent>
									<SelectItem value="draft">Draft</SelectItem>
									<SelectItem value="published">Published</SelectItem>
									<SelectItem value="archived">Archived</SelectItem>
								</SelectContent>
							</Select>
							<p className="text-red-500">{fields.status.errors}</p>
						</div>

						<div className="flex flex-col gap-3">
							<Label>Category</Label>
							<Select
								key={fields.category.key}
								name={fields.category.name}
								defaultValue={fields.category.initialValue}>
								<SelectTrigger>
									<SelectValue placeholder="Select Category" />
								</SelectTrigger>
								<SelectContent>
									{categories.map((category) => (
										<SelectItem key={category.id} value={category.name}>
											{category.title}
										</SelectItem>
									))}
								</SelectContent>
							</Select>
							<p className="text-red-500">{fields.category.errors}</p>
						</div>

						<div className="flex flex-col gap-3">
							<Label>Images</Label>
							<input
								type="hidden"
								value={images}
								key={fields.images.key}
								name={fields.images.name}
								defaultValue={fields.images.initialValue as string[]}
							/>
							{/* {images.length > 0 ? (
								<div className="flex gap-5">
									{images.map((image, index) => (
										<div key={index} className="relative w-[100px] h-[100px]">
											<Image
												height={100}
												width={100}
												src={image}
												alt="Product Image"
												className="w-full h-full object-cover rounded-lg border"
											/>
											<button
												onClick={() => handleDeleteImage(index)}
												type="button"
												className="absolute -top-3 -right-3 bg-red-500 p-2 rounded-lg text-white">
												<XIcon className="w-3 h-3" />
											</button>
										</div>
									))}
								</div>
							) : (
								<UploadDropzone
									endpoint="imageUploader"
									onClientUploadComplete={(res) => {
										setImages(res.map((r) => r.url));
									}}
									onUploadError={() => {
										alert("Something went wrong");
									}}
								/>
							)} */}
							<p className="text-red-500">{fields.images.errors}</p>
						</div>
					</div>
				</CardContent>
				<CardFooter>
					<SubmitButton text="Create Product" />
				</CardFooter>
			</Card>
		</form>
	);
}
