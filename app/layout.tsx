import type { Metadata } from "next";
import "./globals.css";
import { montserrat } from "./utils/ui/fonts";

export const metadata: Metadata = {
	title: "E-commerce App",
	description: "E-commerce App",
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en">
			<body className={`${montserrat.className} antialiased`}>{children}</body>
		</html>
	);
}
