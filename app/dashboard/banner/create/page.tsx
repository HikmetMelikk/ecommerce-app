"use client";
import { BannerSchema } from "@/app/utils/definitions";
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
import { useForm } from "@conform-to/react";
import { parseWithZod } from "@conform-to/zod";
import { ChevronLeft } from "lucide-react";
import Link from "next/link";
import { useActionState } from "react";
import { createBanner } from "../../../utils/actions";

export default function BannerRoute() {
	// const [image, setImages] = useState<string | undefined>(undefined);
	const [lastResult, formAction] = useActionState(createBanner, undefined);

	const [form, fields] = useForm({
		lastResult,
		onValidate({ formData }) {
			return parseWithZod(formData, { schema: BannerSchema });
		},
		shouldValidate: "onBlur",
		shouldRevalidate: "onInput",
	});
	return (
		<form id={form.id} onSubmit={form.onSubmit} action={formAction}>
			<div className="flex items-center gap-x-4">
				<Button variant="outline" size="icon" asChild>
					<Link href="/dashboard/products">
						<ChevronLeft className="w-4 h-4" />
					</Link>
				</Button>
				<h1 className="text-xl font-semibold tracking-tight">New Banner</h1>
			</div>

			<Card className="mt-5">
				<CardHeader>
					<CardTitle>Banner Details</CardTitle>
					<CardDescription>Create you banner here</CardDescription>
				</CardHeader>
				<CardContent>
					<div className="flex flex-col gap-y-6">
						<div className="flex flex-col gap-3">
							<Label>Name</Label>
							<Input
								type="text"
								placeholder="Create title for banner"
								key={fields.title.key}
								name={fields.title.name}
								defaultValue={fields.title.initialValue}
							/>
							<p className="text-red-500">{fields.title.errors}</p>
						</div>
						<div className="flex flex-col gap-3">
							<Label>Image</Label>
							{/* <input
								type="hidden"
								name={fields.imageString.name}
								value={image}
								key={fields.imageString.key}
								defaultValue={fields.imageString.initialValue}
							/> */}
							{/* {image !== undefined ? (
								<Image
									src={image}
									alt="Product Image"
									width={200}
									height={200}
									className="w-[200px] h-[200px] object-cover"
								/>
							) : (
								<UploadDropzone
									onClientUploadComplete={(res) => {
										setImages(res[0].url);
									}}
									onUploadError={() => {
										alert("Error uploading image");
									}}
									endpoint="bannerImageRoute"
								/>
							)} */}
							<p className="text-red-500">{fields.imageString.errors}</p>
						</div>
					</div>
				</CardContent>
				<CardFooter>
					<SubmitButton text="Create Banner" />
				</CardFooter>
			</Card>
		</form>
	);
}
