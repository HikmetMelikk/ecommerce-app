import { cache } from "react";

import prisma from "@/prisma/db";
import { verifySession } from "../auth/session";

export const getUser = cache(async () => {
	const session = await verifySession();
	if (!session) return null;

	try {
		const user = await prisma.user.findUnique({
			where: {
				id: session.userId.toString(),
			},
			select: {
				id: true,
				name: true,
				email: true,
			},
		});
		if (!user) return null;
		const filteredUser = userDTO(user);
		return filteredUser;
	} catch (error) {
		console.log("Failed to fetch user", error);
		return null;
	}
});

function userDTO(user: { id: string; name: string; email: string }) {
	return {
		id: user.id,
		name: user.name,
		email: user.email,
	};
}
