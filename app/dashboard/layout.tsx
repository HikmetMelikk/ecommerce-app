import { DashboardNavigation } from "@/components/dashboard/DashboardNavigation";
import { Button } from "@/components/ui/button";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
	Sheet,
	SheetContent,
	SheetHeader,
	SheetTitle,
	SheetTrigger,
} from "@/components/ui/sheet";
import { CircleUser, MenuIcon } from "lucide-react";
import React from "react";

export default function DashboardLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<div className="flex w-full flex-col max-w-8xl mx-auto px-4 sm:px-6 lg:px-8">
			<header className="sticky top-0 flex h-16 items-center justify-between gap-4 border-b bg-white">
				<nav className="hidden font-medium md:flex md:flex-row md:items-center md:gap-5 md:text-sm lg:gap-6">
					<DashboardNavigation />
				</nav>
				<Sheet>
					<SheetTrigger asChild>
						<Button className="shrink-0 md:hidden">
							<MenuIcon className="h-5 w-5" />
						</Button>
					</SheetTrigger>
					<SheetContent side={"left"}>
						<SheetHeader>
							<SheetTitle className="font-bold">Dashboard Menu</SheetTitle>
						</SheetHeader>
						<nav className="flex flex-col gap-6 text-lg font-medium mt-5">
							<DashboardNavigation />
						</nav>
					</SheetContent>
				</Sheet>
				<DropdownMenu>
					<DropdownMenuTrigger asChild>
						<Button
							variant={"secondary"}
							size={"icon"}
							className="rounded-full h-10 w-10">
							<CircleUser className="h-7 w-7" />
						</Button>
					</DropdownMenuTrigger>
					<DropdownMenuContent align="end">
						<DropdownMenuLabel>My Account</DropdownMenuLabel>
						<DropdownMenuSeparator />
						<DropdownMenuItem>
							<p>Sign Out</p>
						</DropdownMenuItem>
					</DropdownMenuContent>
				</DropdownMenu>
			</header>
			<main className="my-5">{children}</main>
		</div>
	);
}
