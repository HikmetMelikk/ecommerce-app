import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import { decrypt } from "./app/auth/session";

const protectedRoutes = ["/dashboard"];
const publicRoutes = ["/login", "/signup", "/"];

export default async function middleware(req: NextRequest) {
	const path = req.nextUrl.pathname;
	const isProtectedRoute = protectedRoutes.includes(path);
	const isPublicRoute = publicRoutes.includes(path);

	const cookie = (await cookies()).get("session")?.value;
	if (!cookie) {
		if (isProtectedRoute) {
			return NextResponse.redirect(new URL("/login", req.nextUrl));
		}
		return NextResponse.next();
	}
	const session = await decrypt(cookie);

	if (isProtectedRoute && !session?.userId) {
		return NextResponse.redirect(new URL("/login", req.nextUrl));
	}

	if (
		isPublicRoute &&
		session?.userId &&
		!req.nextUrl.pathname.startsWith("/")
	) {
		return NextResponse.redirect(new URL("/", req.nextUrl));
	}

	return NextResponse.next();
}
