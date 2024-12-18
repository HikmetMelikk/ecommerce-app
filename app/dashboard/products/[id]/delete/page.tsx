import { deleteProduct } from "@/app/utils/actions";
import { SubmitButton } from "@/components/dashboard/SubmitButton";
import { Button } from "@/components/ui/button";
import {
	Card,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import Link from "next/link";

export default async function DeleteProduct(props: { params: Promise<{ id: string }> }) {
    const params = await props.params;
    return (
		<div className="h-[80vh] w-full flex items-center justify-center">
			<Card className="max-w-xl">
				<CardHeader>
					<CardTitle>Are you sure you want to delete this product?</CardTitle>
					<CardDescription>This action cannot be undone.</CardDescription>
				</CardHeader>
				<CardFooter className="w-full flex justify-between">
					<Button variant="secondary">
						<Link href="/dashboard/products">Cancel</Link>
					</Button>
					<form action={deleteProduct}>
						<input type="hidden" name="productId" value={params.id} />
						<SubmitButton text="Delete Product" variant="destructive" />
					</form>
				</CardFooter>
			</Card>
		</div>
	);
}
