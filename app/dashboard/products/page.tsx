import { Button } from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table";
import prisma from "@/prisma/db";
import { MoreHorizontal, PlusCircle } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

async function getData() {
	const data = await prisma.product.findMany({
		orderBy: {
			createdAt: "desc",
		},
	});

	return data;
}

export default async function ProductsPage() {
	const data = await getData();
	return (
		<>
			<div className="flex items-center justify-end">
				<Button className="flex items-center" asChild>
					<Link href="/dashboard/products/create">
						<PlusCircle />
						<span>Add Product</span>
					</Link>
				</Button>
			</div>
			<Card className="mt-5">
				<CardHeader>
					<CardTitle>Products</CardTitle>
					<CardDescription>Manage your products here</CardDescription>
				</CardHeader>
				<CardContent>
					<Table>
						<TableHeader>
							<TableRow>
								<TableHead>Image</TableHead>
								<TableHead>Name</TableHead>
								<TableHead>Status</TableHead>
								<TableHead>Price</TableHead>
								<TableHead>Date</TableHead>
								<TableHead className="text-end">Actions</TableHead>
							</TableRow>
						</TableHeader>
						<TableBody>
							{data.map((item) => (
								<TableRow key={item.id}>
									<TableCell>
										<Image
											alt="Product Image"
											src={item.image[0]}
											height={64}
											width={64}
											className="rounded-md object-cover h-16 w-16"
										/>
									</TableCell>
									<TableCell>{item.name}</TableCell>
									<TableCell>{item.status}</TableCell>
									<TableCell>{item.price}</TableCell>
									<TableCell>
										{new Intl.DateTimeFormat("en-US").format(item.createdAt)}
									</TableCell>
									<TableCell className="text-end">
										<DropdownMenu>
											<DropdownMenuTrigger asChild>
												<Button size="icon" variant="ghost">
													<MoreHorizontal />
												</Button>
											</DropdownMenuTrigger>
											<DropdownMenuContent align="end">
												<DropdownMenuLabel>Actions</DropdownMenuLabel>
												<DropdownMenuSeparator />
												<DropdownMenuItem asChild>
													<Link href={`/dashboard/products/${item.id}`}>
														Edit
													</Link>
												</DropdownMenuItem>
												<DropdownMenuItem>Delete</DropdownMenuItem>
											</DropdownMenuContent>
										</DropdownMenu>
									</TableCell>
								</TableRow>
							))}
						</TableBody>
					</Table>
				</CardContent>
			</Card>
		</>
	);
}
