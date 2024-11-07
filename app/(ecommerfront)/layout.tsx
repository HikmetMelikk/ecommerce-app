import { Navbar } from "@/components/ecommercefront/Navbar";
import Footer from "@/components/footer/Footer";
import { Toaster } from "react-hot-toast";

export default function EcommerceFrontLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<>
			<Navbar />
			<main className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8">{children}</main>
			<Toaster position="top-center" reverseOrder={false} />
			<Footer />
		</>
	);
}
