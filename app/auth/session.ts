import "server-only";

import { SignJWT, jwtVerify } from "jose";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { SessionPayload } from "./definitions";

const secretKey = process.env.SESSION_SECRET;
const key = new TextEncoder().encode(secretKey);

const cookie = {
	name: "session",
	options: {
		http: true,
		secure: true,
		sameSite: "lax",
		path: "/",
	},
	duration: 7 * 24 * 60 * 60 * 1000,
};

export async function encrypt(payload: SessionPayload) {
	return new SignJWT(payload)
		.setProtectedHeader({ alg: "HS256" })
		.setIssuedAt()
		.setExpirationTime("7d")
		.sign(key);
}

export async function decrypt(session: string) {
	try {
		const { payload } = await jwtVerify(session, key, {
			algorithms: ["HS256"],
		});
		return payload;
	} catch {
		return null;
	}
}

export async function createSession(userId: string) {
	const expiresAt = new Date(Date.now() + cookie.duration);
	const session = await encrypt({ userId, expiresAt });

	(await cookies()).set("session", session, {
		httpOnly: true,
		secure: true,
		expires: expiresAt,
		sameSite: "lax",
		path: "/",
	});
	redirect("/");
}

export async function verifySession() {
	const cookie = (await cookies()).get("session")?.value;
	if (!cookie) {
		redirect("/login");
	}
	const session = await decrypt(cookie);
	if (!session?.userId) {
		redirect("/login");
	}

	return { isAuth: true, userId: session.userId };
}

export async function updateSession() {
	const session = (await cookies()).get("session")?.value;
	if (!session) {
		return null;
	}

	const payload = await decrypt(session);
	if (!payload) {
		return null;
	}
	const expires = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);
	(await cookies()).set("session", session, {
		httpOnly: true,
		secure: true,
		expires: expires,
		sameSite: "lax",
		path: "/",
	});
}

export async function deleteSession() {
	(await cookies()).delete("session");
	redirect("/login");
}
