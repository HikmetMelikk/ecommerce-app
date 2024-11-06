import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table";
import prisma from "@/prisma/db";

async function getOrders() {
	const data = await prisma.order.findMany({
		select: {
			amount: true,
			createdAt: true,
			status: true,
			id: true,
			User: {
				select: {
					name: true,
					email: true,
				},
			},
		},
		orderBy: {
			createdAt: "desc",
		},
	});
	return data;
}

export default async function OrdersPage() {
	const data = await getOrders();
	return (
		<Card>
			<CardHeader className="px-7">
				<CardTitle>Orders</CardTitle>
				<CardDescription>Manage your orders here</CardDescription>
			</CardHeader>
			<CardContent>
				<Table>
					<TableHeader>
						<TableRow>
							<TableHead>Customer</TableHead>
							<TableHead>Type</TableHead>
							<TableHead>Status</TableHead>
							<TableHead>Date</TableHead>
							<TableHead className="text-right">Amount</TableHead>
						</TableRow>
					</TableHeader>
					<TableBody>
						{data.map((order) => (
							<TableRow key={order.id}>
								<TableCell>
									<p className="font-medium">{order.User?.name}</p>
									<p className="hidden md:flex text-sm text-muted-foreground">
										{order.User?.email}
									</p>
								</TableCell>
								<TableCell>Order</TableCell>
								<TableCell>{order.status}</TableCell>
								<TableCell>
									{new Intl.DateTimeFormat("en-US").format(order.createdAt)}
								</TableCell>
								<TableCell className="text-right">
									${new Intl.NumberFormat("en-US").format(order.amount / 100)}
								</TableCell>
							</TableRow>
						))}
					</TableBody>
				</Table>
			</CardContent>
		</Card>
	);
}
