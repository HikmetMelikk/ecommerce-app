import { deleteBanner } from "@/app/dashboard/actions";
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

export default function DeleteBannerRoute({
	params,
}: {
	params: { id: string };
}) {
	return (
		<div>
			<div className="h-[80vh] w-full flex items-center justify-center">
				<Card className="max-w-xl">
					<CardHeader>
						<CardTitle>Are you sure you want to delete this banner?</CardTitle>
						<CardDescription>This action cannot be undone.</CardDescription>
					</CardHeader>
					<CardFooter className="w-full flex justify-between">
						<Button variant="secondary" asChild>
							<Link href="/dashboard/banner">Cancel</Link>
						</Button>
						<form action={deleteBanner}>
							<input type="hidden" name="bannerId" value={params.id} />
							<SubmitButton text="Delete Product" variant="destructive" />
						</form>
					</CardFooter>
				</Card>
			</div>
		</div>
	);
}
