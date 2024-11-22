import Footer from "@/components/ecommercefront/Footer";
import { Navbar } from "@/components/ecommercefront/Navbar";

export default function EcommerceFrontLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<>
			<Navbar />
			<main className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8">{children}</main>
			<Footer />
		</>
	);
}
