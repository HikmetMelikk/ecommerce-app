import Link from "next/link";

export const navbarLinks = [
	{
		id: 0,
		name: "Home",
		href: "/",
	},
	{
		id: 1,
		name: "All Products",
		href: "/products/all",
	},
	{
		id: 2,
		name: "Men",
		href: "/products/men",
	},
	{
		id: 3,
		name: "Women",
		href: "/products/women",
	},
];

export function NavbarLinks() {
	return (
		<div className="hidden md:flex justify-center items-center gap-x-4 ml-8">
			{navbarLinks.map((link) => (
				<Link href={link.href} key={link.id} className="font-medium">
					{link.name}
				</Link>
			))}
		</div>
	);
}
