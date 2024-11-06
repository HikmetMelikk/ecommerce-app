import prisma from "@/prisma/db";
import { DollarSign, PartyPopper, ShoppingBag, User2 } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";

async function getData() {
	const [user, products, order] = await Promise.all([
		prisma.user.findMany({
			select: {
				id: true,
			},
		}),
		prisma.product.findMany({
			select: {
				id: true,
			},
		}),
		prisma.order.findMany({
			select: {
				amount: true,
			},
		}),
	]);

	return { user, products, order };
}

export async function DashboardStats() {
	const { user, products, order } = await getData();

	const totalAmount = order.reduce((acc, curr) => acc + curr.amount, 0);
	return (
		<div className="grid gap-4 md:grid-cols-2 md:gap-8 lg:grid-cols-4">
			<Card>
				<CardHeader className="flex flex-row items-center justify-between pb-2">
					<CardTitle>Total Revenue</CardTitle>
					<DollarSign className="h-4 w-4 text-green-500" />
				</CardHeader>
				<CardContent>
					<p className=" text-lg font-bold">
						${new Intl.NumberFormat("en-US").format(totalAmount / 100)}
					</p>
					<p className="text-xs text-muted-foreground">Based on 100 charges</p>
				</CardContent>
			</Card>

			<Card>
				<CardHeader className="flex flex-row items-center justify-between pb-2">
					<CardTitle>Total Sales</CardTitle>
					<ShoppingBag className="h-4 w-4 text-blue-500" />
				</CardHeader>
				<CardContent>
					<p className=" text-lg font-bold">+{order.length}</p>
					<p className="text-xs text-muted-foreground">Total Sales on App</p>
				</CardContent>
			</Card>

			<Card>
				<CardHeader className="flex flex-row items-center justify-between pb-2">
					<CardTitle>Total Products</CardTitle>
					<PartyPopper className="h-4 w-4 text-indigo-500" />
				</CardHeader>
				<CardContent>
					<p className=" text-lg font-bold">{products.length}</p>
					<p className="text-xs text-muted-foreground">Total Product created</p>
				</CardContent>
			</Card>

			<Card>
				<CardHeader className="flex flex-row items-center justify-between pb-2">
					<CardTitle>Total Users</CardTitle>
					<User2 className="h-4 w-4 text-orange-500" />
				</CardHeader>
				<CardContent>
					<p className=" text-lg font-bold">{user.length}</p>
					<p className="text-xs text-muted-foreground">Total Users Signed Up</p>
				</CardContent>
			</Card>
		</div>
	);
}
