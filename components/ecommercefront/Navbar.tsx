import { getUser } from "@/app/data/user";
import { ShoppingBagIcon } from "lucide-react";
import Link from "next/link";
import { Button } from "../ui/button";
import { NavbarLinks } from "./NavbarLinks";
import { UserDropdown } from "./UserDropdown";

export async function Navbar() {
	return (
		<nav className="w-full max-w-8xl mx-auto px-4 sm:px-6 lg:px-8 py-5 flex items-center justify-between">
			<div className="flex items-center">
				<Link href="/">
					<h1 className="text-black font-bold text-xl lg:text-3xl">
						Hikmet'in Tükkanı
					</h1>
				</Link>
				<NavbarLinks />
			</div>

			<div className="flex items-center">
				{(await getUser()) ? (
					<>
						<Link href="/bag" className="group p-2 flex items-center mr-2">
							<ShoppingBagIcon className="h-6 w-6 text-gray-400 group-hover:text-gray-500" />
							<span className="ml-2 text-sm font-medium text-gray-700 group-hover:text-gray-800">
								5
							</span>
						</Link>
						<UserDropdown />
					</>
				) : (
					<div className="hidden md:flex md:flex-1 md:items-center md:justify-end md:space-x-2">
						//TODO: Register and Sign In functionality will be added later
						<Button asChild variant="ghost">
							Sign In
						</Button>
					</div>
				)}
			</div>
		</nav>
	);
}
