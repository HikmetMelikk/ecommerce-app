"use client";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";

const links = [
	{
		name: "Home",
		href: "/",
	},
	{
		name: "Dashboard",
		href: "/dashboard",
	},
	{
		name: "Orders",
		href: "/dashboard/orders",
	},
	{
		name: "Products",
		href: "/dashboard/products",
	},
	{
		name: "Banner Images",
		href: "/dashboard/banner",
	},
];

export function DashboardNavigation() {
	const pathName = usePathname();
	return (
		<>
			{links.map((link) => (
				<Link
					key={link.href}
					href={link.href}
					className={cn(
						link.href === pathName
							? "text-black"
							: "text-muted-foreground hover:text-foreground"
					)}>
					{link.name}
				</Link>
			))}
		</>
	);
}
