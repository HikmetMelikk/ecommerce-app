import prisma from "@/prisma/db";
import { Avatar, AvatarFallback } from "../ui/avatar";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
async function getData() {
	const data = await prisma.order.findMany({
		select: {
			amount: true,
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
		take: 6,
	});
	return data;
}

export async function RecentSales() {
	const data = await getData();
	return (
		<Card>
			<CardHeader>
				<CardTitle>Recent Sales</CardTitle>
			</CardHeader>
			<CardContent className="flex flex-col gap-8">
				{data.map((sales) => (
					<div className="flex items-center gap-4" key={sales.id}>
						<Avatar className="hidden sm:flex h-9 w-9">
							<AvatarFallback>{sales.User?.name.slice(0, 3)}</AvatarFallback>
						</Avatar>
						<div className="grid gap-1">
							<p className="text-sm font-bold">{sales.User?.name}</p>
							<p className="text-sm text-muted-foreground">
								{sales.User?.email}
							</p>
						</div>
						<p className="ml-auto font-medium">
							+${new Intl.NumberFormat("en-US").format(sales.amount / 100)}
						</p>
					</div>
				))}
			</CardContent>
		</Card>
	);
}
