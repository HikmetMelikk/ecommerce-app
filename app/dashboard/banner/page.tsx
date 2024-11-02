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
import { MoreHorizontal, PlusCircle, User2 } from "lucide-react";
import Link from "next/link";

export default function BannerRoute() {
	return (
		<>
			<div className="flex items-center justify-end">
				<Button asChild className="flex gap-2">
					<Link href="/dashboard/banner/create">
						<PlusCircle className="h-3.5 w-3.5" />
						<span>Add Banner</span>
					</Link>
				</Button>
			</div>

			<Card className="mt-5">
				<CardHeader>
					<CardTitle>Banners</CardTitle>
					<CardDescription>Manage your banners</CardDescription>
				</CardHeader>
				<CardContent>
					<Table>
						<TableHeader>
							<TableRow>
								<TableHead>Image</TableHead>
								<TableHead>Title</TableHead>
								<TableHead className="text-left">Actions</TableHead>
							</TableRow>
						</TableHeader>
						<TableBody>
							<TableRow>
								<TableCell>
									<User2 className="h-8 w-8" />
								</TableCell>
								<TableCell className="font-medium">Great Products</TableCell>
								<TableCell>
									<DropdownMenu>
										<DropdownMenuTrigger asChild>
											<Button size="icon" variant="ghost">
												<MoreHorizontal />
											</Button>
										</DropdownMenuTrigger>
										<DropdownMenuContent align="end">
											<DropdownMenuLabel>Actions</DropdownMenuLabel>
											<DropdownMenuSeparator />

											{/* <DropdownMenuItem asChild>
												<Link href={`/dashboard/products/${item.id}/delete`}>
													Delete
												</Link>
											</DropdownMenuItem> */}
										</DropdownMenuContent>
									</DropdownMenu>
								</TableCell>
							</TableRow>
						</TableBody>
					</Table>
				</CardContent>
			</Card>
		</>
	);
}
